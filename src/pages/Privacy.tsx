import { easeOut, motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

export default function Privacy() {
  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.div variants={fadeUp} className="text-white/40 text-sm mb-4">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              {" / "}
              <span>Privacy Policy</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Privacy Policy
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-lg">Last updated: June 2024</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">1. Introduction</h2>
              <p>Boomerang Estimating ("we", "us", or "our") is committed to protecting your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">2. Information We Collect</h2>
              <p>We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Business information (company name, ABN, business address)</li>
                <li>Project information provided for estimating purposes</li>
                <li>Technical data (IP address, browser type, usage data)</li>
                <li>Communication records (emails, messages, call notes)</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">3. How We Use Your Information</h2>
              <p>We use your personal information to provide and improve our estimating services, communicate about your project, process payments, send service-related notifications, and comply with legal obligations.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">4. Disclosure of Your Information</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our business under strict confidentiality obligations.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">5. Data Security</h2>
              <p>We implement industry-standard security measures including secure file storage, encrypted communications, and restricted staff access to protect your personal information.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">6. Data Retention</h2>
              <p>Project documentation is retained for seven years in accordance with Australian record-keeping requirements. Other personal information is retained only as long as necessary.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">7. Your Rights</h2>
              <p>Under the Australian Privacy Principles, you may access or correct your personal information, make a complaint about a privacy breach, or opt out of marketing communications at any time.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">8. Contact Us</h2>
              <p>For privacy-related enquiries, please contact us at <a href="mailto:info@boomerangestimating.com.au" className="text-primary font-semibold hover:underline">info@boomerangestimating.com.au</a>. We will respond within 30 days.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link href="/terms-and-conditions" className="text-primary font-semibold hover:underline">Terms & Conditions</Link>
            <Link href="/contact" className="text-primary font-semibold hover:underline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
