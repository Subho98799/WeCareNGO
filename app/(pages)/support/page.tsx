"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Instagram,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { brand } from "@/content/brand";
import { donationOptions, faqs } from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--leaf)] text-white hover:bg-[var(--leaf-deep)]"
      : variant === "secondary"
        ? "bg-white/88 text-[var(--ink)] ring-1 ring-black/10 hover:bg-white"
        : "bg-transparent text-[var(--ink)] hover:bg-black/5";

  return (
    <a
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${className}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
      <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
      {children}
    </div>
  );
}

function DonationSection({ onSelectAmount }: { onSelectAmount: (amount: string) => void }) {
  const handleCardClick = (amount: string) => {
    onSelectAmount(amount);
    const el = document.getElementById("support-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="donate" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>Donate</SectionLabel>
          <h2 className="text-[clamp(2.4rem,6vw,5.2rem)] font-[720] leading-[0.95]">
            Make the next class, drive, or care visit possible.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a665e]">
            Your donation supports practical work in Bhopal: education for children, dignity for women, cleaner public spaces, and care for animals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => document.getElementById("support-form")?.scrollIntoView({ behavior: "smooth" })} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--leaf)] px-5 text-sm font-bold text-white transition hover:bg-[var(--leaf-deep)]">
              Donate Now
              <ArrowRight size={18} />
            </button>
            <ButtonLink href={brand.instagramUrl} variant="secondary">
              <Instagram size={18} />
              Instagram proof
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="rounded-[2rem] border border-black/8 bg-white p-4 quiet-shadow sm:p-6">
          <div className="flex items-center gap-3 border-b border-black/8 pb-5">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f1c84b]/24 text-[var(--leaf-deep)]">
              <ShieldCheck size={23} />
            </span>
            <div>
              <h3 className="text-2xl font-[700]">Suggested giving</h3>
              <p className="text-sm text-[#667066]">Placeholder amounts. Please confirm before going live.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {donationOptions.map((option) => (
              <button
                key={option.amount}
                type="button"
                onClick={() => handleCardClick(option.amount)}
                className="focus-ring flex w-full items-center justify-between rounded-2xl border border-black/8 bg-[#fffaf0] p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-[var(--leaf)]/30 hover:bg-[#fff4d4] hover:shadow-[0_18px_40px_rgba(30,48,39,0.1)]"
              >
                <div>
                  <div className="text-2xl font-black text-[var(--leaf)]">{option.amount}</div>
                  <div className="mt-1 text-sm font-bold text-[#59645c]">{option.label}</div>
                </div>
                <ArrowRight size={20} />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SupportSection({ presetAmount }: { presetAmount: string }) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", amount: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showQR, setShowQR] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxteEs-Rm-Ofl54eftJxRXDoaWe7mdvTnZ8b0yPfn7kOwx0Ek826d5AHxx5vchh4UYS/exec";

  useEffect(() => {
    if (presetAmount) {
      setFormData((prev) => ({ ...prev, amount: presetAmount }));
    }
  }, [presetAmount]);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm: () => boolean = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone must be at least 10 digits";
    }
    if (!formData.amount.trim()) newErrors.amount = "Amount is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getNumericAmount = (amountStr: string): string => {
    return amountStr.replace(/[^0-9.]/g, "");
  };

  const upiUrl = `upi://pay?pa=wecaresocialwelfares.62388291@hdfcbank&pn=WeCare&am=${getNumericAmount(formData.amount)}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  const handleGenerateQR = () => {
    if (!validateForm()) return;
    setShowQR(true);
  };

  const handlePaymentComplete = async () => {
    setShowQR(false);
    setShowSuccess(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          amount: formData.amount,
          message: formData.message,
        }),
      });
    } catch {
      // no-cors ignores response; failure is silent
    }
  };

  const handleReset = () => {
    setShowQR(false);
    setShowSuccess(false);
    setErrors({});
    setFormData({ name: "", phone: "", email: "", amount: "", message: "" });
  };

  return (
    <section id="support-form" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <motion.div {...fadeUp} className="max-w-3xl">
            <SectionLabel>Support Us</SectionLabel>
            <h2 className="text-[clamp(2rem,5vw,4.4rem)] font-[720] leading-[0.95]">
              Support meaningful change.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a665e]">
              Have questions before donating? Talk to our team, learn where contributions go, and explore ways to support WeCare's work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="https://wa.me/918305596309">
                Talk To Us
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="tel:+918305596309" variant="secondary">
                Call Us
              </ButtonLink>
            </div>
          </motion.div>

          {!showSuccess ? (
            <motion.div {...fadeUp} className="rounded-[2rem] border border-black/8 bg-white p-4 quiet-shadow sm:p-6">
              <div className="flex items-center gap-3 border-b border-black/8 pb-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f1c84b]/24 text-[var(--leaf-deep)]">
                  <ShieldCheck size={23} />
                </span>
                <div>
                  <h3 className="text-2xl font-[700]">Donate via UPI</h3>
                  <p className="text-sm text-[#667066]">Fill in your details to generate a donation QR.</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Full Name <span className="text-[var(--rose)]">*</span></label>
                    <input type="text" placeholder="Your full name" value={formData.name} onChange={handleChange("name")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                    {errors.name && <p className="mt-1 text-xs text-[var(--rose)]">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Phone Number <span className="text-[var(--rose)]">*</span></label>
                    <input type="tel" placeholder="Your phone number" value={formData.phone} onChange={handleChange("phone")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                    {errors.phone && <p className="mt-1 text-xs text-[var(--rose)]">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Email Address</label>
                    <input type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange("email")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Donation Amount</label>
                  <input type="text" placeholder="e.g. Rs 1,000" value={formData.amount} onChange={handleChange("amount")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                  {errors.amount && <p className="mt-1 text-xs text-[var(--rose)]">{errors.amount}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Message</label>
                  <textarea rows={3} placeholder="Any message for the team" value={formData.message} onChange={handleChange("message")} className="w-full resize-none rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30"></textarea>
                </div>
              </div>

              {!showQR ? (
                <div className="mt-6">
                  <button type="button" onClick={handleGenerateQR} className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                    Generate Donation QR
                    <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/8 bg-[#fbfaf4] p-4">
                    <img src={qrUrl} alt={`UPI QR for Rs ${getNumericAmount(formData.amount)}`} className="h-48 w-48 rounded-xl" />
                    <div className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-center">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#667066]">UPI ID</p>
                      <p className="mt-1 break-all font-extrabold text-[var(--ink)]">wecaresocialwelfares.62388291@hdfcbank</p>
                    </div>
                    <p className="text-xs leading-5 text-[#667066]">Scan with any UPI app to pay Rs {getNumericAmount(formData.amount)}</p>
                  </div>
                  <button type="button" onClick={handlePaymentComplete} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                    I Have Completed Payment
                    <ArrowRight size={18} />
                  </button>
                  <button type="button" onClick={() => setShowQR(false)} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/88 px-5 py-2.5 text-sm font-black text-[var(--ink)] uppercase tracking-[0.02em] ring-1 ring-black/10 transition-colors hover:bg-white">
                    Back to Form
                  </button>
                </div>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-[#667066]">
                Your information will be used only for donation acknowledgment purposes.
              </p>
            </motion.div>
          ) : (
            <motion.div {...fadeUp} className="rounded-[2rem] border border-black/8 bg-white p-4 quiet-shadow sm:p-6">
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#d4edda] text-[#155724]">
                  <ShieldCheck size={32} />
                </span>
                <div>
                  <h3 className="text-2xl font-[700]">Thank You!</h3>
                  <p className="mt-2 text-sm text-[#667066]">
                    Your donation details have been submitted. We will acknowledge your contribution shortly.
                  </p>
                </div>
                <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                  Donate Again
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeUp} className="rounded-[2rem] bg-[var(--leaf)] p-6 text-white sm:p-10 lg:sticky lg:top-28">
          <SectionLabel>Why it feels different</SectionLabel>
          <h2 className="text-[clamp(2.2rem,5vw,4.6rem)] font-[720] leading-[0.98]">Youth led care with real public proof.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            WeCare's Instagram shows the actual people, classrooms, drives, and volunteers behind the work. This new site brings that proof forward and keeps the donation path simple.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/12 p-4">
              <div className="text-3xl font-black">{brand.socialProof.instagramFollowers}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">Instagram followers</div>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <div className="text-3xl font-black">{brand.socialProof.instagramPosts}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">Posts shared</div>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <div className="text-3xl font-black">{brand.socialProof.yearsActive}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">Years active</div>
            </div>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="rounded-[2rem] border border-black/8 bg-white p-6 quiet-shadow sm:p-8">
          <h3 className="text-3xl font-[700]">Common questions</h3>
          <div className="mt-6 grid gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question} className="rounded-2xl border border-black/8 bg-[#fbfaf4]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="focus-ring flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl p-4 text-left font-black"
                    aria-expanded={isOpen}
                  >
                  {faq.question}
                    <Sparkles
                      className={`shrink-0 text-[var(--sun)] transition ${isOpen ? "rotate-45" : ""}`}
                      size={18}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 leading-7 text-[#5c665e]">{faq.answer}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function SupportPage() {
  const [presetAmount, setPresetAmount] = useState("");
  return (
    <>
      <DonationSection onSelectAmount={setPresetAmount} />
      <SupportSection presetAmount={presetAmount} />
      <TrustSection />
    </>
  );
}
