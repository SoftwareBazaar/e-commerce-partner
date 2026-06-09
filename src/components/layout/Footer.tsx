import { Link } from "react-router-dom";
import { useState } from "react";
import { Facebook, Instagram, Mail, MessageCircle, Send, Twitter, Youtube, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brand } from "@/components/Brand";
import { BRAND, SOCIALS } from "@/data/site";
import { cn } from "@/lib/utils";

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

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = true }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full lg:pointer-events-none lg:cursor-default flex items-center justify-between font-display text-sm font-semibold uppercase tracking-wider text-foreground mb-4 hover:text-primary lg:hover:text-foreground transition-colors"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200 lg:hidden",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0 lg:max-h-96"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/40 mt-24">
      <div className="container-tight py-16">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-4">
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
                    const { sendNewsletterWelcome } = await import("@/integrations/email/emailService");
                    
                    // Check if already subscribed
                    const { data: existing, error: checkError } = await supabase
                      .from("newsletter_subscribers")
                      .select("id")
                      .eq("email", email)
                      .maybeSingle();
                    
                    if (checkError) {
                      console.error("Error checking subscription:", checkError);
                      throw checkError;
                    }
                    
                    if (existing) {
                      toast.success("You're already subscribed! Check your email for the guide.");
                      (e.target as HTMLFormElement).reset();
                      return;
                    }
                    
                    // Insert new subscriber
                    const { error: insertError } = await supabase
                      .from("newsletter_subscribers")
                      .insert({ email, source: "footer" })
                      .select()
                      .single();
                    
                    if (insertError) {
                      console.error("Error inserting subscriber:", insertError);
                      throw insertError;
                    }
                    
                    // Send welcome email with guide
                    const emailResult = await sendNewsletterWelcome(email);
                    
                    if (emailResult.success) {
                      toast.success("Success! Check your email for the free EA setup guide.");
                    } else {
                      console.error("Email send error:", emailResult.error);
                      toast.success("Subscribed! We'll send you the guide shortly.");
                    }
                    
                    (e.target as HTMLFormElement).reset();
                  } catch (err) {
                    console.error("Newsletter error:", err);
                    const { toast } = await import("sonner");
                    toast.success("Thanks! We'll send you the guide via email shortly.");
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
            <CollapsibleSection title="Explore" defaultOpen={true}>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/marketplace" className="block py-1 hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link to="/custom-ea" className="block py-1 hover:text-primary transition-colors">Custom EA Request</Link></li>
                <li><Link to="/mentorship" className="block py-1 hover:text-primary transition-colors">Mentorship</Link></li>
                <li><Link to="/booking" className="block py-1 hover:text-primary transition-colors">Book a Call</Link></li>
                <li><Link to="/blog" className="block py-1 hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/affiliate" className="block py-1 hover:text-primary transition-colors">Affiliate Program</Link></li>
                <li><Link to="/about" className="block py-1 hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/contact" className="block py-1 hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </CollapsibleSection>
          </div>

          <div>
            <CollapsibleSection title="Connect" defaultOpen={true}>
              <div className="flex flex-wrap gap-2 mb-4">
                <SocialLink href={SOCIALS.whatsapp} label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialLink>
                <SocialLink href={SOCIALS.telegram} label="Telegram"><Send className="h-4 w-4" /></SocialLink>
                <SocialLink href={SOCIALS.instagram} label="Instagram"><Instagram className="h-4 w-4" /></SocialLink>
                <SocialLink href={SOCIALS.youtube} label="YouTube"><Youtube className="h-4 w-4" /></SocialLink>
                <SocialLink href={SOCIALS.twitter} label="Twitter"><Twitter className="h-4 w-4" /></SocialLink>
                <SocialLink href={SOCIALS.facebook} label="Facebook"><Facebook className="h-4 w-4" /></SocialLink>
                <SocialLink href={`mailto:${SOCIALS.email}`} label="Email"><Mail className="h-4 w-4" /></SocialLink>
              </div>
              <p className="text-xs text-muted-foreground">
                {SOCIALS.email}
              </p>
            </CollapsibleSection>
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
