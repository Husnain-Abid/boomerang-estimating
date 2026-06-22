import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-6">Client Reviews</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              What Our <span className="text-primary">Clients Say</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto">
              Real feedback from Australian builders, contractors, and developers who trust Boomerang Estimating on every tender.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {[["98%", "Satisfaction Rate"], ["500+", "Projects Delivered"], ["5.0 ★", "Average Rating"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{v}</div>
                <div className="text-white/60 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="group bg-background border border-border rounded-2xl p-8 flex flex-col hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-400"
                whileHover={{ y: -4 }}
                data-testid={`card-testimonial-${t.id}`}
              >
                <Quote size={36} className="text-primary/20 mb-6" />
                <p className="text-muted-foreground leading-relaxed flex-grow mb-6 italic text-[15px]">"{t.text}"</p>
                <div className="border-t border-border pt-5">
                  <Stars />
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-extrabold text-white text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Join 500+ Satisfied Clients</motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg mb-10">Let us show you why Australia's best builders trust Boomerang Estimating.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 py-7 font-bold text-base shadow-lg shadow-primary/30" asChild>
                <Link href="/request-quote">Get a Free Quote <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 py-7 font-bold text-base bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
