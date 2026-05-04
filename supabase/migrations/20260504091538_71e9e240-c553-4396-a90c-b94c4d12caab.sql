-- Storage bucket for product images
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Public read for product-images
create policy "Product images public read"
on storage.objects for select
using (bucket_id = 'product-images');

-- Admin write for product-images
create policy "Admins upload product images"
on storage.objects for insert
with check (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins update product images"
on storage.objects for update
using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins delete product images"
on storage.objects for delete
using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

-- Bootstrap function: lets the first signed-in user claim admin if none exists
create or replace function public.claim_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_exists boolean;
begin
  if auth.uid() is null then
    raise exception 'Must be signed in';
  end if;

  select exists(select 1 from public.user_roles where role = 'admin') into admin_exists;
  if admin_exists then
    return false;
  end if;

  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin')
  on conflict (user_id, role) do nothing;
  return true;
end;
$$;