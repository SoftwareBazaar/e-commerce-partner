import { MessageCircle } from "lucide-react";
import { SOCIALS } from "@/data/site";

export const FloatingWhatsApp = () => (
  <a
    href={SOCIALS.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated hover:scale-110 transition-transform animate-pulse-glow"
    style={{ boxShadow: "0 0 30px hsl(142 70% 45% / 0.5)" }}
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);
