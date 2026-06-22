import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, HelpCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS, COMPANY_INFO } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

export default function FAQ() {
  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-6">Questions Answered</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Frequently Asked <span className="text-primary">Questions</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto">
              Everything you need to know about our estimating services, turnaround times, and pricing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Sidebar */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <HelpCircle size={32} className="text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Can't find your answer?</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">Contact us directly and we'll respond within 2-4 business hours.</p>
                <Button className="w-full rounded-full font-bold" size="sm" asChild>
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </div>

              <div className="bg-secondary rounded-2xl p-6">
                <h3 className="font-bold text-lg text-white mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors text-sm">
                    <Mail size={16} className="text-primary flex-shrink-0" />{COMPANY_INFO.email}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors text-sm">
                    <Phone size={16} className="text-primary flex-shrink-0" />{COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-6">
                <h3 className="font-bold text-lg text-white mb-2">Ready to Start?</h3>
                <p className="text-white/70 text-sm mb-4">Upload your plans and get a quote in minutes.</p>
                <Button variant="secondary" className="w-full rounded-full font-bold" size="sm" asChild>
                  <Link href="/request-quote">Request a Quote</Link>
                </Button>
              </div>
            </motion.div>

            {/* Accordion */}
            <motion.div
              className="md:col-span-2"
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {FAQS.map((faq, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <AccordionItem
                      value={`item-${i}`}
                      className="border border-border rounded-xl px-6 data-[state=open]:border-primary/40 transition-colors"
                      data-testid={`faq-item-${i}`}
                    >
                      <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline py-5 data-[state=open]:text-primary text-[15px]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold mb-6 tracking-tight">Still Have Questions?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">Our team is available Monday–Friday, 9AM–6PM PKT to answer any project-specific questions.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 py-7 font-bold text-base" asChild>
                <Link href="/contact">Contact Us <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 py-7 font-bold text-base" asChild>
                <Link href="/request-quote">Get a Quote</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
