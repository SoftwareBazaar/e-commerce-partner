import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, Menu, ShieldCheck, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Brand } from "@/components/Brand";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/custom-ea", label: "Custom EA" },
  { to: "/mentorship", label: "Mentorship" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const { count, setOpen } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-card"
          : "bg-transparent",
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center group" aria-label="NeuroAlgo Forex Edge home">
          <Brand size={56} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open cart"
            onClick={() => setOpen(true)}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>

          {isAdmin && (
            <Button asChild variant="ghost" size="icon" aria-label="Admin panel" className="hidden md:inline-flex text-primary">
              <Link to="/admin"><ShieldCheck className="h-5 w-5" /></Link>
            </Button>
          )}

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User menu" className="hidden md:inline-flex">
                    <div className="h-5 w-5 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {user.email?.[0].toUpperCase() || "U"}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Logged in</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer text-primary">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link to="/auth"><User className="h-4 w-4 mr-1" /> Sign In</Link>
            </Button>
          )}

          <Button asChild className="hidden md:inline-flex bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Link to="/booking">Book Free Call</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-96 bg-card border-border">
              <div className="flex flex-col gap-1 mt-8">
                {nav.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    end={n.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted",
                      )
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
                <Button asChild variant="outline" className="mt-4">
                  <Link to={user ? "/dashboard" : "/auth"}>{user ? "My Dashboard" : "Sign In"}</Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="outline" className="border-primary text-primary">
                    <Link to="/admin"><ShieldCheck className="h-4 w-4 mr-1.5" /> Admin Panel</Link>
                  </Button>
                )}
                <Button asChild className="bg-gradient-primary text-primary-foreground">
                  <Link to="/booking">Book Free Call</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
