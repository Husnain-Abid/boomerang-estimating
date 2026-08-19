import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "wouter";

export function TopBar() {
  return (
    <div className="relative top-0 left-0 right-0 z-50  w-full bg-[#F4510B] text-white">
      <div className="mx-auto flex min-h-[56px] container items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <p className="text-xs font-medium tracking-wide sm:text-sm md:text-base">
          Stay Ahead of Every Tender With Expert Cost Estimates 
        </p>

        {/* Right */}
        <div className="hidden items-center gap-5 md:flex">

          <Link
            href="/testimonials"
            className="text-sm font-medium transition-opacity duration-300 hover:opacity-70"
          >
            Reviews
          </Link>

          <Link
            href="/privacy-policy"
            className="text-sm font-medium transition-opacity duration-300 hover:opacity-70"
          >
            Privacy Policy
          </Link>

          <Link
            href="/faq"
            className="text-sm font-medium transition-opacity duration-300 hover:opacity-70"
          >
            Faq
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white hover:text-[#F4510B] hover:scale-110"
            >
              <Instagram size={15} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white hover:text-[#F4510B] hover:scale-110"
            >
              <Linkedin size={15} />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white hover:text-[#F4510B] hover:scale-110"
            >
              <Twitter size={15} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}