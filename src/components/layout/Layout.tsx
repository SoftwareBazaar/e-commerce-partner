import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { CartDrawer } from "./CartDrawer";

export const Layout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 pt-16">
      <Outlet />
    </main>
    <Footer />
    <FloatingWhatsApp />
    <CartDrawer />
  </div>
);
