import { easeOut, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Clock, Home as HomeIcon, Building2, Ruler, HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const ICON_MAP: Record<string, typeof HomeIcon> = { Home: HomeIcon, Building2, Ruler };

const PROCESS_STEPS = [
  { num: "01", title: "Submit Plans", desc: "Upload your PDF or DWG files via our secure quote form." },
  { num: "02", title: "We Review & Quote", desc: "We confirm the price and turnaround time within hours." },
  { num: "03", title: "Estimating Begins", desc: "A detailed, trade-by-trade quantity takeoff is performed." },
  { num: "04", title: "Delivery", desc: "You receive your PDF report and Excel BOQ, ready to use." },
];

const SERVICE_BKGS = [
  "from-blue-900/30 to-secondary",
  "from-emerald-900/30 to-secondary",
  "from-amber-900/30 to-secondary",
];

export default function Services() {
  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-6">What We Offer</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Estimating <span className="text-primary">Services</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              Precision quantity takeoffs and cost estimates for the Australian construction industry. Fast, accurate, and audit-ready.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Alternating Service Blocks */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-28">
          {SERVICES.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? Ruler;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={svc.id}
                className={`grid md:grid-cols-2 gap-16 items-center ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Visual */}
                <div className={`rounded-2xl h-80 bg-gradient-to-br ${SERVICE_BKGS[i]} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10 text-center p-8">
                    <div className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4">
                      <Icon size={44} className="text-primary" />
                    </div>
                    <p className="text-white/60 font-medium">{svc.turnaround} delivery</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-primary rounded-xl px-4 py-2 shadow-lg">
                    <span className="text-white font-bold text-sm">{svc.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex gap-3 mb-5">
                    <Badge className="bg-primary/10 text-primary border border-primary/20 rounded-full px-4">
                      <Clock size={12} className="mr-1" />{svc.turnaround}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-4">
                      <HandCoins size={12} className="mr-1" />{svc.price}
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">{svc.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{svc.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {svc.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button className="rounded-full font-bold px-6" asChild>
                      <Link href={`/services/${svc.slug}`}>Full Details <ArrowRight size={15} className="ml-1" /></Link>
                    </Button>
                    <Button variant="outline" className="rounded-full font-bold px-6" asChild>
                      <Link href="/request-quote">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Our Workflow</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white tracking-tight">Our Estimating Process</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/10" />
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center px-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center font-extrabold text-2xl text-white mb-6 shadow-lg shadow-primary/40 border-4 border-secondary">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Get Your Project Estimated Today</motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg mb-10">Upload your plans and receive a professional estimate in as little as 24 hours.</motion.p>
            <motion.div variants={fadeUp}>
              <Button size="lg" variant="secondary" className="rounded-full px-12 py-7 text-base font-bold shadow-xl" asChild>
                <Link href="/request-quote">Request a Free Quote <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
