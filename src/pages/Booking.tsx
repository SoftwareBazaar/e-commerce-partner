import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarCheck, CheckCircle2, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { packages } from "@/data/site";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { sendBookingConfirmation } from "@/integrations/email/emailService";

const Booking = () => {
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [lastBooking, setLastBooking] = useState<{ pkg: string; date: string; time: string; name: string; email: string } | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const initialPkg = params.get("package") ?? packages[0].slug;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    
    const clientName = String(fd.get("name"));
    const clientEmail = String(fd.get("email"));
    const packageSlug = String(fd.get("package"));
    const preferredDate = String(fd.get("date"));
    const preferredTime = String(fd.get("time") || "10:00");
    
    const pkg = packages.find((p) => p.slug === packageSlug);
    
    const payload = {
      client_name: clientName,
      client_email: clientEmail,
      package_id: packageSlug,
      package_name: pkg?.name || "Consultation",
      scheduled_date: preferredDate,
      scheduled_time: preferredTime,
      duration_minutes: parseInt(pkg?.duration?.match(/\d+/)?.[0] || "60"),
      trading_experience: String(fd.get("experience")),
      goals: String(fd.get("goals")),
      notes: String(fd.get("phone") || ""),
    };
    
    const { data, error } = await supabase.from("bookings").insert(payload).select();
    
    setBusy(false);
    
    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
      return;
    }

    // Send confirmation email
    const bookingId = data?.[0]?.id || `BOOK-${Date.now()}`;
    const dateTime = `${preferredDate} at ${preferredTime}`;
    const emailResult = await sendBookingConfirmation(
      clientEmail,
      clientName,
      pkg?.name || "Consultation",
      dateTime,
      pkg?.duration || "60 minutes",
      bookingId
    );

    if (!emailResult.success) {
      console.error("Email notification failed:", emailResult.error);
      toast({ 
        title: "Booking received", 
        description: "You'll receive a confirmation email shortly. (Email notification pending)",
        variant: "default"
      });
    } else {
      toast({ 
        title: "Booking received", 
        description: "Confirmation email sent. We'll confirm your slot within a few hours." 
      });
    }
    
    setLastBooking({ pkg: packageSlug, date: preferredDate, time: preferredTime, name: clientName, email: clientEmail });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const downloadCalendar = async () => {
    if (!lastBooking) return;
    const { buildIcs, downloadIcs } = await import("@/lib/ics");
    const start = new Date(`${lastBooking.date}T${lastBooking.time || "10:00"}:00`);
    const pkg = packages.find((p) => p.slug === lastBooking.pkg);
    const ics = buildIcs({
      uid: `${Date.now()}`,
      title: `NeuroAlgo: ${pkg?.name ?? "Session"}`,
      description: `Session with NeuroAlgo Forex Edge for ${lastBooking.name}. We'll send the Google Meet link by email.`,
      start,
      durationMinutes: 60,
    });
    downloadIcs(`neuroalgo-${lastBooking.pkg}.ics`, ics);
  };

  if (submitted) {
    return (
      <section className="py-32">
        <div className="container-tight max-w-xl text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Booking received</h1>
          <p className="mt-3 text-muted-foreground">
            We'll confirm your slot via email within a few hours and send the Google Meet link.
          </p>
          <div className="mt-8 flex gap-2 justify-center flex-wrap">
            <Button onClick={downloadCalendar} className="bg-gradient-primary text-primary-foreground">Add to Calendar (.ics)</Button>
            <Button onClick={() => setSubmitted(false)} variant="outline">Book another session</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-card/30 py-14">
        <div className="container-tight text-center">
          <Badge variant="outline" className="border-primary/40 text-primary mb-3">
            <CalendarCheck className="h-3 w-3 mr-1" /> Booking
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Book your session</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Pick a package, share a few details, and we'll confirm your slot within hours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-tight max-w-2xl">
          <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
            <div>
              <Label htmlFor="package">Package *</Label>
              <select id="package" name="package" defaultValue={initialPkg} required className="mt-1.5 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
                {packages.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name} ({p.duration})</option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" name="name" required className="mt-1.5 bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required className="mt-1.5 bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="phone">WhatsApp / Phone</Label>
                <Input id="phone" name="phone" className="mt-1.5 bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="experience">Trading experience *</Label>
                <select id="experience" name="experience" required className="mt-1.5 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
                  <option>Just starting out</option>
                  <option>Less than 1 year</option>
                  <option>1-3 years</option>
                  <option>3+ years</option>
                </select>
              </div>
              <div>
                <Label htmlFor="date" className="flex items-center gap-2 text-base font-semibold">
                  <Calendar className="h-6 w-6 text-primary drop-shadow-lg" strokeWidth={2.5} />
                  Preferred date *
                </Label>
                <Input id="date" name="date" type="date" required className="mt-1.5 bg-input border-border text-base h-12 px-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-125 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-0" />
              </div>
              <div>
                <Label htmlFor="time" className="flex items-center gap-2 text-base font-semibold">
                  <Clock className="h-6 w-6 text-primary drop-shadow-lg" strokeWidth={2.5} />
                  Preferred time
                </Label>
                <Input id="time" name="time" type="time" className="mt-1.5 bg-input border-border text-base h-12 px-4 [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:brightness-125" />
              </div>
            </div>

            <div>
              <Label htmlFor="goals">What do you want to get out of this session? *</Label>
              <Textarea id="goals" name="goals" required rows={4} className="mt-1.5 bg-input border-border" placeholder="e.g. Build a consistent strategy, prep for a prop-firm challenge, learn SMC..." />
            </div>

            <Button type="submit" disabled={busy} size="lg" className="w-full bg-gradient-primary text-primary-foreground glow-primary">
              {busy ? "Booking..." : "Confirm Booking"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Sessions are held on Google Meet. You'll receive the link by email.
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Booking;
