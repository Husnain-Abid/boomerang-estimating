import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, UploadCloud, ChevronRight, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function Quote() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      isValid = await form.trigger(["projectName", "projectAddress", "projectType", "scope"]);
    }
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    // TODO: Integrate EmailJS or backend API here
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 text-center border-primary/20 shadow-xl">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <CardTitle className="text-2xl">Quote Request Sent!</CardTitle>
            <CardDescription className="text-base mt-2">
              Thank you for reaching out. Our estimating team has received your details and will get back to you within 2-4 business hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => window.location.href = "/"}>
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Get a Free Quote</h1>
          <p className="text-lg text-muted-foreground">Upload your plans and let us provide a competitive estimate.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2 px-2">
            <span className={step >= 1 ? "text-primary" : ""}>Personal Info</span>
            <span className={step >= 2 ? "text-primary" : ""}>Project Details</span>
            <span className={step >= 3 ? "text-primary" : ""}>Upload Plans</span>
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* STEP 1: Personal Info */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-2xl font-semibold mb-6">Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                            <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
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
                            <FormControl><Input placeholder="0400 000 000" {...field} /></FormControl>
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
                            <FormControl><Input placeholder="BuildRight Pty Ltd" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Project Details */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-2xl font-semibold mb-6">Project Details</h2>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="projectName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name *</FormLabel>
                            <FormControl><Input placeholder="Smith Residence" {...field} /></FormControl>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="civil">Civil & Structural</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
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
                            <FormLabel>Project Address / Location *</FormLabel>
                            <FormControl><Input placeholder="Sydney, NSW" {...field} /></FormControl>
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
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-2xl font-semibold mb-6">Upload Plans</h2>
                    <div className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <UploadCloud className="text-primary" size={28} />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Click or drag files here to upload</h3>
                      <p className="text-sm text-muted-foreground mb-4">Accepted files: PDF, DWG, ZIP, XLSX, JPG, PNG (Max 50MB)</p>
                      <Button type="button" variant="secondary">Select Files</Button>
                      {/* Note: Frontend only dummy upload */}
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-border mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2" size={16} /> Back
                    </Button>
                  ) : (
                    <div></div> // Spacer
                  )}

                  {step < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      Next Step <ChevronRight className="ml-2" size={16} />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-white min-w-[150px]">
                      {isSubmitting ? "Submitting..." : "Submit Quote Request"}
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
