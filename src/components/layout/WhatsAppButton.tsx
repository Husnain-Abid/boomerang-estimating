import { COMPANY_INFO } from "@/lib/data";

export function WhatsAppButton() {
return ( <a
   href={COMPANY_INFO.whatsapp}
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Chat with us on WhatsApp"
   data-testid="button-whatsapp-floating"
   className="fixed bottom-6 right-6 z-50 group"
 >
{/* Ripple / Wave Animation */} <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />


  {/* Second Wave */}
  <span className="absolute inset-[-6px] rounded-full border-2 border-[#25D366] animate-[pulse_2s_ease-out_infinite] opacity-40" />

  {/* WhatsApp Button */}
  <span
    className="
      relative
      flex
      items-center
      justify-center
      w-14
      h-14
      md:w-16
      md:h-16
      rounded-full
      bg-[#25D366]
      text-white
      shadow-lg
      transition-all
      duration-300
      group-hover:scale-110
      group-hover:shadow-2xl
    "
  >
    {/* WhatsApp Official-style Logo */}
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M16.004 3C8.826 3 3 8.824 3 16c0 2.29.6 4.438 1.65 6.303L3.06 28.73l6.603-1.543A12.94 12.94 0 0 0 16.004 29C23.178 29 29 23.176 29 16S23.178 3 16.004 3Zm0 23.67a10.62 10.62 0 0 1-5.42-1.488l-.388-.23-3.92.916.932-3.818-.252-.393A10.64 10.64 0 1 1 16.004 26.67Z"
      />

      <path
        d="M21.42 18.47c-.3-.15-1.77-.874-2.046-.973-.275-.1-.475-.15-.675.15-.2.3-.774.974-.949 1.174-.174.2-.35.225-.65.075-.3-.15-1.27-.468-2.42-1.493-.894-.797-1.497-1.78-1.672-2.08-.175-.3-.019-.462.132-.612.136-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.584-.49-.505-.675-.515-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.23 5.125 4.53.716.31 1.274.495 1.71.634.718.229 1.371.197 1.888.12.576-.086 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35Z"
      />
    </svg>
  </span>

  {/* Tooltip */}
  <span
    className="
      absolute
      right-full
      top-1/2
      -translate-y-1/2
      mr-4
      bg-white
      text-gray-900
      text-sm
      font-medium
      px-4
      py-2
      rounded-lg
      shadow-lg
      opacity-0
      translate-x-2
      pointer-events-none
      group-hover:opacity-100
      group-hover:translate-x-0
      transition-all
      duration-300
      whitespace-nowrap
      hidden
      md:block
    "
  >
    Need an estimate? Chat with us!
  </span>
</a>


);
}
