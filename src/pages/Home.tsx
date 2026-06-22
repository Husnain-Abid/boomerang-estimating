import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Clock, Home as HomeIcon, Building2, Ruler,
  Star, ChevronLeft, ChevronRight, FileSpreadsheet, FileText, PenTool,
  BarChart3, Users, Layers, Shield, Zap, HardHat, Factory, ShoppingBag,
  Heart, Landmark, Truck, GraduationCap, Quote, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, PORTFOLIO, TESTIMONIALS, FAQS, COMPANY_INFO } from "@/lib/data";

/* ── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

/* ── Animated Counter ───────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(to / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Marquee Row ─────────────────────────────────────────── */
function MarqueeRow({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden py-3 ${className}`}>
      <div
        className="flex gap-6 w-max"
        style={{ animation: `marquee${reverse ? "Rev" : ""} 30s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex-shrink-0 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default text-sm font-medium tracking-wide">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dashboard Mockup ────────────────────────────────────── */
function DashboardMockup() {
  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
    >
      {/* Floating glow */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 translate-y-8" />

      <motion.div
        className="relative bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-2xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <div className="text-xs text-white/40 font-mono">Boomerang Estimate v2.4</div>
        </div>

        {/* Project title */}
        <div className="mb-5">
          <div className="text-white/40 text-xs mb-1 uppercase tracking-widest">Active Project</div>
          <div className="text-white font-bold text-lg">Metro Office Complex — Melbourne</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-medium">In Progress</span>
            <span className="text-xs text-white/40">Commercial · BOQ</span>
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-3 mb-5">
          {[
            { label: "Structural Takeoff", pct: 92, color: "bg-primary" },
            { label: "Material Quantities", pct: 78, color: "bg-accent" },
            { label: "Labour Breakdown", pct: 65, color: "bg-blue-400" },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">{bar.label}</span>
                <span className="text-white/80 font-semibold">{bar.pct}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${bar.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.pct}%` }}
                  transition={{ duration: 1.5, delay: 0.8, ease: easeOut }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Trade Items", value: "247" },
            { label: "Total Cost", value: "AUD 2.4M" },
            { label: "Delivery", value: "36hrs" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <div className="text-white font-bold text-sm">{stat.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* File icons */}
        <div className="flex gap-2 mt-4">
          {["BOQ.xlsx", "Estimate.pdf", "Plans.dwg"].map((f) => (
            <div key={f} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/50">
              <FileSpreadsheet size={11} className="text-primary" />
              {f}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-2xl px-4 py-2.5 flex items-center gap-2 border border-border"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-foreground">Delivered in 48h</span>
      </motion.div>
    </motion.div>
  );
}

const INDUSTRIES = [
  { icon: HomeIcon, label: "Residential", desc: "Custom homes & developments" },
  { icon: Building2, label: "Commercial", desc: "Offices & retail" },
  { icon: Factory, label: "Industrial", desc: "Warehouses & facilities" },
  { icon: ShoppingBag, label: "Retail", desc: "Fit-outs & centres" },
  { icon: Heart, label: "Healthcare", desc: "Hospitals & clinics" },
  { icon: Landmark, label: "Government", desc: "Public infrastructure" },
  { icon: Truck, label: "Infrastructure", desc: "Roads & civil works" },
  { icon: GraduationCap, label: "Education", desc: "Schools & universities" },
];

const DELIVERABLES = [
  { icon: FileSpreadsheet, label: "Excel BOQ", desc: "Fully editable Bill of Quantities" },
  { icon: FileText, label: "PDF Estimate", desc: "Professional summary report" },
  { icon: PenTool, label: "Marked-Up Plans", desc: "Annotated drawing sets" },
  { icon: Layers, label: "Material Quantities", desc: "Trade-by-trade breakdown" },
  { icon: Users, label: "Labour Breakdown", desc: "Unit rate analysis" },
  { icon: BarChart3, label: "Cost Summary", desc: "Executive overview" },
];

const SOFTWARE = ["Bluebeam", "Planswift", "On-Screen Takeoff", "CostX", "Cubit", "Buildsoft", "Xactimate", "Stack"];

const CLIENTS = [
  "BuildRight Pty Ltd", "Apex Constructions", "O'Connor Civil",
  "Metro Developments", "Prime Commercial", "Coastal Homes",
  "Pacific Infrastructure", "Urban Built Group",
];

const TRUST_BADGES = [
  { icon: Shield, label: "Australian Standards" },
  { icon: Star, label: "98% Satisfaction" },
  { icon: Zap, label: "24-48h Delivery" },
  { icon: CheckCircle2, label: "500+ Projects" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Submit Plans", desc: "Upload PDF, DWG or ZIP files securely via our quote form." },
  { num: "02", title: "Quantity Takeoff", desc: "Our estimators perform a thorough, trade-by-trade digital takeoff." },
  { num: "03", title: "Review & Validation", desc: "Every figure is cross-checked against current Australian benchmarks." },
  { num: "04", title: "Final Delivery", desc: "Receive your complete BOQ and PDF report, ready for tender." },
];

const SERVICE_ICONS: Record<string, typeof HomeIcon> = {
  Home: HomeIcon, Building2, Ruler,
};

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <div className="w-full overflow-hidden">

      {/* ── HERO ───────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex items-center bg-secondary overflow-hidden pt-20">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Orange glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/15 text-primary font-semibold text-sm border border-primary/30 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Australia's Trusted Remote Estimating Specialists
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                Accurate Estimates.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">
                  On Time. Every Time.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
                Premium quantity takeoffs and cost estimates for residential, commercial, and civil projects across Australia — delivered in as little as 24 hours.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="text-base px-8 py-6 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" asChild>
                  <Link href="/request-quote">Get Free Quote <ArrowRight size={18} className="ml-2" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full font-bold bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                  <Link href="/contact">Book Discovery Call</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                {TRUST_BADGES.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
                    <Icon size={14} className="text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Dashboard */}
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ──────────────────────────────── */}
      <section className="py-16 bg-secondary/90 border-y border-white/5">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-white/30 text-sm font-semibold uppercase tracking-[0.2em]">Trusted By Leading Australian Builders & Contractors</p>
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        `}</style>
        <MarqueeRow items={CLIENTS} />
        <MarqueeRow items={[...SOFTWARE, ...CLIENTS.slice(0, 4)]} reverse className="mt-2" />
      </section>

      {/* ── STATISTICS ──────────────────────────────── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: 500, suffix: "+", label: "Projects Delivered", icon: CheckCircle2 },
              { value: 98, suffix: "%", label: "Client Satisfaction", icon: Star },
              { value: 5, suffix: "+ Yrs", label: "Industry Experience", icon: Shield },
              { value: 48, suffix: "h", label: "Max Turnaround", icon: Clock },
            ].map(({ value, suffix, label, icon: Icon }, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center">
                <Icon size={28} className="text-white/60 mb-3" />
                <div className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="text-white/70 font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ───────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            {/* Visual side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-secondary rounded-2xl p-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%)', backgroundSize: '20px 20px' }} />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-6">
                    <span className="text-3xl font-extrabold text-primary">NA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">M. Noman Aslam</h3>
                  <p className="text-primary font-semibold mb-4">Founder & Lead Estimator</p>
                  <p className="text-white/60 leading-relaxed mb-6">Civil Engineering graduate with 5+ years of specialised Australian construction estimating experience across residential, commercial, and civil sectors.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[["500+", "Projects"], ["98%", "Satisfaction"], ["5+ Yrs", "Experience"], ["3", "Service Types"]].map(([v, l]) => (
                      <div key={l} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="text-2xl font-extrabold text-primary">{v}</div>
                        <div className="text-white/50 text-sm">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Orange accent line */}
              <div className="absolute -left-3 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-amber-400 to-primary rounded-full" />
            </motion.div>

            {/* Content side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger(0.12)}
            >
              <motion.span variants={fadeUp} className="inline-block text-primary font-bold text-sm uppercase tracking-[0.15em] mb-4">Our Story</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                Built For The Australian <span className="text-primary">Construction Industry</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-6">
                Boomerang Estimating was founded on a simple belief: Australian builders deserve fast, accurate, and affordable estimating services without the overhead of in-house estimating teams.
              </motion.p>
              <motion.div variants={fadeUp} className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl mb-8">
                <p className="text-foreground font-semibold italic text-lg leading-relaxed">
                  "To deliver fast, accurate, and affordable construction estimates to Australian builders and contractors without compromising quality."
                </p>
                <p className="text-muted-foreground text-sm mt-3 font-medium">— Our Mission</p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Button size="lg" className="rounded-full px-8 font-bold" asChild>
                  <Link href="/about">Learn Our Story <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES ───────────────────────────── */}
      <section className="py-28 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">What We Do</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Precision Estimating Services</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto">Specialist cost planning and quantity takeoffs, tailored to the Australian market.</motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SERVICES.map((svc) => {
              const Icon = SERVICE_ICONS[svc.icon] ?? Ruler;
              return (
                <motion.div
                  key={svc.id}
                  variants={fadeUp}
                  className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col"
                  whileHover={{ y: -6 }}
                >
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-primary to-amber-400 w-0 group-hover:w-full transition-all duration-500" />
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                      <Icon size={32} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">{svc.turnaround}</span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">{svc.price}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold mb-3">{svc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{svc.shortDescription}</p>
                    <ul className="space-y-2 mb-8">
                      {svc.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={15} className="text-primary flex-shrink-0" />{d}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors" asChild>
                      <Link href={`/services/${svc.slug}`}>View Service Details <ArrowRight size={15} className="ml-2" /></Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── SOFTWARE EXPERTISE ──────────────────────── */}
      <section className="py-20 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 mb-10 text-center">
          <p className="text-white/30 text-sm font-semibold uppercase tracking-[0.2em]">Software We Use For Takeoffs</p>
        </div>
        <MarqueeRow items={SOFTWARE} className="mb-0" />
        <MarqueeRow items={[...SOFTWARE].reverse()} reverse />
      </section>

      {/* ── INDUSTRIES ──────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Sectors</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">Industries We Support</motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {INDUSTRIES.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="group bg-muted hover:bg-secondary rounded-2xl p-6 text-center border border-border hover:border-primary/30 transition-all duration-400 cursor-default"
                whileHover={{ y: -4 }}
              >
                <div className="w-14 h-14 rounded-xl bg-background group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-4 border border-border group-hover:border-primary/30 transition-all duration-300">
                  <Icon size={26} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="font-bold text-sm mb-1 group-hover:text-white transition-colors">{label}</div>
                <div className="text-xs text-muted-foreground group-hover:text-white/50 transition-colors">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────── */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">The Process</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">How It Works</motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg mt-4 max-w-lg mx-auto">A streamlined four-step process from plan submission to final delivery.</motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/10 z-0" />
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                className="relative z-10 flex flex-col items-center text-center px-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center font-extrabold text-2xl text-white mb-6 shadow-lg shadow-primary/40 border-4 border-secondary">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Button size="lg" className="rounded-full px-10 text-base font-bold shadow-lg shadow-primary/30" asChild>
              <Link href="/request-quote">Start Your Estimate <ArrowRight size={18} className="ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ───────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="flex flex-col md:flex-row md:items-end justify-between mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <div>
              <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Our Work</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">Projects We've Delivered</motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Button variant="outline" className="font-bold rounded-full mt-4 md:mt-0" asChild>
                <Link href="/portfolio">View All Projects</Link>
              </Button>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                {/* Background */}
                <div className={`absolute inset-0 ${i === 0 ? "bg-gradient-to-br from-blue-900 to-secondary" : i === 1 ? "bg-gradient-to-br from-emerald-900 to-secondary" : "bg-gradient-to-br from-amber-900 to-secondary"}`} />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">{project.category}</span>
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">{project.location}</div>
                    <h3 className="text-xl font-extrabold text-white mb-2">{project.title}</h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">
                      View Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU RECEIVE ────────────────────────── */}
      <section className="py-28 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Deliverables</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">What You Receive</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">Every estimate includes a comprehensive package of professional documents.</motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {DELIVERABLES.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="bg-background rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <Icon size={22} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="font-bold mb-1">{label}</div>
                <div className="text-muted-foreground text-sm">{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────── */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Client Reviews</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">What Our Clients Say</motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center"
              >
                <Quote size={40} className="text-primary/30 mx-auto mb-6" />
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                  "{TESTIMONIALS[testimonialIdx].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-extrabold text-white text-lg">
                    {TESTIMONIALS[testimonialIdx].name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">{TESTIMONIALS[testimonialIdx].name}</div>
                    <div className="text-white/50 text-sm">{TESTIMONIALS[testimonialIdx].company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setTestimonialIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-primary w-6" : "bg-white/20"}`} />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ─────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Common Questions</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.07)}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.slice(0, 5).map((faq, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AccordionItem value={`item-${i}`} className="border border-border rounded-xl px-6 data-[state=open]:border-primary/40 transition-colors">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline py-5 data-[state=open]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full font-bold" asChild>
                <Link href="/faq">View All FAQs <ArrowRight size={15} className="ml-2" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-6">Get Started Today</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Ready to Win More <span className="text-primary">Tenders?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-xl mb-12 max-w-2xl mx-auto">
              Stop guessing on project costs. Get a precise, professional estimate delivered in 24-48 hours.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-base px-10 py-7 rounded-full font-bold shadow-xl shadow-primary/30" asChild>
                <Link href="/request-quote">Request a Quote <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-10 py-7 rounded-full font-bold bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/contact">Book Discovery Call</Link>
              </Button>
              <a
                href={COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-base bg-green-600 hover:bg-green-500 text-white transition-colors"
              >
                <Phone size={18} /> Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
