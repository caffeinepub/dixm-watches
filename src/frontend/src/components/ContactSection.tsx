import { useActor } from "@/hooks/useActor";
import { Clock, Loader2, MapPin, Phone, Send } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { actor } = useActor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Please wait — connecting to server...");
      return;
    }
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await actor.submitContactMessage(
        formData.name,
        formData.email,
        formData.message,
      );
      setSubmitted(true);
      toast.success(
        "Message received. Our team will be in touch within 24 hours.",
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, rgba(6,6,8,0) 60%)",
              "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.05) 0%, rgba(6,6,8,0) 60%)",
              "radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.04) 0%, rgba(6,6,8,0) 60%)",
              "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, rgba(6,6,8,0) 60%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.5em] text-gold-DEFAULT/60 uppercase mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white"
          >
            Contact <span className="gradient-gold-text">DIXM</span>
          </motion.h2>
          <div className="section-divider mt-6" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-base text-white/50 max-w-xl mx-auto mt-4"
          >
            Schedule a private viewing, request a bespoke commission, or simply
            say hello. We respond to every inquiry personally.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="mb-10">
              <h3 className="font-display text-2xl text-white font-bold mb-6">
                Private Client Services
              </h3>
              <p className="font-body text-sm text-white/50 leading-relaxed">
                Our dedicated Private Client team is available to assist with
                bespoke commissions, service inquiries, and exclusive previews.
                Every client is treated as a singular relationship.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Atelier",
                  value: "14 Rue de la Paix, Geneva, Switzerland",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Monday – Friday, 9:00 – 18:00 CET",
                },
                {
                  icon: Phone,
                  label: "Telephone",
                  value: "+41 22 000 0000",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-DEFAULT/30 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-gold-DEFAULT" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-gold-DEFAULT/60 tracking-widest uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="font-body text-sm text-white/70">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative image */}
            <div className="mt-10 relative overflow-hidden h-48">
              <img
                src="/assets/generated/dixm-avantgarde-watch.dim_800x900.jpg"
                alt="DIXM Atelier"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.5) contrast(1.1)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)",
                }}
              />
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold-DEFAULT/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold-DEFAULT/40" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-80 text-center p-8 border border-gold-DEFAULT/30"
                style={{ background: "rgba(14,14,18,0.8)" }}
              >
                <div className="w-16 h-16 border-2 border-gold-DEFAULT rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h4 className="font-display text-2xl text-white font-bold mb-2">
                  Message Received
                </h4>
                <p className="font-body text-sm text-white/50">
                  Our Private Client team will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-body text-xs tracking-widest text-gold-DEFAULT border border-gold-DEFAULT/30 px-4 py-2 hover:bg-gold-DEFAULT/10 transition-colors"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  {
                    name: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Your name",
                  },
                  {
                    name: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={`contact-${field.name}`}
                      className="block font-body text-xs tracking-[0.25em] text-gold-DEFAULT/60 uppercase mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      id={`contact-${field.name}`}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 font-body text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-gold-DEFAULT"
                      style={{
                        background: "rgba(14,14,18,0.8)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        borderRadius: 0,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(201,168,76,0.6)";
                        e.currentTarget.style.boxShadow =
                          "0 0 20px rgba(201,168,76,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(201,168,76,0.2)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-body text-xs tracking-[0.25em] text-gold-DEFAULT/60 uppercase mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 font-body text-sm text-white placeholder-white/25 outline-none transition-all duration-300 resize-none"
                    style={{
                      background: "rgba(14,14,18,0.8)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      borderRadius: 0,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(201,168,76,0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(201,168,76,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(201,168,76,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.02,
                    boxShadow: "0 0 30px rgba(201,168,76,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 font-body text-sm tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isSubmitting
                      ? "rgba(201,168,76,0.3)"
                      : "rgba(201,168,76,1)",
                    color: "#060608",
                  }}
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </motion.button>

                <p className="font-body text-xs text-white/25 text-center">
                  We respond personally to every inquiry within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
