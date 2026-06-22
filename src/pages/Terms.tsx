import { easeOut, motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

export default function Terms() {
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
              <span>Terms & Conditions</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Terms & Conditions
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
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">1. Agreement to Terms</h2>
              <p>By engaging Boomerang Estimating ("Company", "we", "us") for estimating services, you agree to be bound by these Terms and Conditions. These terms govern all service engagements and constitute the entire agreement between the parties.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">2. Services</h2>
              <p>Boomerang Estimating provides quantity takeoff, cost estimation, and related consulting services for the construction industry. Specific deliverables, turnaround times, and fees are agreed in writing prior to commencement of each project.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">3. Fees & Payment</h2>
              <p>Fees are as quoted and agreed in writing. Payment terms are 7 days from date of invoice unless otherwise stated. We reserve the right to withhold delivery of final documents until payment is received in full.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">4. Accuracy & Disclaimer</h2>
              <p>Our estimates are prepared with professional care using the information provided. They are indicative guides only and do not constitute a guarantee of final construction costs. Actual costs may vary due to market fluctuations, site conditions, and scope changes. We accept no liability for reliance on estimates without independent verification.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">5. Client Obligations</h2>
              <p>You are responsible for providing accurate, complete, and up-to-date project documentation. Errors in estimates resulting from incomplete or inaccurate information provided by you are not the liability of Boomerang Estimating.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">6. Intellectual Property</h2>
              <p>All estimate documents produced by us remain our intellectual property until payment is received in full. Upon full payment, ownership of the deliverables transfers to you for use in connection with the specified project only.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">7. Confidentiality</h2>
              <p>Both parties agree to maintain the confidentiality of all project information shared during the engagement. We will not disclose your project details to any third party without your written consent, except as required by law.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">8. Limitation of Liability</h2>
              <p>To the maximum extent permitted by Australian law, our total liability to you for any claim arising from our services shall not exceed the fees paid for the specific service giving rise to the claim.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">9. Governing Law</h2>
              <p>These Terms are governed by the laws of New South Wales, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of New South Wales.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">10. Contact</h2>
              <p>For questions about these Terms, contact us at <a href="mailto:info@boomerangestimating.com.au" className="text-primary font-semibold hover:underline">info@boomerangestimating.com.au</a>.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>
            <Link href="/contact" className="text-primary font-semibold hover:underline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
