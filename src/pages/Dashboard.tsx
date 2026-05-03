import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("ea_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setRequests(data ?? []));
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).then(({ data }) => setBookings(data ?? []));
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setProfile(data));
  }, [user]);

  const saveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("profiles").update({
      display_name: String(fd.get("display_name")),
      phone: String(fd.get("phone")),
      country: String(fd.get("country")),
    }).eq("id", user!.id);
    toast({ title: error ? "Error" : "Saved", description: error?.message ?? "Profile updated", variant: error ? "destructive" : "default" });
  };

  return (
    <section className="py-12">
      <div className="container-tight">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            {isAdmin && <Button asChild variant="outline"><Link to="/admin">Admin Panel</Link></Button>}
            <Button variant="outline" onClick={signOut}>Sign out</Button>
          </div>
        </div>

        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">EA Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-6">
            {requests.length === 0 ? (
              <p className="text-muted-foreground">No requests yet. <Link to="/custom-ea" className="text-primary">Submit one</Link>.</p>
            ) : (
              <div className="grid gap-3">
                {requests.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-gradient-card p-4">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-semibold">{r.strategy.slice(0, 80)}{r.strategy.length > 80 && "..."}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString()}</p>
                      </div>
                      <Badge variant="outline">{r.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            {bookings.length === 0 ? (
              <p className="text-muted-foreground">No bookings yet. <Link to="/booking" className="text-primary">Book a session</Link>.</p>
            ) : (
              <div className="grid gap-3">
                {bookings.map((b) => (
                  <div key={b.id} className="rounded-xl border border-border bg-gradient-card p-4">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-semibold">{b.package_slug}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {b.preferred_date} {b.preferred_time}
                        </p>
                      </div>
                      <Badge variant="outline">{b.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <form onSubmit={saveProfile} className="grid gap-4 max-w-lg rounded-2xl border border-border bg-gradient-card p-6">
              <div><Label>Display Name</Label><Input name="display_name" defaultValue={profile?.display_name ?? ""} className="mt-1.5 bg-input" /></div>
              <div><Label>Phone</Label><Input name="phone" defaultValue={profile?.phone ?? ""} className="mt-1.5 bg-input" /></div>
              <div><Label>Country</Label><Input name="country" defaultValue={profile?.country ?? ""} className="mt-1.5 bg-input" /></div>
              <Button type="submit" className="bg-gradient-primary text-primary-foreground">Save</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Dashboard;
