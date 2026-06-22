import { Link } from "wouter";
import { Target, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { COMPANY_INFO, SERVICES } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg group-hover:scale-105 transition-transform">
                <Target size={22} className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Boomerang <span className="font-light">Estimating</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/70 mb-8 max-w-sm leading-relaxed text-lg">
              Premium quantity takeoff and cost estimation services for the Australian construction industry. 
            </p>
            <div className="flex gap-4">
              <a href={COMPANY_INFO.socials.linkedin} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all shadow-sm" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href={COMPANY_INFO.socials.facebook} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all shadow-sm" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {['About', 'Portfolio', 'Testimonials', 'FAQ', 'Contact'].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group font-medium">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Our Services</h3>
            <ul className="flex flex-col gap-4">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="text-secondary-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group font-medium">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="text-primary hover:text-white transition-colors font-semibold flex items-center gap-2">
                  View All Services <ArrowRight size={16} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Contact</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4 group">
                <div className="mt-1 bg-white/10 p-2 rounded-md group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 uppercase tracking-wider mb-1">Call Us</span>
                  <span className="text-white font-medium">{COMPANY_INFO.phone}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 bg-white/10 p-2 rounded-md group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-white font-medium">{COMPANY_INFO.email}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="mt-1 bg-white/10 p-2 rounded-md group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 uppercase tracking-wider mb-1">Location</span>
                  <span className="text-secondary-foreground/80 leading-relaxed">{COMPANY_INFO.address}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/50 font-medium">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/privacy-policy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-white/50 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
