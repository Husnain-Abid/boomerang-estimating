import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { easeOut, motion } from "framer-motion";import { MapPin, Phone, Mail, Clock, Send, Calendar, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { COMPANY_INFO } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut} },
};
const stagger = (d = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: d } } });

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  companyName: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const CONTACT_ITEMS = [
  { icon: Phone, label: "Phone", value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
  { icon: Mail, label: "Email", value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
  { icon: MapPin, label: "Based In", value: COMPANY_INFO.address, href: undefined },
  { icon: Clock, label: "Business Hours", value: COMPANY_INFO.hours, href: undefined },
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", phone: "", companyName: "", message: "" },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({ title: "Message Sent!", description: "We'll be in touch within 2-4 business hours." });
    form.reset();
  };

  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-secondary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.12)}>
            <motion.span variants={fadeUp} className="text-primary font-bold text-sm uppercase tracking-[0.15em] block mb-6">Get In Touch</motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Contact <span className="text-primary">Us</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-xl max-w-2xl mx-auto">
              Have a project in mind? Our estimating experts are ready to discuss your requirements.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* Left — Info */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Let's Talk</h2>
                <p className="text-muted-foreground leading-relaxed">We typically respond within 2-4 business hours. Prefer to talk? Give us a call directly.</p>
              </div>

              {/* Contact items */}
              <div className="space-y-4">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors group">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <p className="font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="bg-muted rounded-2xl p-5">
                <p className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Why Choose Us</p>
                {["98% client satisfaction rate", "500+ projects delivered", "24-48h standard turnaround", "Australian standards compliance"].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5 text-sm">
                    <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="bg-secondary rounded-2xl h-44 flex items-center justify-center border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="text-center relative z-10">
                  <MapPin size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-white/60 text-sm font-medium">Serving All of Australia</p>
                  <p className="text-white/30 text-xs">Remote · Nationwide</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-colors shadow-lg"
                data-testid="link-whatsapp"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>

              {/* Calendly block */}
              <div className="border border-border rounded-2xl p-6 text-center">
                <Calendar size={28} className="text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Book a Consultation</h3>
                <p className="text-muted-foreground text-sm mb-4">Schedule a free 15-minute discovery call to discuss your project.</p>
                <Button variant="outline" className="w-full rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-white">
                  View Calendly Schedule
                </Button>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-muted rounded-2xl p-8 md:p-10 border border-border">
                <h2 className="text-2xl font-extrabold mb-2 tracking-tight">Send a Message</h2>
                <p className="text-muted-foreground mb-8">Fill in the form and we'll get back to you within 2-4 business hours.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Full Name *</FormLabel>
                          <FormControl><Input placeholder="John Smith" className="rounded-xl h-12 bg-background" {...field} data-testid="input-name" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Company Name</FormLabel>
                          <FormControl><Input placeholder="BuildRight Pty Ltd" className="rounded-xl h-12 bg-background" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Email Address *</FormLabel>
                          <FormControl><Input type="email" placeholder="john@example.com" className="rounded-xl h-12 bg-background" {...field} data-testid="input-email" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Phone Number *</FormLabel>
                          <FormControl><Input placeholder="0400 000 000" className="rounded-xl h-12 bg-background" {...field} data-testid="input-phone" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Message *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project and requirements..." className="min-h-[140px] rounded-xl bg-background resize-none" {...field} data-testid="textarea-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" size="lg" className="w-full rounded-full font-bold text-base py-6 shadow-lg shadow-primary/20" data-testid="button-submit">
                      <Send size={18} className="mr-2" /> Send Message
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
