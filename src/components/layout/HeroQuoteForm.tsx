import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroQuoteForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });

  const acceptedTypes =
    ".pdf,.dwg,.png,.jpg,.jpeg,.webp";

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      files,
      ...formData,
    });

    // Later:
    // Upload files to Cloudinary
    // Send form through EmailJS
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full max-w-[480px] lg:ml-auto"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.97] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">

        {/* Top accent */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary via-orange-400 to-yellow-400" />

        <AnimatePresence mode="wait">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    1
                  </span>

                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Start Your Estimate
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold leading-tight text-secondary">
                  Hire Per Project or Subscribe Monthly —
                  <span className="block">
                    Your Choice, Our Expertise
                  </span>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Send your architectural drawings, structural drawings,
                  MEP plans, civil drawings, specifications, schedules, or
                  scope notes. We'll review the documents and provide a clear
                  quote before starting your estimate.
                </p>
              </div>

              {/* Upload Box */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="group cursor-pointer rounded-2xl border border-dashed border-primary/40 bg-primary/[0.025] p-7 text-center transition-all duration-300 hover:border-primary hover:bg-primary/[0.06]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={acceptedTypes}
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <UploadCloud size={27} />
                </div>

                <h3 className="font-bold text-secondary">
                  Drop your plans here
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  or click to browse your files
                </p>

                <p className="mt-4 text-[11px] font-medium text-gray-400">
                  PDF, DWG, PNG, JPG & WEBP accepted
                </p>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText
                          size={17}
                          className="shrink-0 text-primary"
                        />

                        <span className="truncate text-xs font-medium text-gray-700">
                          {file.name}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="ml-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                type="button"
                disabled={files.length === 0}
                onClick={() => setStep(2)}
                className="mt-5 h-12 w-full rounded-xl bg-primary font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue With Your Quote
                <ArrowRight size={17} className="ml-2" />
              </Button>

              <p className="mt-3 text-center text-[10px] text-gray-400">
                Your plans are kept confidential.
              </p>
            </motion.div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <motion.form
              key="details"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    2
                  </span>

                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Your Details
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-secondary">
                  Tell Us About Your Project
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We've got your plans. Now give us a few details so we can
                  prepare your quote.
                </p>
              </div>

              {/* Uploaded files */}
              <div className="mb-4 rounded-xl bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-green-500"
                  />

                  <span className="text-xs font-semibold text-gray-700">
                    {files.length} file{files.length > 1 ? "s" : ""} attached
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  required
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  required
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />

                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
                />

                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 sm:col-span-2"
                >
                  <option value="">Select Project Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="civil">Civil</option>
                  <option value="structural">Structural</option>
                  <option value="industrial">Industrial</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your project..."
                  rows={3}
                  className="resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 sm:col-span-2"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-12 rounded-xl px-5"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="h-12 flex-1 rounded-xl bg-primary font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  Request a Quote
                  <ArrowRight size={17} className="ml-2" />
                </Button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}