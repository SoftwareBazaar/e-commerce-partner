# 🔐 Google Sign-In Setup + Environment Variables Update

## Part 1: Update Environment Variables

### Step 1: Update Vercel Environment Variables

Your `.env` file has placeholder values that need to be updated in Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project: **neuroalgofxedge**
3. Click **Settings** → **Environment Variables**
4. Update these variables:

```
VITE_SENDGRID_API_KEY = "SG.your_actual_sendgrid_key"
SENDGRID_FROM_EMAIL = "neuroalgoforexedge@gmail.com"
SENDGRID_VERIFIED_EMAIL = "neuroalgoforexedge@gmail.com"
VERCEL_TOKEN = "your_vercel_token_here"
```

**How to get SendGrid API Key:**
1. Go to: https://app.sendgrid.com/settings/api_keys
2. Create new API key (if you don't have one)
3. Copy the key
4. Paste in Vercel environment variables

**How to get Vercel Token:**
1. Go to: https://vercel.com/account/tokens
2. Create new token
3. Copy and paste in Vercel environment variables

---

## Part 2: Setup Google Sign-In

### Step 1: Create Google OAuth Credentials

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   ```
   https://zowfbftptnkypdwsnbkh.supabase.co/auth/v1/callback
   https://neuroalgofxedge.com/auth/v1/callback
   https://localhost:5173/auth/v1/callback
   ```
7. Copy your **Client ID** (you'll need this)

### Step 2: Configure Google in Supabase

1. Go to: https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/providers
2. Click **Google**
3. Enable it
4. Paste your Google **Client ID** from step 1
5. Click **Save**

### Step 3: Update Auth Page with Google Sign-In Button

Replace your `src/pages/Auth.tsx` with this updated version:

```typescript
import { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Eye, EyeOff, Chrome } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") ?? "/dashboard";
  const [busy, setBusy] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const { toast } = useToast();

  if (!loading && user) return <Navigate to={redirect} replace />;

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    setBusy(false);
    if (error) toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signUp({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { display_name: String(fd.get("name") || "") },
      },
    });
    setBusy(false);
    if (error) toast({ title: "Sign-up failed", description: error.message, variant: "destructive" });
    else toast({ title: "Welcome!", description: "Account created." });
  };

  const onGoogleSignIn = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    setBusy(false);
    if (error) toast({ title: "Google sign-in failed", description: error.message, variant: "destructive" });
  };

  return (
    <section className="py-20 min-h-[80vh] flex items-center">
      <div className="container-tight max-w-md w-full">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary glow-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">Neuro<span className="text-primary">Algo</span></span>
        </Link>
        <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={onLogin} className="space-y-4 mt-4">
                <div><Label>Email</Label><Input name="email" type="email" required className="mt-1.5 bg-input" /></div>
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-1.5">
                    <Input name="password" type={showLoginPassword ? "text" : "password"} required minLength={6} className="bg-input pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button disabled={busy} type="submit" className="w-full bg-gradient-primary text-primary-foreground">
                  {busy ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Google Sign-In Button */}
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  disabled={busy}
                  onClick={onGoogleSignIn}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Chrome className="h-4 w-4" />
                  Sign in with Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={onSignup} className="space-y-4 mt-4">
                <div><Label>Name</Label><Input name="name" required className="mt-1.5 bg-input" /></div>
                <div><Label>Email</Label><Input name="email" type="email" required className="mt-1.5 bg-input" /></div>
                <div>
                  <Label>Password</Label>
                  <div className="relative mt-1.5">
                    <Input name="password" type={showSignupPassword ? "text" : "password"} required minLength={6} className="bg-input pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showSignupPassword ? "Hide password" : "Show password"}
                    >
                      {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button disabled={busy} type="submit" className="w-full bg-gradient-primary text-primary-foreground">
                  {busy ? "Creating..." : "Create Account"}
                </Button>
              </form>

              {/* Google Sign-In Button */}
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  disabled={busy}
                  onClick={onGoogleSignIn}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Chrome className="h-4 w-4" />
                  Sign up with Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Auth;
```

---

## Step-by-Step Checklist

### Environment Variables (5 minutes)
- [ ] Get SendGrid API Key from https://app.sendgrid.com/settings/api_keys
- [ ] Get Vercel Token from https://vercel.com/account/tokens
- [ ] Update Vercel environment variables
- [ ] Redeploy on Vercel

### Google Sign-In (10 minutes)
- [ ] Create Google OAuth credentials at https://console.cloud.google.com/
- [ ] Add redirect URIs to Google
- [ ] Enable Google in Supabase at https://supabase.com/dashboard/project/zowfbftptnkypdwsnbkh/auth/providers
- [ ] Paste Google Client ID in Supabase
- [ ] Update Auth.tsx with Google button code
- [ ] Commit and push to GitHub
- [ ] Vercel auto-deploys

---

## Testing Google Sign-In

1. Go to: https://neuroalgofxedge.com/auth
2. Click **"Sign in with Google"** button
3. Sign in with your Google account
4. Should redirect to dashboard
5. Done! ✅

---

## Troubleshooting

**Google button not working?**
- Check browser console (F12)
- Verify Google Client ID is correct in Supabase
- Verify redirect URIs are added to Google OAuth

**Still getting errors?**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Try incognito window

