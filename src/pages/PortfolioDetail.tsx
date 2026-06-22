import { easeOut, motion } from "framer-motion";import { Link, useParams } from "wouter";
import { ArrowLeft, MapPin, CheckCircle2, ArrowRight, ChevronRight, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTFOLIO } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const CAT_BG: Record<string, string> = {
  Residential: "from-blue-900 to-secondary",
  Commercial: "from-emerald-900 to-secondary",
  "Civil & Structural": "from-amber-900 to-secondary",
};

const FAKE_METRICS: Record<string, { label: string; value: string }[]> = {
  "luxury-coastal-residence": [{ label: "Delivery Time", value: "36 Hours" }, { label: "Trade Breakdowns", value: "14 Trades" }, { label: "Line Items", value: "320+" }],
  "metro-office-complex": [{ label: "Delivery Time", value: "48 Hours" }, { label: "Trade Breakdowns", value: "22 Trades" }, { label: "BOQ Pages", value: "84" }],
  "highway-upgrade-project": [{ label: "Delivery Time", value: "72 Hours" }, { label: "Earthworks Volume", value: "18,000 m³" }, { label: "Drawings Reviewed", value: "47" }],
  "suburban-townhouse-development": [{ label: "Delivery Time", value: "48 Hours" }, { label: "Units Estimated", value: "12 Units" }, { label: "Trade Breakdowns", value: "16 Trades" }],
  "regional-shopping-center": [{ label: "Delivery Time", value: "60 Hours" }, { label: "Trade Breakdowns", value: "28 Trades" }, { label: "Fit-out Packages", value: "6" }],
  "industrial-warehouse-facility": [{ label: "Delivery Time", value: "48 Hours" }, { label: "Steel Tonnage", value: "480t" }, { label: "Floor Area", value: "5,000 m²" }],
};

export default function PortfolioDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const project = PORTFOLIO.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Button asChild><Link href="/portfolio">Back to Portfolio</Link></Button>
      </div>
    );
  }

  const metrics = FAKE_METRICS[slug] ?? [{ label: "Delivery Time", value: "48 Hours" }, { label: "Trade Breakdowns", value: "12 Trades" }];
  const others = PORTFOLIO.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${CAT_BG[project.category] ?? "from-secondary to-secondary/80"} py-28 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/portfolio" className="hover:text-white/70 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Portfolio
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/70">{project.title}</span>
          </div>

          <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/20">{project.category}</span>
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <MapPin size={14} />{project.location}
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
              {project.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-xl max-w-2xl leading-relaxed">
              {project.fullDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            {metrics.map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-white/60 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              {/* What we delivered */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
                <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-4">Deliverables</motion.span>
                <motion.h2 variants={fadeUp} className="text-2xl font-extrabold mb-6 tracking-tight">What We Delivered</motion.h2>
                <ul className="space-y-3">
                  {project.delivered.map((item) => (
                    <motion.li key={item} variants={fadeUp} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={18} className="text-primary" />
                      </div>
                      <span className="font-semibold">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Overview */}
              <motion.div className="bg-muted rounded-2xl p-8 border border-border" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-bold text-lg mb-5">Project Overview</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[["Category", project.category], ["Location", project.location], ["Services", project.delivered.join(", ")]].map(([label, value]) => (
                    <div key={label} className={label === "Services" ? "sm:col-span-2" : ""}>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Results */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-5">
                  <BarChart3 size={22} className="text-primary" />
                  <h2 className="text-2xl font-extrabold tracking-tight">Results</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {metrics.map(({ label, value }) => (
                    <div key={label} className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
                      <div className="text-2xl font-extrabold text-primary mb-1">{value}</div>
                      <div className="text-muted-foreground text-sm">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div className="space-y-5" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-primary text-white rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">Need Similar Work?</h3>
                <p className="text-white/70 text-sm mb-4">We can estimate your {project.category.toLowerCase()} project with the same precision and speed.</p>
                <Button variant="secondary" className="w-full rounded-full font-bold" asChild>
                  <Link href="/request-quote">Get a Quote</Link>
                </Button>
              </div>
              <div className="border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <Clock size={14} />Typical Turnaround
                </div>
                <p className="text-2xl font-extrabold text-primary">{metrics[0]?.value ?? "48 Hours"}</p>
                <p className="text-muted-foreground text-sm mt-1">For this project type</p>
              </div>
              <div className="border border-border rounded-2xl p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">More Projects</p>
                <ul className="space-y-3">
                  {others.map((p) => (
                    <li key={p.id}>
                      <Link href={`/portfolio/${p.slug}`} className="text-sm hover:text-primary flex items-center gap-2 transition-colors group font-medium">
                        <ArrowRight size={13} className="text-primary flex-shrink-0" />
                        <span className="group-hover:translate-x-0.5 transition-transform">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl font-extrabold mb-8 tracking-tight">More Projects</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {others.map((p, i) => (
              <motion.div
                key={p.id}
                className="group rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all bg-background"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`h-28 bg-gradient-to-br ${CAT_BG[p.category] ?? "from-secondary to-secondary/80"} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2"><MapPin size={11} />{p.location}</div>
                  <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                  <Link href={`/portfolio/${p.slug}`} className="inline-flex items-center gap-1 text-primary font-bold text-xs hover:gap-2 transition-all">
                    View Case Study <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
