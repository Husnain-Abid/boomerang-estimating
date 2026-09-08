"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";


// ─────────────────────────────────────────────
// FORM SCHEMA
// ─────────────────────────────────────────────

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters."),

  email: z
    .string()
    .email("Invalid email address."),

  phone: z
    .string()
    .min(8, "Phone number is required."),

  companyName: z
    .string()
    .optional(),

  projectName: z
    .string()
    .min(2, "Project name is required."),

  projectAddress: z
    .string()
    .min(5, "Project address is required."),

  projectType: z
    .string()
    .min(1, "Please select a project type."),

  scope: z
    .string()
    .min(10, "Please provide a brief scope description."),
});

type FormValues = z.infer<typeof formSchema>;


// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function Quote() {
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);


  // ───────────────────────────────────────────
  // REACT HOOK FORM
  // ───────────────────────────────────────────

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      projectName: "",
      projectAddress: "",
      projectType: "",
      scope: "",
    },
  });


  // ───────────────────────────────────────────
  // FILE SELECT
  // ───────────────────────────────────────────

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // 50MB max
    const maxSize = 50 * 1024 * 1024;

    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description:
          "Please select a file smaller than 50MB.",
      });

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);
  };


  // ───────────────────────────────────────────
  // REMOVE FILE
  // ───────────────────────────────────────────

  const removeFile = () => {
    setSelectedFile(null);

    const fileInput =
      document.getElementById(
        "plans"
      ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };


  // ───────────────────────────────────────────
  // STEP VALIDATION
  // ───────────────────────────────────────────

  const nextStep = async () => {
    if (step === 1) {
      const valid = await form.trigger([
        "fullName",
        "email",
        "phone",
        "companyName",
      ]);

      if (valid) {
        setStep(2);
      }

      return;
    }

    if (step === 2) {
      const valid = await form.trigger([
        "projectName",
        "projectAddress",
        "projectType",
        "scope",
      ]);

      if (valid) {
        setStep(3);
      }

      return;
    }
  };


  // ───────────────────────────────────────────
  // PREVIOUS STEP
  // ───────────────────────────────────────────

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  // ───────────────────────────────────────────
  // EMAILJS SUBMIT
  // ───────────────────────────────────────────

  const onSubmit = async (data: FormValues) => {
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
const EMAILJS_SERVICE_ID = "service_wg7bp55";
const EMAILJS_TEMPLATE_ID = "template_q64htkv";
const EMAILJS_PUBLIC_KEY = "HQrDPHxkWKjpqXRXw";


      // Send complete HTML form to EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );


      // Success
      setIsSuccess(true);

      form.reset();

      setSelectedFile(null);

      setStep(1);


      toast({
        title: "Quote Request Sent!",
        description:
          "Thank you. We'll be in touch within 2–4 business hours.",
      });

    } catch (error) {
      console.error(
        "EmailJS Quote Error:",
        error
      );

      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "Unable to send your quote request. Please try again.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };


  // ───────────────────────────────────────────
  // SUCCESS SCREEN
  // ───────────────────────────────────────────

  if (isSuccess) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center max-w-xl"
        >
          <CheckCircle2
            className="mx-auto mb-6 text-green-500"
            size={70}
          />

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Quote Request Sent!
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Thank you for contacting Boomerang
            Estimating. Our team will review your
            project details and get back to you
            within 2–4 business hours.
          </p>

          <Button
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
            }}
          >
            Submit Another Request
          </Button>
        </motion.div>
      </section>
    );
  }


  // ─────────────────────────────────────────────
  // MAIN FORM
  // ─────────────────────────────────────────────

  return (
    <section className="py-20 md:py-28 px-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-wider mb-4 text-primary">
            Get a Quote
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Request Your
            <span className="text-primary">
              {" "}Estimate
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tell us about your project and our
            estimating team will get back to you
            with the information you need.
          </p>
        </motion.div>


        {/* PROGRESS */}
        <div className="mb-10">

          <div className="flex items-center justify-between mb-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center"
              >
                <div
                  className={`
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    font-semibold
                    transition-all duration-300
                    ${
                      step >= item
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {item}
                </div>

                {item !== 3 && (
                  <div
                    className={`
                      hidden sm:block
                      h-1 w-20 md:w-32
                      mx-2
                      transition-all duration-300
                      ${
                        step > item
                          ? "bg-primary"
                          : "bg-muted"
                      }
                    `}
                  />
                )}
              </div>
            ))}

          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Personal Info</span>
            <span>Project Details</span>
            <span>Upload Plans</span>
          </div>

        </div>


        {/* FORM */}
        <Form {...form}>

          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >

            {/* ─────────────────────────────── */}
            {/* STEP 1 */}
            {/* ─────────────────────────────── */}

            <div
              className={
                step === 1
                  ? "block"
                  : "hidden"
              }
            >

              <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">

                <div className="mb-8">

                  <h2 className="text-2xl font-bold mb-2">
                    Personal Information
                  </h2>

                  <p className="text-muted-foreground">
                    Tell us how we can contact you.
                  </p>

                </div>


                <div className="grid md:grid-cols-2 gap-6">

                  {/* FULL NAME */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name *
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  {/* EMAIL */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address *
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  {/* PHONE */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number *
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  {/* COMPANY */}
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company Name
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Your Company"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

              </div>


              {/* NEXT */}
              <div className="flex justify-end mt-6">

                <Button
                  type="button"
                  onClick={nextStep}
                  className="gap-2"
                >
                  Next Step
                  <ArrowRight size={18} />
                </Button>

              </div>

            </div>


            {/* ─────────────────────────────── */}
            {/* STEP 2 */}
            {/* ─────────────────────────────── */}

            <div
              className={
                step === 2
                  ? "block"
                  : "hidden"
              }
            >

              <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">

                <div className="mb-8">

                  <h2 className="text-2xl font-bold mb-2">
                    Project Details
                  </h2>

                  <p className="text-muted-foreground">
                    Give us some information about
                    your project.
                  </p>

                </div>


                <div className="space-y-6">

                  {/* PROJECT NAME */}
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Project Name *
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Commercial Building Project"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <div className="grid md:grid-cols-2 gap-6">

                    {/* PROJECT TYPE */}
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>

                          <FormLabel>
                            Project Type *
                          </FormLabel>

                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >

                            <FormControl>

                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>

                            </FormControl>

                            <SelectContent>

                              <SelectItem value="Residential">
                                Residential
                              </SelectItem>

                              <SelectItem value="Commercial">
                                Commercial
                              </SelectItem>

                              <SelectItem value="Industrial">
                                Industrial
                              </SelectItem>

                              <SelectItem value="Renovation">
                                Renovation
                              </SelectItem>

                              <SelectItem value="Other">
                                Other
                              </SelectItem>

                            </SelectContent>

                          </Select>


                          {/* IMPORTANT FOR EMAILJS */}
                          <input
                            type="hidden"
                            name="projectType"
                            value={field.value || ""}
                          />

                          <FormMessage />

                        </FormItem>
                      )}
                    />


                    {/* PROJECT ADDRESS */}
                    <FormField
                      control={form.control}
                      name="projectAddress"
                      render={({ field }) => (
                        <FormItem>

                          <FormLabel>
                            Project Address *
                          </FormLabel>

                          <FormControl>
                            <Input
                              placeholder="Project location"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />

                        </FormItem>
                      )}
                    />

                  </div>


                  {/* SCOPE */}
                  <FormField
                    control={form.control}
                    name="scope"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel>
                          Project Scope *
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe your project and the estimating services you need..."
                            rows={7}
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />

                      </FormItem>
                    )}
                  />

                </div>

              </div>


              {/* BUTTONS */}
              <div className="flex justify-between mt-6">

                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  className="gap-2"
                >
                  <ArrowLeft size={18} />
                  Previous
                </Button>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="gap-2"
                >
                  Next Step
                  <ArrowRight size={18} />
                </Button>

              </div>

            </div>


            {/* ─────────────────────────────── */}
            {/* STEP 3 */}
            {/* ─────────────────────────────── */}

            <div
              className={
                step === 3
                  ? "block"
                  : "hidden"
              }
            >

              <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">

                <div className="mb-8">

                  <h2 className="text-2xl font-bold mb-2">
                    Upload Plans
                  </h2>

                  <p className="text-muted-foreground">
                    Upload your project plans,
                    drawings or other documents.
                  </p>

                </div>


                {/* FILE UPLOAD */}
                <div
                  className="
                    border-2 border-dashed
                    rounded-2xl
                    p-8 md:p-12
                    text-center
                    hover:border-primary
                    transition-colors
                  "
                >

                  <input
                    id="plans"
                    name="plans"
                    type="file"
                    className="hidden"
                    accept=".pdf,.dwg,.zip,.xlsx,.xls,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />


                  {!selectedFile ? (
                    <>

                      <div className="flex justify-center mb-5">

                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">

                          <Upload
                            size={30}
                            className="text-primary"
                          />

                        </div>

                      </div>


                      <h3 className="text-lg font-semibold mb-2">
                        Upload Project Files
                      </h3>

                      <p className="text-muted-foreground mb-6">
                        PDF, DWG, ZIP, XLSX, JPG or PNG
                      </p>

                      <p className="text-sm text-muted-foreground mb-6">
                        Maximum file size: 50MB
                      </p>


                      <label
                        htmlFor="plans"
                        className="
                          inline-flex
                          items-center
                          justify-center
                          rounded-md
                          bg-primary
                          text-primary-foreground
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          cursor-pointer
                          hover:bg-primary/90
                          transition-colors
                        "
                      >
                        Select File
                      </label>

                    </>
                  ) : (

                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted">

                      <div className="flex items-center gap-3 min-w-0">

                        <FileText
                          className="text-primary shrink-0"
                          size={28}
                        />

                        <div className="text-left min-w-0">

                          <p className="font-medium truncate">
                            {selectedFile.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {(
                              selectedFile.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>

                        </div>

                      </div>


                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                      >
                        <X size={18} />
                      </Button>

                    </div>

                  )}

                </div>

              </div>


              {/* BUTTONS */}
              <div className="flex justify-between mt-6">

                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  className="gap-2"
                >
                  <ArrowLeft size={18} />
                  Previous
                </Button>


                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 min-w-[170px]"
                >

                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Quote

                      <ArrowRight size={18} />
                    </>
                  )}

                </Button>

              </div>

            </div>

          </form>

        </Form>

      </div>

    </section>
  );
}