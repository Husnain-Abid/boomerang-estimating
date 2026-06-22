import { easeOut, motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, HandCoins, Home as HomeIcon, Building2, Ruler, ChevronRight, Star, FileText, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, TESTIMONIALS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const ICON_MAP: Record<string, typeof HomeIcon> = { Home: HomeIcon, Building2, Ruler };

const SERVICE_EXTRAS: Record<string, {
  benefits: { title: string; desc: string }[];
  software: string[];
  projectTypes: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}> = {
  "residential-takeoffs": {
    benefits: [
      { title: "Faster Tender Prep", desc: "Receive detailed takeoffs in 24-48 hours, so you spend time winning work — not counting bricks." },
      { title: "Reduce Costly Errors", desc: "Our cross-checked material quantities eliminate the risk of underquoting or over-ordering." },
      { title: "Australian Standards", desc: "Every estimate is prepared in line with local building codes, terminology, and current market rates." },
    ],
    software: ["Bluebeam", "Planswift", "On-Screen Takeoff", "CostX"],
    projectTypes: ["Custom Homes", "Dual Occupancies", "Duplexes", "Townhouses", "Multi-Unit Developments", "Home Renovations", "Extensions & Additions"],
    process: ["We receive and review your architectural plans in full.", "A room-by-room material takeoff is performed digitally.", "Labour unit rates are applied against current Australian benchmarks.", "A trade-by-trade breakdown is compiled in Excel and PDF."],
    faqs: [
      { q: "What plans do I need to provide?", a: "Architectural drawings in PDF or DWG are ideal. We also accept JPG scans if DWG is not available." },
      { q: "Do I need structural drawings?", a: "Not always. We can prepare preliminary estimates from architectural drawings alone, with structural allowances." },
      { q: "Can you work with incomplete plans?", a: "Yes — we can work with concept or DA-stage plans and provide preliminary cost planning figures." },
    ],
  },
  "commercial-estimating": {
    benefits: [
      { title: "Win More Commercial Tenders", desc: "Competitive, accurately priced BOQs give you the edge when submitting against other builders." },
      { title: "Full Trade Breakdown", desc: "Every trade package is itemised, making it simple to issue subcontractor packages directly from our BOQ." },
      { title: "Value Engineering Built In", desc: "We highlight cost-saving opportunities without compromising the design intent or specification." },
    ],
    software: ["Bluebeam", "CostX", "Buildsoft", "On-Screen Takeoff", "Stack"],
    projectTypes: ["Office Buildings", "Retail Fit-Outs", "Warehouses", "Hospitality & Restaurants", "Mixed-Use Developments", "Shopping Centres", "Industrial Facilities"],
    process: ["Full review of architectural, structural, and services drawings.", "Trade-by-trade quantity takeoff across all building elements.", "BOQ preparation formatted for Australian commercial tendering.", "Risk assessment and value engineering options are included."],
    faqs: [
      { q: "What drawings do you need for a commercial estimate?", a: "Architectural, structural, and services drawings are ideal. We can work with just architectural if full documentation isn't available yet." },
      { q: "Can you prepare the BOQ in a specific format?", a: "Yes — we can adapt our output to your preferred BOQ template or tender format upon request." },
      { q: "Do you cover hydraulic and mechanical services?", a: "We provide allowances for hydraulic, mechanical, and electrical services based on industry benchmarks. For detailed services takeoffs, we recommend engaging specialist subconsultants." },
    ],
  },
  "civil-structural-estimation": {
    benefits: [
      { title: "Precision Earthworks Quantification", desc: "Accurate cut and fill volumes derived directly from contour data eliminate costly earthworks overruns." },
      { title: "Detailed Structural Analysis", desc: "Steel tonnage and concrete volumetric reports are produced from engineering drawings with high accuracy." },
      { title: "Infrastructure Expertise", desc: "We understand the complexity of civil projects — roads, drainage, retaining walls, and bridge structures." },
    ],
    software: ["Bluebeam", "CostX", "On-Screen Takeoff", "Xactimate", "Cubit"],
    projectTypes: ["Road & Highway Upgrades", "Bridge Structures", "Drainage & Stormwater", "Retaining Walls", "Industrial Slabs & Footings", "Earthworks & Bulk Excavation", "Precast Concrete Elements"],
    process: ["Review of all civil, structural, and geotechnical documentation.", "Precision earthworks quantification from contour and survey data.", "Detailed concrete volume and reinforcement tonnage analysis.", "Plant, equipment, and temporary works cost modelling."],
    faqs: [
      { q: "Do you need a geotechnical report?", a: "Not always. However, a geotech report significantly improves the accuracy of our earthworks and foundation cost estimates." },
      { q: "Can you handle large-scale infrastructure projects?", a: "Yes — we have experience with major road upgrades, civil infrastructure, and complex structural concrete projects." },
      { q: "What format are your civil estimates delivered in?", a: "Civil estimates are delivered as a structured Excel BOQ with a summarised PDF report, formatted to suit the specific project type." },
    ],
  },
};

export default function ServiceDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <Button asChild><Link href="/services">Back to Services</Link></Button>
      </div>
    );
  }

  const Icon = ICON_MAP[service.icon] ?? Ruler;
  const extras = SERVICE_EXTRAS[slug] ?? { benefits: [], software: [], projectTypes: [], process: [], faqs: [] };
  const relatedTestimonials = TESTIMONIALS.slice(0, 2);

  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/services" className="hover:text-white/70 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Services
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/70">{service.title}</span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
              <motion.div variants={fadeUp} className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                <Icon size={40} className="text-primary" />
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-3 mb-5">
                <Badge className="bg-primary/15 text-primary border border-primary/30 rounded-full px-4">
                  <Clock size={12} className="mr-1" />{service.turnaround}
                </Badge>
                <Badge className="bg-white/10 text-white/70 border border-white/20 rounded-full px-4">
                  <HandCoins size={12} className="mr-1" />{service.price}
                </Badge>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
                {service.title}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed">
                {service.description}
              </motion.p>
            </motion.div>

            {/* Included card */}
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.15em] mb-5">What's Included</p>
              <ul className="space-y-3 mb-8">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />{d}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full rounded-full font-bold shadow-lg shadow-primary/30" asChild>
                <Link href="/request-quote">Get a Quote for This Service <ArrowRight size={16} className="ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-3">Why Choose This Service</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">Key Benefits</motion.h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {extras.benefits.map(({ title, desc }, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-muted rounded-2xl p-7 border border-border hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process + Software */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Process */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-extrabold mb-8 tracking-tight">Our Process</h2>
              <ol className="space-y-5">
                {extras.process.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Software + Project Types */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold mb-5 tracking-tight">Software Used</h2>
                <div className="flex flex-wrap gap-2">
                  {extras.software.map((sw) => (
                    <span key={sw} className="px-4 py-2 rounded-full bg-secondary text-white text-sm font-medium border border-white/10">{sw}</span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold mb-5 tracking-tight">Project Types</h2>
                <div className="flex flex-wrap gap-2">
                  {extras.projectTypes.map((pt) => (
                    <span key={pt} className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium">{pt}</span>
                  ))}
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-primary rounded-2xl p-6">
                <h3 className="font-bold text-white text-lg mb-2">Ready to Start?</h3>
                <p className="text-white/70 text-sm mb-4">Submit your plans and get a professional estimate within {service.turnaround}.</p>
                <Button variant="secondary" className="w-full rounded-full font-bold" asChild>
                  <Link href="/request-quote">Get a Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.h2 className="text-2xl font-extrabold mb-8 tracking-tight" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            What Clients Say
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedTestimonials.map((t) => (
              <motion.div
                key={t.id}
                className="bg-muted rounded-2xl p-7 border border-border"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Quote size={28} className="text-primary/20 mb-4" />
                <p className="text-muted-foreground italic mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.h2 className="text-2xl font-extrabold mb-8 tracking-tight text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Service FAQs
          </motion.h2>
          <Accordion type="single" collapsible className="space-y-3">
            {extras.faqs.map(({ q, a }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <AccordionItem value={`item-${i}`} className="border border-border rounded-xl px-6 bg-background data-[state=open]:border-primary/40">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary hover:no-underline py-5 data-[state=open]:text-primary">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger()}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Get a Quote for {service.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg mb-8">Delivered within {service.turnaround} — starting {service.price}.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10 py-7 font-bold text-base shadow-lg shadow-primary/30" asChild>
                <Link href="/request-quote">Request a Quote <ArrowRight size={18} className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 py-7 font-bold text-base bg-transparent border-white/20 text-white hover:bg-white/10" asChild>
                <Link href="/services"><ArrowLeft size={16} className="mr-2" /> All Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
