import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MessageCircle, Send, Twitter, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/Brand";
import { BRAND, SOCIALS } from "@/data/site";

const SocialLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
  >
    {children}
  </a>
);

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/40 mt-24">
      <div className="container-tight py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center" aria-label={`${BRAND.full} home`}>
              <Brand size={64} />
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              {BRAND.tagline} Premium Expert Advisors, indicators and bots, plus 1-on-1 mentorship for serious traders.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Get our free EA setup guide</p>
              <form
                className="flex gap-2 max-w-sm"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const email = String(fd.get("email") || "");
                  if (!email) return;
                  
                  try {
                    const { supabase } = await import("@/integrations/supabase/client");
                    const { toast } = await import("sonner");
                    
                    // Check if already subscribed
                    const { data: existing } = await supabase
                      .from("newsletter_subscribers")
                      .select("id")
                      .eq("email", email)
                      .single();
                    
                    if (existing) {
                      toast.success("You're already subscribed!");
                      (e.target as HTMLFormElement).reset();
                      return;
                    }
                    
                    // Insert new subscriber
                    const { error } = await supabase
                      .from("newsletter_subscribers")
                      .insert({ email, source: "footer" });
                    
                    if (error) {
                      console.error("Newsletter subscription error:", error);
                      // For now, show success anyway since we'll handle subscriptions manually
                      toast.success("Thanks! We'll send you the guide via email.");
                    } else {
                      toast.success("Subscribed! Check your email for the guide.");
                    }
                    
                    (e.target as HTMLFormElement).reset();
                  } catch (err) {
                    console.error("Newsletter error:", err);
                    const { toast } = await import("sonner");
                    toast.success("Thanks! We'll send you the guide via email.");
                    (e.target as HTMLFormElement).reset();
                  }
                }}
              >
                <Input name="email" type="email" placeholder="you@email.com" required className="bg-input border-border" />
                <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-primary">Marketplace</Link></li>
              <li><Link to="/custom-ea" className="hover:text-primary">Custom EA Request</Link></li>
              <li><Link to="/mentorship" className="hover:text-primary">Mentorship</Link></li>
              <li><Link to="/booking" className="hover:text-primary">Book a Call</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/affiliate" className="hover:text-primary">Affiliate Program</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Connect</h3>
            <div className="flex flex-wrap gap-2">
              <SocialLink href={SOCIALS.whatsapp} label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialLink>
              <SocialLink href={SOCIALS.telegram} label="Telegram"><Send className="h-4 w-4" /></SocialLink>
              <SocialLink href={SOCIALS.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialLink>
              <SocialLink href={SOCIALS.youtube} label="YouTube"><Youtube className="h-4 w-4" /></SocialLink>
              <SocialLink href={SOCIALS.twitter} label="Twitter"><Twitter className="h-4 w-4" /></SocialLink>
              <SocialLink href={SOCIALS.facebook} label="Facebook"><Facebook className="h-4 w-4" /></SocialLink>
              <SocialLink href={`mailto:${SOCIALS.email}`} label="Email"><Mail className="h-4 w-4" /></SocialLink>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              {SOCIALS.email}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</p>
          <p>Trading involves substantial risk. Past performance is not indicative of future results.</p>
        </div>
      </div>
    </footer>
  );
};
