
import { useState, useRef } from "react";
import type { DragEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cubicBezier, motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  X,
  FileText,
  User,
  Briefcase,
  CloudUpload,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

// Keep total below Vercel request-body limit after Base64 conversion.
const MAX_TOTAL_FILE_SIZE = 2.5 * 1024 * 1024;

const ACCEPTED = ".pdf,.zip,.xlsx,.jpg,.jpeg,.png";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".zip",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
];

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
  scopeDescription: z
    .string()
    .min(20, "Please provide at least 20 characters"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const STEPS = [
  { label: "About You", icon: User },
  { label: "Project Details", icon: Briefcase },
  { label: "Upload Plans", icon: CloudUpload },
];

type ApiAttachment = {
  fileName: string;
  contentBase64: string;
  contentType: string;
};

function ProgressBar({ current }: { current: number }) {
  const pct = (current / (STEPS.length - 1)) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4">
        {STEPS.map(({ label, icon: Icon }, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${
                i < current
                  ? "bg-primary border-primary text-white"
                  : i === current
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < current ? (
                <CheckCircle2 size={18} />
              ) : (
                <Icon size={18} />
              )}
            </div>

            <span
              className={`text-xs font-semibold hidden sm:block ${
                i === current ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
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

// Convert a browser File into the attachment format expected by the API.
async function convertFileToBase64(file: File): Promise<ApiAttachment> {
  const bytes = new Uint8Array(await file.arrayBuffer());

  let binary = "";

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  const extension = file.name.toLowerCase().slice(
    file.name.lastIndexOf(".")
  );

  let contentType = file.type;

  if (extension === ".pdf") {
    contentType = "application/pdf";
  } else if (extension === ".zip") {
    contentType = "application/zip";
  } else if (extension === ".xlsx") {
    contentType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  } else if (extension === ".jpg" || extension === ".jpeg") {
    contentType = "image/jpeg";
  } else if (extension === ".png") {
    contentType = "image/png";
  }

  // The API currently expects .jpg for image/jpeg.
  const fileName =
    extension === ".jpeg"
      ? file.name.replace(/\.jpeg$/i, ".jpg")
      : file.name;

  return {
    fileName,
    contentBase64: btoa(binary),
    contentType,
  };
}

export default function RequestQuote() {
  const [step, setStep] = useState(0);

  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      projectName: "",
      projectAddress: "",
      projectType: "",
      scopeDescription: "",
    },
  });

  // Add and validate uploaded files.
  const addFiles = (newFiles: File[]) => {
    setFileError("");
    setSubmitError("");

    const currentSize = files.reduce((total, file) => {
      return total + file.size;
    }, 0);

    const validFiles: File[] = [];
    let totalSize = currentSize;

    for (const file of newFiles) {
      const extension = file.name.toLowerCase().slice(
        file.name.lastIndexOf(".")
      );

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        setFileError(
          `${file.name} is not supported. Please upload PDF, ZIP, XLSX, JPG or PNG.`
        );
        return;
      }

      if (file.size === 0) {
        setFileError(`${file.name} is empty.`);
        return;
      }

      if (totalSize + file.size > MAX_TOTAL_FILE_SIZE) {
        setFileError(
          "Combined file size must be 2.5 MB or less. Please upload smaller files."
        );
        return;
      }

      totalSize += file.size;
      validFiles.push(file);
    }

    setFiles((previous) => [...previous, ...validFiles]);

    // Allow selecting the same file again after removing it.
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    addFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index: number) => {
    setFiles((previous) =>
      previous.filter((_, i) => i !== index)
    );

    setFileError("");
  };

  // Send the complete quote request to the Resend API.
  const handleSubmit = async () => {
    if (!step1Data || !step2Data) {
      setSubmitError(
        "Please complete your personal and project details first."
      );
      return;
    }

    if (isSending) return;

    setIsSending(true);
    setSubmitError("");
    setFileError("");

    try {
      // Convert all selected files into Base64 attachments.
      const attachments = await Promise.all(
        files.map((file) => convertFileToBase64(file))
      );

      const payload = {
        formType: "request-quote",

        fullName: step1Data.fullName.trim(),
        email: step1Data.email.trim(),
        phone: step1Data.phone.trim(),
        companyName: step1Data.companyName?.trim() || "",

        projectName: step2Data.projectName.trim(),
        projectAddress: step2Data.projectAddress.trim(),
        projectType: step2Data.projectType,
        scopeDescription: step2Data.scopeDescription.trim(),

        honeypot: "",
        attachments,
      };

      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to submit your quote request."
        );
      }

      console.log("Quote request sent successfully:", result.id);

      // Show success screen only after API confirms email submission.
      setSubmitted(true);
    } catch (error) {
      console.error("Request Quote submission error:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSending(false);
    }
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
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            <CheckCircle2 size={48} className="text-primary" />
          </motion.div>

          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            Quote Submitted!
          </h1>

          <p className="text-muted-foreground text-lg mb-2">
            Thank you, <strong>{step1Data?.fullName}</strong>.
          </p>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            We've received your request and will review your project details.
            Expect a response within{" "}
            <strong>2-4 business hours</strong>.
          </p>

          <div className="bg-muted rounded-2xl p-6 text-left mb-8 border border-border">
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              What Happens Next
            </h3>

            <ol className="space-y-3 text-sm">
              {[
                "Our team reviews your plans and requirements.",
                "We confirm the price and turnaround time via email.",
                "Work begins immediately upon your confirmation.",
                "Your completed estimate is delivered to your inbox.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-extrabold text-primary">
                    {i + 1}.
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full font-bold px-10"
              asChild
            >
              <Link href="/">Return Home</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full font-bold px-10"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary py-12 text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Request a <span className="text-primary">Quote</span>
        </motion.h1>

        <motion.p
          className="text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Complete the form below — we'll respond within 2-4 business hours.
        </motion.p>
      </div>

      <div className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar current={step} />

          <AnimatePresence mode="wait">
            {/* STEP 1: ABOUT YOU */}
            {step === 0 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">
                  About You
                </h2>

                <p className="text-muted-foreground mb-7">
                  Tell us who you are so we can personalise your estimate.
                </p>

                <Form {...form1}>
                  <form
                    onSubmit={form1.handleSubmit((data) => {
                      setStep1Data(data);
                      setStep(1);
                    })}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form1.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Full Name *
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="John Smith"
                                className="h-12 rounded-xl"
                                {...field}
                                data-testid="input-fullname"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form1.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Company Name
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="BuildRight Pty Ltd"
                                className="h-12 rounded-xl"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form1.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Email Address *
                            </FormLabel>

                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className="h-12 rounded-xl"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form1.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Phone Number *
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="0400 000 000"
                                className="h-12 rounded-xl"
                                {...field}
                                data-testid="input-phone"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full font-bold text-base py-6"
                      data-testid="button-next-step1"
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {/* STEP 2: PROJECT DETAILS */}
            {step === 1 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">
                  Project Details
                </h2>

                <p className="text-muted-foreground mb-7">
                  Tell us about the project you need estimated.
                </p>

                <Form {...form2}>
                  <form
                    onSubmit={form2.handleSubmit((data) => {
                      setStep2Data(data);
                      setStep(2);
                    })}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form2.control}
                        name="projectName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Project Name *
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="My Coastal Home"
                                className="h-12 rounded-xl"
                                {...field}
                                data-testid="input-projectname"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form2.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              Project Type *
                            </FormLabel>

                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  className="h-12 rounded-xl"
                                  data-testid="select-projecttype"
                                >
                                  <SelectValue placeholder="Select type..." />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectItem value="residential">
                                  Residential
                                </SelectItem>
                                <SelectItem value="commercial">
                                  Commercial
                                </SelectItem>
                                <SelectItem value="civil-structural">
                                  Civil & Structural
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form2.control}
                      name="projectAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Project Address *
                          </FormLabel>

                          <FormControl>
                            <Input
                              placeholder="123 Construction Ave, Sydney NSW 2000"
                              className="h-12 rounded-xl"
                              {...field}
                              data-testid="input-address"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form2.control}
                      name="scopeDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Scope Description *
                          </FormLabel>

                          <FormControl>
                            <Textarea
                              placeholder="Describe your project: size, storeys, key materials, tender deadline, any specific requirements..."
                              className="min-h-[120px] rounded-xl resize-none"
                              {...field}
                              data-testid="textarea-scope"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1 rounded-full font-bold"
                        onClick={() => setStep(0)}
                        data-testid="button-back-step2"
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                      </Button>

                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 rounded-full font-bold"
                        data-testid="button-next-step2"
                      >
                        Continue
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {/* STEP 3: UPLOAD PLANS */}
            {step === 2 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-extrabold mb-1 tracking-tight">
                  Upload Your Plans
                </h2>

                <p className="text-muted-foreground mb-7">
                  Attach your project plans for a more accurate estimate.
                </p>

                {/* Drop zone */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    dragging
                      ? "border-primary bg-primary/5 scale-[1.01]"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  data-testid="dropzone-files"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
                      dragging
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Upload size={28} />
                  </div>

                  <p className="font-bold text-lg mb-1">
                    {dragging
                      ? "Drop files here"
                      : "Drop files or click to browse"}
                  </p>

                  <p className="text-muted-foreground text-sm mb-4">
                    PDF, ZIP, XLSX, JPG, PNG — max 2.5 MB combined
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {["PDF", "ZIP", "XLSX", "JPG", "PNG"].map((fmt) => (
                      <span
                        key={fmt}
                        className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED}
                    className="hidden"
                    onChange={(e) =>
                      addFiles(Array.from(e.target.files ?? []))
                    }
                    data-testid="input-fileupload"
                  />
                </div>

                {fileError && (
                  <p className="text-destructive text-sm mt-2">
                    {fileError}
                  </p>
                )}

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, i) => (
                      <motion.div
                        key={`${file.name}-${i}`}
                        className="flex items-center justify-between bg-muted rounded-xl px-4 py-3 border border-border"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText
                            size={16}
                            className="text-primary shrink-0"
                          />

                          <span className="text-sm font-semibold truncate max-w-[200px]">
                            {file.name}
                          </span>

                          <span className="text-xs text-muted-foreground shrink-0">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-muted-foreground hover:text-destructive transition-colors ml-3"
                          data-testid={`button-remove-file-${i}`}
                          aria-label={`Remove ${file.name}`}
                        >
                          <X size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}

                <p className="text-muted-foreground text-sm mt-4 italic text-center">
                  No files yet? You can submit your quote request without
                  files and email your plans separately.
                </p>

                {submitError && (
                  <div
                    role="alert"
                    className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
                  >
                    {submitError}
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1 rounded-full font-bold"
                    onClick={() => setStep(1)}
                    disabled={isSending}
                    data-testid="button-back-step3"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>

                  <Button
                    type="button"
                    size="lg"
                    className="flex-1 rounded-full font-bold shadow-lg shadow-primary/20"
                    onClick={handleSubmit}
                    disabled={isSending}
                    data-testid="button-submit-quote"
                  >
                    {isSending ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight size={16} className="ml-2" />
                      </>
                    )}
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
