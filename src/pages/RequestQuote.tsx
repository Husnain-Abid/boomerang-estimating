import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Upload, CheckCircle2, X, FileText, User, Briefcase, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Phone number is required"),
  companyName: z.string().optional(),
});
const step2Schema = z.object({
  projectName: z.string().min(2, "Project name is required"),
  projectAddress: z.string().min(5, "Project address is required"),
  projectType: z.string().min(1, "Please select a project type"),
  scopeDescription: z.string().min(20, "Please provide at least 20 characters"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const STEPS = [
  { label: "About You", icon: User },
  { label: "Project Details", icon: Briefcase },
  { label: "Upload Plans", icon: CloudUpload },
];

const ACCEPTED = ".pdf,.dwg,.zip,.xlsx,.jpg,.jpeg,.png";

function ProgressBar({ current }: { current: number }) {
  const pct = ((current) / (STEPS.length - 1)) * 100;
  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4">
        {STEPS.map(({ label, icon: Icon }, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${
              i < current ? "bg-primary border-primary text-white" : i === current ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"
            }`}>
              {i < current ? <CheckCircle2 size={18} /> : <Icon size={18} />}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${i === current ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: easeOut }}
        />
      </div>
    </div>
  );
}

export default function RequestQuote() {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const form1 = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: { fullName: "", email: "", phone: "", companyName: "" } });
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: { projectName: "", projectAddress: "", projectType: "", scopeDescription: "" } });

  const addFiles = (newFiles: File[]) => {
    setFileError("");
    for (const f of newFiles) {
      if (f.size > 50 * 1024 * 1024) { setFileError(`${f.name} exceeds the 50MB limit.`); return; }
    }
    setFiles((p) => [...p, ...newFiles]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleSubmit = () => {
    // FUTURE: Connect to EmailJS for email delivery
    // FUTURE: Connect to Cloudinary for secure file storage
    console.log("Quote submission:", { ...step1Data, ...step2Data, files: files.map((f) => f.name) });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          className="max-w-lg w-full text-center"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 size={48} className="text-primary" />
          </motion.div>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Quote Submitted!</h1>
          <p className="text-muted-foreground text-lg mb-2">Thank you, <strong>{step1Data?.fullName}</strong>.</p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We've received your request and will review your project details. Expect a response within <strong>2-4 business hours</strong>.
          </p>
          <div className="bg-muted rounded-2xl p-6 text-left mb-8 border border-border">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">What Happens Next</h3>
            <ol className="space-y-3 text-sm">
              {["Our team reviews your plans and requirements.", "We confirm the price and turnaround time via email.", "Work begins immediately upon your confirmation.", "Your completed estimate is delivered to your inbox."].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-extrabold text-primary">{i + 1}.</span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full font-bold px-10" asChild><Link href="/">Return Home</Link></Button>
            <Button size="lg" variant="outline" className="rounded-full font-bold px-10" asChild><Link href="/contact">Contact Us</Link></Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary py-12 text-center">
        <motion.h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          Request a <span className="text-primary">Quote</span>
        </motion.h1>
        <motion.p className="text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          Complete the form below — we'll respond within 2-4 business hours.
        </motion.p>
      </div>

      <div className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar current={step} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">About You</h2>
                <p className="text-muted-foreground mb-7">Tell us who you are so we can personalise your estimate.</p>
                <Form {...form1}>
                  <form onSubmit={form1.handleSubmit((d) => { setStep1Data(d); setStep(1); })} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form1.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Full Name *</FormLabel>
                          <FormControl><Input placeholder="John Smith" className="h-12 rounded-xl" {...field} data-testid="input-fullname" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form1.control} name="companyName" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Company Name</FormLabel>
                          <FormControl><Input placeholder="BuildRight Pty Ltd" className="h-12 rounded-xl" {...field} /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form1.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Email Address *</FormLabel>
                          <FormControl><Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" {...field} data-testid="input-email" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form1.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Phone Number *</FormLabel>
                          <FormControl><Input placeholder="0400 000 000" className="h-12 rounded-xl" {...field} data-testid="input-phone" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                    </div>
                    <Button type="submit" size="lg" className="w-full rounded-full font-bold text-base py-6" data-testid="button-next-step1">
                      Continue <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">Project Details</h2>
                <p className="text-muted-foreground mb-7">Tell us about the project you need estimated.</p>
                <Form {...form2}>
                  <form onSubmit={form2.handleSubmit((d) => { setStep2Data(d); setStep(2); })} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form2.control} name="projectName" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Project Name *</FormLabel>
                          <FormControl><Input placeholder="My Coastal Home" className="h-12 rounded-xl" {...field} data-testid="input-projectname" /></FormControl>
                          <FormMessage /></FormItem>
                      )} />
                      <FormField control={form2.control} name="projectType" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Project Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="h-12 rounded-xl" data-testid="select-projecttype"><SelectValue placeholder="Select type..." /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="civil-structural">Civil & Structural</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form2.control} name="projectAddress" render={({ field }) => (
                      <FormItem><FormLabel className="font-semibold">Project Address *</FormLabel>
                        <FormControl><Input placeholder="123 Construction Ave, Sydney NSW 2000" className="h-12 rounded-xl" {...field} data-testid="input-address" /></FormControl>
                        <FormMessage /></FormItem>
                    )} />
                    <FormField control={form2.control} name="scopeDescription" render={({ field }) => (
                      <FormItem><FormLabel className="font-semibold">Scope Description *</FormLabel>
                        <FormControl><Textarea placeholder="Describe your project: size, storeys, key materials, tender deadline, any specific requirements..." className="min-h-[120px] rounded-xl resize-none" {...field} data-testid="textarea-scope" /></FormControl>
                        <FormMessage /></FormItem>
                    )} />
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" size="lg" className="flex-1 rounded-full font-bold" onClick={() => setStep(0)} data-testid="button-back-step2">
                        <ArrowLeft size={16} className="mr-2" /> Back
                      </Button>
                      <Button type="submit" size="lg" className="flex-1 rounded-full font-bold" data-testid="button-next-step2">
                        Continue <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">Upload Your Plans</h2>
                <p className="text-muted-foreground mb-7">Attach your project plans for a more accurate estimate. You can also email them after submission.</p>

                {/* Drop zone */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    dragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  data-testid="dropzone-files"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${dragging ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    <Upload size={28} />
                  </div>
                  <p className="font-bold text-lg mb-1">{dragging ? "Drop files here" : "Drop files or click to browse"}</p>
                  <p className="text-muted-foreground text-sm mb-4">PDF, DWG, ZIP, XLSX, JPG, PNG — max 50MB per file</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["PDF", "DWG", "ZIP", "XLSX", "JPG", "PNG"].map((fmt) => (
                      <span key={fmt} className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground">{fmt}</span>
                    ))}
                  </div>
                  <input ref={fileInputRef} type="file" multiple accept={ACCEPTED} className="hidden" onChange={(e) => addFiles(Array.from(e.target.files ?? []))} data-testid="input-fileupload" />
                </div>

                {fileError && <p className="text-destructive text-sm mt-2">{fileError}</p>}

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((f, i) => (
                      <motion.div key={i} className="flex items-center justify-between bg-muted rounded-xl px-4 py-3 border border-border" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-primary" />
                          <span className="text-sm font-semibold truncate max-w-[200px]">{f.name}</span>
                          <span className="text-xs text-muted-foreground">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                        </div>
                        <button onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive transition-colors" data-testid={`button-remove-file-${i}`}>
                          <X size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}

                <p className="text-muted-foreground text-sm mt-4 italic text-center">No files yet? You can email plans after submission — we'll still get your quote started.</p>

                <div className="flex gap-4 mt-8">
                  <Button type="button" variant="outline" size="lg" className="flex-1 rounded-full font-bold" onClick={() => setStep(1)} data-testid="button-back-step3">
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                  <Button type="button" size="lg" className="flex-1 rounded-full font-bold shadow-lg shadow-primary/20" onClick={handleSubmit} data-testid="button-submit-quote">
                    Submit Request <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
