import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Target, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const isDarkHero = location === "/" && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg group-hover:scale-105 transition-transform">
              <Target size={22} className="text-white" />
            </div>
            <span
              className={`text-2xl font-bold tracking-tight ${
                isDarkHero ? "text-white" : "text-foreground"
              }`}
            >
              Boomerang <span className="font-light">Estimating</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                location === "/" ? "text-primary" : isDarkHero ? "text-white/90" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                location === "/about" ? "text-primary" : isDarkHero ? "text-white/90" : "text-muted-foreground"
              }`}
            >
              About
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`text-sm font-semibold flex items-center gap-1 transition-colors hover:text-primary ${
                    location.startsWith("/services") ? "text-primary" : isDarkHero ? "text-white/90" : "text-muted-foreground"
                  }`}
                >
                  Services <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 p-2 rounded-xl shadow-xl">
                {SERVICES.map((s) => (
                  <DropdownMenuItem key={s.id} asChild className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-muted">
                    <Link href={`/services/${s.slug}`} className="w-full">
                      {s.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5 font-semibold text-primary hover:bg-primary/10 mt-1">
                  <Link href="/services" className="w-full">
                    View All Services
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary"
                    : isDarkHero
                    ? "text-white/90"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className="ml-2 font-bold px-6 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all">
              <Link href="/request-quote" className="flex items-center gap-2">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
            </Button>
          </nav>

          <button
            className={`md:hidden p-2 rounded-md ${
              isDarkHero ? "text-white" : "text-foreground"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-2xl py-6 px-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-lg font-semibold ${
                location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="py-2 px-4 border-t border-b border-muted my-2">
            <div className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">Services</div>
            <div className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="text-foreground font-medium hover:text-primary"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
          <Button asChild className="w-full mt-4 py-6 text-lg rounded-xl font-bold bg-primary text-white" size="lg">
            <Link href="/request-quote">Get a Free Quote</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
