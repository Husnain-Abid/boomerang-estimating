
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CheckCircle2,
  UploadCloud,
  ChevronRight,
  ArrowLeft,
  X,
  FileText,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/zip",
  "application/x-zip-compressed",
];

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(8, "Phone number is required."),
  companyName: z.string().optional(),
  projectName: z.string().min(2, "Project name is required."),
  projectAddress: z.string().min(5, "Project address is required."),
  projectType: z.string().min(1, "Please select a project type."),
  scope: z.string().min(10, "Please provide a brief scope description."),
});

type FormValues = z.infer<typeof formSchema>;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Unable to read the selected file."));
        return;
      }

      resolve(result.split(",")[1]);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the selected file."));
    };

    reader.readAsDataURL(file);
  });
}

export default function Quote() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const nextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await form.trigger(["fullName", "email", "phone"]);
    } else if (step === 2) {
      isValid = await form.trigger([
        "projectName",
        "projectAddress",
        "projectType",
        "scope",
      ]);
    }

    if (isValid) {
      setSubmitError("");
      setStep((current) => current + 1);
    }
  };

  const prevStep = () => {
    setSubmitError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSubmitError("");

    if (file.size > MAX_FILE_SIZE) {
      setSubmitError("Please select a file smaller than 3 MB.");
      event.target.value = "";
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setSubmitError(
        "Unsupported file type. Please upload PDF, JPG, PNG, or ZIP."
      );
      event.target.value = "";
      return;
    }

    const extension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf("."));

    const allowedExtensions = [".pdf", ".jpg", ".png", ".zip"];

    if (!allowedExtensions.includes(extension)) {
      setSubmitError("The selected file extension is not supported.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      let attachment:
        | {
            fileName: string;
            contentBase64: string;
            contentType: string;
          }
        | undefined;

      if (selectedFile) {
        if (selectedFile.size > MAX_FILE_SIZE) {
          throw new Error("Please upload a file smaller than 3 MB.");
        }

        attachment = {
          fileName: selectedFile.name,
          contentBase64: await fileToBase64(selectedFile),
          contentType: selectedFile.type,
        };
      }

      // Include all quote details in the project description.
      // The current API accepts this field as "message".
      const projectMessage = `
Phone Number: ${data.phone}
Project Name: ${data.projectName}
Project Type: ${data.projectType}
Project Address / Location: ${data.projectAddress}

Scope of Work:
${data.scope}
      `.trim();

      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          companyName: data.companyName || "",
          website: "",
          message: projectMessage,
          honeypot: "",
          attachment,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to submit your quote request."
        );
      }

      setIsSuccess(true);
      form.reset();
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Quote form error:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 text-center border-primary/20 shadow-xl">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>

            <CardTitle className="text-2xl">
              Quote Request Sent!
            </CardTitle>

            <CardDescription className="text-base mt-2">
              Thank you for reaching out. Our estimating team has received
              your details and will get back to you within 2-4 business hours.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              className="w-full"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-muted/30">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get a Free Quote
          </h1>

          <p className="text-lg text-muted-foreground">
            Upload your plans and let us provide a competitive estimate.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2 px-2">
            <span className={step >= 1 ? "text-primary" : ""}>
              Personal Info
            </span>

            <span className={step >= 2 ? "text-primary" : ""}>
              Project Details
            </span>

            <span className={step >= 3 ? "text-primary" : ""}>
              Upload Plans
            </span>
          </div>

          <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* STEP 1: Personal Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Personal Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
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

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="0400 000 000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="BuildRight Pty Ltd"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Project Details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Project Details
                    </h2>

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Smith Residence"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectItem value="residential">
                                  Residential
                                </SelectItem>
                                <SelectItem value="commercial">
                                  Commercial
                                </SelectItem>
                                <SelectItem value="civil">
                                  Civil & Structural
                                </SelectItem>
                                <SelectItem value="other">
                                  Other
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Project Address / Location *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Sydney, NSW"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="scope"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Scope of Work *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="E.g., Require full BOQ for a 4-story commercial building..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: File Upload */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Upload Plans
                    </h2>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.zip"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    <div
                      className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault();

                        const file = event.dataTransfer.files?.[0];

                        if (!file) return;

                        const transfer = new DataTransfer();
                        transfer.items.add(file);

                        if (fileInputRef.current) {
                          fileInputRef.current.files = transfer.files;
                          fileInputRef.current.dispatchEvent(
                            new Event("change", { bubbles: true })
                          );
                        }
                      }}
                    >
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <UploadCloud className="text-primary" size={28} />
                      </div>

                      <h3 className="text-lg font-medium mb-2">
                        Click or drag files here to upload
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4">
                        Accepted files: PDF, ZIP, JPG, PNG (Max 3 MB)
                      </p>

                      <Button type="button" variant="secondary">
                        Select Files
                      </Button>
                    </div>

                    {selectedFile && (
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border p-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText
                            className="text-primary shrink-0"
                            size={24}
                          />

                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {selectedFile.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={removeFile}
                          aria-label="Remove selected file"
                        >
                          <X size={18} />
                        </Button>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-4">
                      File upload is optional. You can submit your quote
                      request without an attachment.
                    </p>
                  </motion.div>
                )}

                {/* Submission Error */}
                {submitError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                  >
                    {submitError}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border mt-8">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2" size={16} />
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      Next Step
                      <ChevronRight className="ml-2" size={16} />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-white min-w-[150px]"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Quote Request"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
