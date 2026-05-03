import { useState } from "react";
import { CheckCircle2, Code2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const CustomEA = () => {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("ea_requests").insert({
      user_id: user?.id ?? null,
      full_name: String(fd.get("name")),
      email: String(fd.get("email")),
      phone: String(fd.get("phone") || ""),
      strategy: String(fd.get("strategy")),
      entry_rules: String(fd.get("entry") || ""),
      exit_rules: String(fd.get("exit") || ""),
      indicators: String(fd.get("indicators") || ""),
      risk_preferences: `Lot: ${fd.get("lot") || ""} | SL/TP: ${fd.get("sltp") || ""}`,
      pairs: String(fd.get("pairs") || ""),
      timeframes: String(fd.get("timeframes") || ""),
      deadline: String(fd.get("deadline") || ""),
      budget: String(fd.get("budget") || ""),
    });
    setBusy(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Request received", description: "We'll review and get back within 24 hours." });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section className="py-32">
        <div className="container-tight max-w-xl text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Request received</h1>
          <p className="mt-3 text-muted-foreground">
            Thanks — we'll review your strategy and send a custom quote within 24 hours via email or WhatsApp.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8">Submit another request</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-card/30 py-14">
        <div className="container-tight text-center">
          <Badge variant="outline" className="border-secondary/40 text-secondary mb-3">
            <Code2 className="h-3 w-3 mr-1" /> Custom Development
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Request a Custom EA</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Describe your strategy and we'll build a fully coded Expert Advisor to your exact specifications.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-tight max-w-3xl">
          <form onSubmit={onSubmit} className="space-y-8 rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
            <fieldset className="space-y-4">
              <legend className="font-display text-lg font-semibold mb-2">Your details</legend>
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
                  <Label htmlFor="platform">Platform *</Label>
                  <select id="platform" name="platform" required className="mt-1.5 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
                    <option value="MT5">MT5</option>
                    <option value="MT4">MT4</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-display text-lg font-semibold mb-2">Strategy</legend>
              <div>
                <Label htmlFor="strategy">Describe your strategy *</Label>
                <Textarea id="strategy" name="strategy" required rows={4} className="mt-1.5 bg-input border-border" placeholder="e.g. Trend-following on H1, enters on EMA crossover with RSI confirmation, exits on opposite signal..." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="entry">Entry conditions *</Label>
                  <Textarea id="entry" name="entry" required rows={3} className="mt-1.5 bg-input border-border" />
                </div>
                <div>
                  <Label htmlFor="exit">Exit conditions *</Label>
                  <Textarea id="exit" name="exit" required rows={3} className="mt-1.5 bg-input border-border" />
                </div>
              </div>
              <div>
                <Label htmlFor="indicators">Indicators to incorporate</Label>
                <Input id="indicators" name="indicators" className="mt-1.5 bg-input border-border" placeholder="e.g. EMA 50/200, RSI 14, MACD" />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-display text-lg font-semibold mb-2">Risk & instruments</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="lot">Lot sizing</Label>
                  <Input id="lot" name="lot" className="mt-1.5 bg-input border-border" placeholder="Fixed 0.1 / Risk % per trade" />
                </div>
                <div>
                  <Label htmlFor="sltp">SL / TP / Trailing</Label>
                  <Input id="sltp" name="sltp" className="mt-1.5 bg-input border-border" placeholder="SL 30 pips, TP 60 pips, trailing on" />
                </div>
                <div>
                  <Label htmlFor="pairs">Preferred pairs</Label>
                  <Input id="pairs" name="pairs" className="mt-1.5 bg-input border-border" placeholder="EURUSD, XAUUSD" />
                </div>
                <div>
                  <Label htmlFor="timeframes">Timeframes</Label>
                  <Input id="timeframes" name="timeframes" className="mt-1.5 bg-input border-border" placeholder="M15, H1" />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-display text-lg font-semibold mb-2">Project</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" name="deadline" type="date" className="mt-1.5 bg-input border-border" />
                </div>
                <div>
                  <Label htmlFor="budget">Budget range *</Label>
                  <select id="budget" name="budget" required className="mt-1.5 w-full h-10 rounded-md border border-border bg-input px-3 text-sm">
                    <option value="">Select range</option>
                    <option>Under $300</option>
                    <option>$300 - $700</option>
                    <option>$700 - $1500</option>
                    <option>$1500+</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="file" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Reference file (optional)
                </Label>
                <Input id="file" name="file" type="file" className="mt-1.5 bg-input border-border" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt" />
                <p className="text-xs text-muted-foreground mt-1">PDF, image or document up to 10MB.</p>
              </div>
            </fieldset>

            <Button type="submit" disabled={busy} size="lg" className="w-full bg-gradient-primary text-primary-foreground glow-primary">
              {busy ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CustomEA;
