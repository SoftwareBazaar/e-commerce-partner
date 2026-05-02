import { useState } from "react";
import { CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SOCIALS } from "@/data/site";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.info("[Contact submission]", data);
    toast({ title: "Message sent", description: "We'll reply within 24 hours." });
    setSent(true);
  };

  return (
    <>
      <section className="border-b border-border bg-card/30 py-14">
        <div className="container-tight text-center">
          <Badge variant="outline" className="border-primary/40 text-primary mb-3">Contact</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Let's talk</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Questions about a tool, a custom build or a session? Reach out — we reply fast.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-tight grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
            {sent ? (
              <div className="text-center py-12">
                <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold">Message sent</h2>
                <p className="text-muted-foreground mt-2">We'll reply within 24 hours.</p>
                <Button onClick={() => setSent(false)} variant="outline" className="mt-6">Send another</Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" required className="mt-1.5 bg-input border-border" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required className="mt-1.5 bg-input border-border" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" className="mt-1.5 bg-input border-border" />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" name="message" required rows={6} className="mt-1.5 bg-input border-border" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-primary text-primary-foreground">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <a href={SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-card p-5 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Fastest reply</p>
              </div>
            </a>
            <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-card p-5 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Email</p>
                <p className="text-xs text-muted-foreground">{SOCIALS.email}</p>
              </div>
            </a>
            <a href={SOCIALS.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-border bg-gradient-card p-5 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Telegram</p>
                <p className="text-xs text-muted-foreground">Join the community</p>
              </div>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Contact;
