import { cubicBezier, motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Target,
  Users,
  Award,
  Shield,
  Zap,
  Eye,
  Clock,
  Calculator,
  BadgeCheck,
  LayoutGrid,
  Ruler,
  FileCheck2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const OVERVIEW_POINTS = [
  { icon: Target, title: "Accurate Estimates", desc: "Every takeoff is cross-checked against Australian industry benchmarks before it reaches you." },
  { icon: Zap, title: "Fast Turnaround", desc: "Standard estimates delivered in 24–48 hours, without cutting corners on detail." },
  { icon: Users, title: "Experienced Team", desc: "Estimators with genuine construction and civil engineering backgrounds, not just software operators." },
  { icon: Award, title: "Client Focused", desc: "Clear communication and revisions on request — we work to your bid deadline, not ours." },
];

const VALUES = [
  { icon: Target, title: "Accuracy", desc: "Every figure is measured, verified, and cross-checked before it ever reaches you." },
  { icon: Clock, title: "Reliability", desc: "We commit to turnaround times and honour them, every single time, without exception." },
  { icon: Eye, title: "Transparency", desc: "Clear, itemised breakdowns so you can see exactly how every number was built." },
  { icon: Award, title: "Quality", desc: "Meticulous verification processes ensure no material count or line item is overlooked." },
  { icon: Shield, title: "Confidentiality", desc: "Your drawings, pricing, and bid strategy stay protected under strict data handling protocols." },
  { icon: BadgeCheck, title: "Commitment", desc: "We treat every tender as if our own business depended on the result — because your win rate is ours too." },
];

const WHY_STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Estimate Accuracy" },
  { value: "24–48h", label: "Standard Delivery" },
  { value: "100%", label: "Client Satisfaction" },
];

// const PROCESS = [
//   { icon: FileSearch, step: "01", title: "Receive Drawings", desc: "You send through architectural, structural, or civil drawings in any common format." },
//   { icon: ClipboardList, step: "02", title: "Review Project", desc: "Our estimators review scope, specifications, and site conditions before takeoff begins." },
//   { icon: Calculator, step: "03", title: "Prepare Estimate", desc: "A full quantity takeoff and cost estimate is built using current market pricing." },
//   { icon: FileCheck2, step: "04", title: "Quality Check", desc: "A second estimator independently verifies every line item for accuracy and completeness." },
//   { icon: Send, step: "05", title: "Deliver Estimate", desc: "Your finished estimate is delivered on time, in a format ready to submit with your bid." },
// ];

const STANDARDS = [
  { icon: Shield, label: "Australian Standards" },
  { icon: LayoutGrid, label: "CSI Divisions" },
  { icon: Ruler, label: "MasterFormat" },
  { icon: Calculator, label: "Modern Estimating Software" },
  { icon: Zap, label: "Fast Delivery" },
  { icon: FileCheck2, label: "Professional Documentation" },
];

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Estimate Accuracy" },
  { value: "24–48h", label: "Turnaround Time" },
];

export default function About() {
  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* 1. Hero */}
      <section className="relative bg-secondary py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary font-bold text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-6"
            >
              About Our Firm
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              Precision and Reliability <span className="text-primary">in Every Estimate</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              Empowering builders and contractors with data-driven takeoffs and cost estimation services that secure more winning bids.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Company Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80"
                  alt="Estimators reviewing construction drawings"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl">
                <div className="text-2xl font-extrabold leading-none">500+</div>
                <div className="text-xs font-semibold text-white/80 mt-1">Projects Delivered</div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}>
              <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-4">
                Who We Are
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                A Dedicated Estimating Partner for Your Business
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
                We provide fast, accurate, and affordable construction estimates for builders, subcontractors, and developers. Our team combines technical estimating expertise with modern takeoff software, so every bid you submit is backed by numbers you can trust.
              </motion.p>
              <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5">
                {OVERVIEW_POINTS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">
              What We Stand For
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold tracking-tight">
              Our Core Values
            </motion.h2>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <Icon size={22} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}>
              <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-4">
                Why Choose Us
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                Numbers That Back Up Our Promise
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
                We built our process around what builders actually need at tender time: speed, accuracy, and estimates they can defend to a client without hesitation.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button size="lg" className="rounded-full font-bold px-8" asChild>
                  <Link href="/request-quote">
                    Request a Quote <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-5"
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {WHY_STATS.map(({ value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="bg-muted rounded-2xl p-8 text-center border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="text-4xl font-extrabold text-primary mb-2">{value}</div>
                  <div className="text-sm font-semibold text-muted-foreground">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Our Process */}
      {/* <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">
              How It Works
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold tracking-tight">
              Our Process
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-5 gap-6"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PROCESS.map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div key={step} variants={fadeUp} className="relative flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center">
                    <Icon size={26} className="text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
                    {step}
                  </span>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
                )}
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* 6. Industry Standards */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-primary/10 rounded-full blur-[160px]" />
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">
              Built On Standards
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold text-white tracking-tight">
              Industry Standards We Follow
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-5"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STANDARDS.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <span className="text-white font-semibold text-sm leading-snug">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Company Statistics */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STATS.map(({ value, label }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col items-center text-center">
                <div className="font-extrabold text-white text-4xl md:text-5xl mb-2 tracking-tight">{value}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wide">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to Win Your Next Bid?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">
              Join hundreds of contractors who trust us for high-accuracy, reliable takeoff and estimating services.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 py-7 font-bold text-base shadow-lg shadow-primary/30" asChild>
                <Link href="/request-quote">
                  Request a Quote <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 py-7 font-bold text-base" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}