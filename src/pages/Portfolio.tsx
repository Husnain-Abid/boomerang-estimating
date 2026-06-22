import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTFOLIO } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const CATEGORIES = ["All", "Residential", "Commercial", "Civil & Structural"];

const CAT_CONFIG: Record<string, { accent: string; bg: string; border: string }> = {
  Residential: { accent: "text-blue-500", bg: "from-blue-900 to-secondary", border: "border-blue-500/30" },
  Commercial: { accent: "text-emerald-500", bg: "from-emerald-900 to-secondary", border: "border-emerald-500/30" },
  "Civil & Structural": { accent: "text-amber-500", bg: "from-amber-900 to-secondary", border: "border-amber-500/30" },
};

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === active);

  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-6">Our Work</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Project <span className="text-primary">Portfolio</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto">
              A selection of estimating projects delivered across Australia. Every number verified, every deadline met.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  active === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filtered.map((project, i) => {
                const cfg = CAT_CONFIG[project.category] ?? CAT_CONFIG.Residential;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    data-testid={`card-project-${project.id}`}
                  >
                    <div className="group rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-400">
                      {/* Header */}
                      <div className={`h-44 bg-gradient-to-br ${cfg.bg} relative overflow-hidden flex items-end p-6`}>
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/10 transition-colors duration-400" />
                        <div className="relative z-10">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border bg-black/20 ${cfg.accent} ${cfg.border} backdrop-blur-sm`}>
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-7">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <MapPin size={12} />{project.location}
                        </div>
                        <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>

                        {/* Delivered pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.delivered.map((d) => (
                            <span key={d} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-muted border border-border">
                              <CheckCircle2 size={11} className="text-primary" />{d}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-primary font-bold text-sm hover:gap-2.5 transition-all"
                        >
                          View Case Study <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Ready to Add Your Project?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-8">Get a professional estimate delivered in as little as 24 hours.</motion.p>
            <motion.div variants={fadeUp}>
              <Button size="lg" className="rounded-full px-12 py-7 font-bold text-base shadow-lg shadow-primary/20" asChild>
                <Link href="/request-quote">Request a Quote <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
