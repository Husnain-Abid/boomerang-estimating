import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Target, TrendingUp, Users, Award, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const VALUES = [
  { icon: Target, title: "Precision First", desc: "Every figure is cross-checked against Australian industry benchmarks before delivery." },
  { icon: TrendingUp, title: "Continuous Improvement", desc: "We invest in the latest estimating software and methodology to stay ahead." },
  { icon: Users, title: "Client Partnership", desc: "Your project success is our success — we treat every engagement as our own." },
  { icon: Award, title: "Accountable Delivery", desc: "We commit to turnaround times and honour them, every single time, without exception." },
];

const MILESTONES = [
  { year: "2019", title: "Founded", desc: "Boomerang Estimating established with a focus on residential takeoffs for Australian builders." },
  { year: "2020", title: "Commercial Division", desc: "Launched dedicated commercial estimating services following strong market demand." },
  { year: "2021", title: "100 Projects Milestone", desc: "Completed 100+ projects across residential and commercial sectors with zero missed deadlines." },
  { year: "2023", title: "Civil & Structural", desc: "Added specialised civil and structural estimation services for infrastructure clients." },
  { year: "2024", title: "500+ Projects", desc: "Reached 500+ delivered projects with a 98% client satisfaction rate across all service lines." },
];

const CREDENTIALS = [
  { icon: Shield, label: "Australian Standards", sub: "AS 1100, NCC Compliant" },
  { icon: Zap, label: "Fast Turnaround", sub: "24-96 Hour Delivery" },
  { icon: CheckCircle2, label: "500+ Projects", sub: "Across All Sectors" },
  { icon: Award, label: "5+ Years", sub: "Australian Market Experience" },
];

export default function About() {
  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="inline-block text-primary font-bold text-sm uppercase tracking-[0.15em] mb-6">Our Story</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
              About Boomerang <span className="text-primary">Estimating</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              Built by a civil engineer, for the Australian construction industry. Precision estimating backed by genuine technical expertise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: "Our Mission", color: "bg-primary/10 border-primary/20", iconBg: "bg-primary", text: "To deliver fast, accurate, and affordable construction estimates to Australian builders and contractors without compromising quality." },
              { icon: TrendingUp, title: "Our Vision", color: "bg-secondary text-white", iconBg: "bg-primary/20 border border-primary/30", text: "To become Australia's most trusted remote estimating partner — the first call a builder makes when a tender lands on their desk." },
            ].map(({ icon: Icon, title, color, iconBg, text }, i) => (
              <motion.div
                key={title}
                className={`rounded-2xl p-10 border ${color}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon size={26} className={i === 0 ? "text-primary" : "text-primary"} />
                </div>
                <h2 className={`text-2xl font-bold mb-4 ${i === 1 ? "text-white" : ""}`}>{title}</h2>
                <p className={`text-lg leading-relaxed ${i === 1 ? "text-white/70" : "text-muted-foreground"}`}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}>
              <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-4">How We Started</motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                The Engineer Behind the Estimates
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
                <p>Boomerang Estimating was founded by M. Noman Aslam, a Civil Engineering graduate with extensive hands-on experience across Australian construction — from suburban residential builds to large-scale civil infrastructure.</p>
                <p>Noman saw a clear gap in the market: Australian builders were either overpaying for estimating services or spending hours doing it themselves when they should be running their businesses.</p>
                <p>The name reflects our core promise — every estimate we send goes out with the certainty of coming back to you as a winning result.</p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Button size="lg" className="rounded-full font-bold px-8" asChild>
                  <Link href="/request-quote">Work With Us <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative pl-10 border-l-2 border-primary/30 space-y-10">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[2.85rem] top-1 w-5 h-5 rounded-full bg-primary border-4 border-muted shadow" />
                    <span className="text-primary font-extrabold text-sm block mb-1">{m.year}</span>
                    <h4 className="font-bold text-lg mb-1">{m.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Leadership</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold tracking-tight">Meet the Founder</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div
              className="md:col-span-2 flex justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-64 h-72 rounded-2xl bg-secondary flex flex-col items-center justify-center shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%)', backgroundSize: '20px 20px' }} />
                  <div className="w-28 h-28 rounded-full bg-primary/20 border-4 border-primary/40 flex items-center justify-center mb-4 z-10">
                    <span className="text-5xl font-extrabold text-primary">NA</span>
                  </div>
                  <p className="text-white font-bold text-lg z-10">M. Noman Aslam</p>
                  <p className="text-white/50 text-sm z-10">Founder & Lead Estimator</p>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-xl px-4 py-2 shadow-lg font-bold text-sm">
                  5+ Years
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-extrabold mb-1">M. Noman Aslam</h3>
              <p className="text-primary font-semibold mb-1">Founder & Lead Estimator</p>
              <p className="text-muted-foreground text-sm mb-6">Civil Engineering Graduate · 5+ Years Australian Estimating Experience</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>Noman holds a Civil Engineering degree and has spent over five years developing deep expertise in Australian construction cost estimating across residential, commercial, and civil projects.</p>
                <p>His engineering background means he doesn't just count items off a plan — he understands the construction sequence, on-site constraints, and the cost drivers that a pure estimator might miss.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Civil Engineering Graduate", "Australian Standards Expert", "500+ Projects Completed", "98% Client Retention"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {CREDENTIALS.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Icon size={28} className="text-white/70 mb-3" />
                <div className="font-bold text-white text-lg">{label}</div>
                <div className="text-white/60 text-sm">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">What Drives Us</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold tracking-tight">Our Core Values</motion.h2>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 gap-6" variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="flex gap-5 p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Icon size={22} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{desc}</p>
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
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to Work With Us?</motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg mb-10">Get your next project estimated by Australia's trusted remote specialists.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 py-7 font-bold text-base shadow-lg shadow-primary/30" asChild>
                <Link href="/request-quote">Request a Quote <ArrowRight size={18} className="ml-2" /></Link>
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
