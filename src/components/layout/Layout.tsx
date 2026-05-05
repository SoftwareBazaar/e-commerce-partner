import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { CartDrawer } from "./CartDrawer";
import { AIChat } from "@/components/AIChat";
import { RefCapture } from "@/components/RefCapture";

export const Layout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <RefCapture />
    <Header />
    <main className="flex-1 pt-16">
      <Outlet />
    </main>
    <Footer />
    <FloatingWhatsApp />
    <AIChat />
    <CartDrawer />
  </div>
);
