import { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Eye, EyeOff } from "lucide-react";
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

  return (
    <section className="py-20 min-h-[80vh] flex items-center">
      <div className="container-tight max-w-md w-full">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary glow-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">Smart<span className="text-primary">Algos</span></span>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Auth;
