
-- Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Profiles policies
create policy "Profiles: own select" on public.profiles for select using (auth.uid() = id);
create policy "Profiles: own update" on public.profiles for update using (auth.uid() = id);
create policy "Profiles: own insert" on public.profiles for insert with check (auth.uid() = id);
create policy "Profiles: admin select" on public.profiles for select using (public.has_role(auth.uid(),'admin'));

-- user_roles policies
create policy "Roles: own read" on public.user_roles for select using (auth.uid() = user_id);
create policy "Roles: admin read" on public.user_roles for select using (public.has_role(auth.uid(),'admin'));
create policy "Roles: admin write" on public.user_roles for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- New user trigger -> profile + default role
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end; $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- updated_at trigger fn
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_set_updated before update on public.profiles
for each row execute function public.set_updated_at();

-- Products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  compatibility text not null,
  short_description text,
  description text,
  buy_price numeric not null default 0,
  rent_price numeric,
  rating numeric default 5,
  reviews int default 0,
  pairs text[] default '{}',
  timeframes text[] default '{}',
  youtube_id text,
  featured boolean default false,
  tags text[] default '{}',
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "Products: public read" on public.products for select using (active = true or public.has_role(auth.uid(),'admin'));
create policy "Products: admin write" on public.products for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger products_set_updated before update on public.products for each row execute function public.set_updated_at();

-- EA requests
create table public.ea_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  strategy text not null,
  entry_rules text,
  exit_rules text,
  risk_preferences text,
  indicators text,
  pairs text,
  timeframes text,
  deadline text,
  budget text,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.ea_requests enable row level security;
create policy "EA: anyone insert" on public.ea_requests for insert with check (true);
create policy "EA: own select" on public.ea_requests for select using (auth.uid() = user_id);
create policy "EA: admin select" on public.ea_requests for select using (public.has_role(auth.uid(),'admin'));
create policy "EA: admin update" on public.ea_requests for update using (public.has_role(auth.uid(),'admin'));

-- Bookings
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  package_slug text not null,
  full_name text not null,
  email text not null,
  phone text,
  preferred_date date,
  preferred_time text,
  experience text,
  goals text,
  notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
create policy "Bookings: anyone insert" on public.bookings for insert with check (true);
create policy "Bookings: own select" on public.bookings for select using (auth.uid() = user_id);
create policy "Bookings: admin select" on public.bookings for select using (public.has_role(auth.uid(),'admin'));
create policy "Bookings: admin update" on public.bookings for update using (public.has_role(auth.uid(),'admin'));

-- Contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Contact: anyone insert" on public.contact_messages for insert with check (true);
create policy "Contact: admin read" on public.contact_messages for select using (public.has_role(auth.uid(),'admin'));

-- Chat messages
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text not null,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.chat_messages enable row level security;
create policy "Chat: own read" on public.chat_messages for select using (auth.uid() = user_id);
create policy "Chat: own insert" on public.chat_messages for insert with check (auth.uid() = user_id);

-- Seed products from existing local data
insert into public.products (slug, name, category, compatibility, short_description, description, buy_price, rent_price, rating, reviews, pairs, timeframes, youtube_id, featured, tags) values
('smart-reversal-pro','Smart Reversal Pro','Indicator','Both','Advanced reversal detection using multi-timeframe SMC and order-block confluence.','Smart Reversal Pro identifies high-probability reversal zones by combining Smart Money Concepts, liquidity sweeps and order-block analysis across multiple timeframes.',249,29,4.9,184,ARRAY['EURUSD','GBPUSD','XAUUSD','USDJPY'],ARRAY['M15','H1','H4'],'dQw4w9WgXcQ',true,ARRAY['SMC','Reversal','Multi-TF']),
('apex-scalper-ea','Apex Scalper EA','EA','MT5','Aggressive low-latency scalping bot with built-in news filter and dynamic risk management.','Apex Scalper EA targets high-probability micro-moves on major pairs during the London and New York sessions.',599,79,4.8,312,ARRAY['EURUSD','GBPUSD','USDJPY'],ARRAY['M1','M5'],'dQw4w9WgXcQ',true,ARRAY['Scalping','News Filter','Prop-Firm']),
('engulfing-master','Engulfing Master','Indicator','Both','Highest-quality engulfing pattern scanner with volume and structure validation.','Engulfing Master scans every chart in real time for institutional-grade engulfing patterns.',149,19,4.7,98,ARRAY['All majors','Indices','Gold'],ARRAY['M15','H1','H4','D1'],'dQw4w9WgXcQ',true,ARRAY['Price Action','Alerts']),
('fvg-hunter-bot','FVG Hunter Bot','Bot','MT5','Semi-automated bot that hunts Fair Value Gaps with disciplined risk and one-click execution.','FVG Hunter Bot detects unfilled Fair Value Gaps and stages pending orders at premium/discount zones.',449,59,4.8,142,ARRAY['XAUUSD','NAS100','US30'],ARRAY['M5','M15'],'dQw4w9WgXcQ',true,ARRAY['SMC','FVG','Indices']),
('trend-rider-ea','Trend Rider EA','EA','MT4','Long-term trend follower with pyramid scaling and volatility-aware exits.','Trend Rider EA identifies established trends and rides them with pyramiding entries.',399,49,4.6,76,ARRAY['EURUSD','AUDUSD','USDCAD'],ARRAY['H4','D1'],null,false,ARRAY['Trend','Swing']),
('smc-toolkit-bundle','SMC Toolkit Bundle','Bundle','Both','Smart Reversal Pro + Engulfing Master + FVG Hunter at one bundled price.','Get our three best-selling SMC tools in a single bundle and save over 35%.',599,null,5.0,64,ARRAY['All'],ARRAY['All'],null,false,ARRAY['Bundle','Best Value']);
