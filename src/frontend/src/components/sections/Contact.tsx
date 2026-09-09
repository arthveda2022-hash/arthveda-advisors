import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const SERVICE_OPTIONS = [
  "GST Registration & Filing",
  "Income Tax Return Filing",
  "Business Registration",
  "Accounting & Bookkeeping",
  "Trademark Registration",
  "Due Diligence Services",
] as const;

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 76206 62243",
    href: "tel:+917620662243",
    ocid: "contact.phone_link",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Arthveda2022@gmail.com",
    href: "mailto:Arthveda2022@gmail.com",
    ocid: "contact.email_link",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Chandrai Capital, Ambegaon BK, Pune, Maharashtra – 411046",
    href: undefined,
    ocid: "contact.address",
  },
  {
    icon: Clock,
    label: "Business hours",
    value: "Mon–Fri: 9:30 AM – 6:30 PM · Sat: 10:00 AM – 2:00 PM",
    href: undefined,
    ocid: "contact.hours",
  },
] as const;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // No backend submission — show success feedback only.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch shortly.", {
      description: `Your enquiry about "${data.service}" has been received.`,
    });
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-muted/30" aria-label="Contact us">
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="flex max-w-2xl flex-col gap-4"
        >
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground">
            Get in touch
          </span>
          <h2 className="serif-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Tell us what you need help with and we’ll get back to you within one
            business day. The first consultation is always free.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card className="h-full gap-0 border-border/70 bg-card p-7 shadow-card">
              <h3 className="serif-display text-xl font-semibold tracking-tight text-foreground">
                Reach us directly
              </h3>
              <div className="my-6 h-px w-full bg-border" />
              <ul className="flex flex-col gap-6">
                {CONTACT_DETAILS.map(
                  ({ icon: Icon, label, value, href, ocid }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/8 text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm leading-relaxed text-foreground transition-colors hover:text-accent-foreground"
                            data-ocid={ocid}
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm leading-relaxed text-foreground">
                            {value}
                          </span>
                        )}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </Card>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card className="h-full border-border/70 bg-card p-7 shadow-card">
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
                data-ocid="contact.form"
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    data-ocid="contact.name_input"
                    {...register("name", {
                      required: "Please enter your name.",
                    })}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-sm text-destructive"
                      data-ocid="contact.name.field_error"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 ..."
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      data-ocid="contact.phone_input"
                      {...register("phone", {
                        required: "Please enter your phone number.",
                        pattern: {
                          value: /^[+\d][\d\s-]{6,}$/,
                          message: "Please enter a valid phone number.",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="text-sm text-destructive"
                        data-ocid="contact.phone.field_error"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      data-ocid="contact.email_input"
                      {...register("email", {
                        required: "Please enter your email.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-sm text-destructive"
                        data-ocid="contact.email.field_error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="service"
                    className="text-sm font-medium text-foreground"
                  >
                    Service interested in{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("service", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id="service"
                      className="w-full"
                      aria-required="true"
                      aria-invalid={!!errors.service}
                      data-ocid="contact.service_select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("service", {
                      required: "Please choose a service.",
                    })}
                  />
                  {errors.service && (
                    <p
                      className="text-sm text-destructive"
                      data-ocid="contact.service.field_error"
                    >
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us a little about what you need..."
                    data-ocid="contact.message_textarea"
                    {...register("message")}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                    data-ocid="contact.submit_button"
                  >
                    <Send className="size-4" aria-hidden="true" />
                    {isSubmitting ? "Sending..." : "Send enquiry"}
                  </Button>
                  {submitted && (
                    <p
                      className="text-sm font-medium text-primary"
                      data-ocid="contact.success_state"
                    >
                      Thank you! Your enquiry has been received — we’ll respond
                      within one business day.
                    </p>
                  )}
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
