"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Check, ChevronDown, Users, Sparkles, Heart, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { stories } from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const impactCards = [
  {
    icon: Users,
    value: "100+",
    label: "Volunteers Engaged",
    desc: "Students, working professionals, and changemakers who give their time every week across Bhopal.",
  },
  {
    icon: Sparkles,
    value: "20+",
    label: "Community Initiatives",
    desc: "Cleanliness drives, hygiene workshops, and community programs run consistently since 2020.",
  },
  {
    icon: Heart,
    value: "1,000+",
    label: "Lives Impacted",
    desc: "Children, women, families, and community members reached through education, health, and care programs.",
  },
  {
    icon: MapPin,
    value: "5",
    label: "Years of Service",
    desc: "Consistent presence in Bhopal since 2020. Still volunteer-powered. Still growing every week.",
  },
];

const volunteerStories = [
  {
    ...stories[0],
    quote: "The children run to class every Sunday. That joy is the real impact.",
  },
  {
    ...stories[1],
    quote: "I learned to ask questions and care for my health without shame.",
  },
  {
    ...stories[2],
    quote: "A pair of shoes, a clean shirt, a smile \u2014 that is change you can see.",
  },
];

const faqData = [
  {
    q: "Who can volunteer?",
    a: "Anyone who wants to contribute time, energy, or skill. We welcome students, working professionals, and anyone who believes small actions create real change.",
  },
  {
    q: "Do I need experience?",
    a: "No. We provide guidance, introduce you to ongoing work, and match you with a program where you feel comfortable contributing.",
  },
  {
    q: "Can students volunteer?",
    a: "Yes. Many of our volunteers are college students who teach, document stories, design content, or assist during field drives.",
  },
  {
    q: "How much time is required?",
    a: "It depends on the program. Some require a few hours on weekends. Others are flexible. You decide how much time you can give.",
  },
  {
    q: "Will someone contact me?",
    a: "Yes. After you fill out the application form, a team member will reach out to understand your interests and availability.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
      <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
      {children}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-black/8 bg-white transition hover:shadow-[0_4px_20px_rgba(30,48,39,0.06)]">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6">
        <span className="text-sm font-bold leading-snug text-[var(--ink)] sm:text-base">{question}</span>
        <ChevronDown size={18} className={`shrink-0 text-[#8a928a] transition duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
            <p className="border-t border-black/8 px-5 py-4 text-sm leading-7 text-[#5a665e] sm:px-6">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VolunteerContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    city: "",
    occupation: "",
    interestArea: "",
    availability: "",
    whyVolunteer: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => { const { [field]: _, ...rest } = prev; return rest; });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter at least 10 digits";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.interestArea) newErrors.interestArea = "Select an interest area";
    if (!formData.availability) newErrors.availability = "Select your availability";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      type: "volunteer",
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      age: formData.age,
      city: formData.city,
      occupation: formData.occupation,
      interestArea: formData.interestArea,
      availability: formData.availability,
      whyVolunteer: formData.whyVolunteer,
    };
    console.log("Volunteer payload:", payload);
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Volunteer proxy response:", data);
      if (data.success) {
        setSubmitted(true);
        setSubmitError(null);
      } else {
        setSubmitError(data.message || "Unable to submit application.");
      }
    } catch (err) {
      console.error("Volunteer submission error:", err);
      setSubmitError("Unable to submit application.");
    }
    setSubmitting(false);
    if (submitted && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setErrors({});
    setFormData({ fullName: "", phone: "", email: "", age: "", city: "", occupation: "", interestArea: "", availability: "", whyVolunteer: "" });
  };

  return (
    <>
      <div className="pt-16 lg:pt-20" />

      {/* ===== SECTION 1 — HERO ===== */}
      <section className="relative overflow-hidden bg-[var(--ink)] px-4 pb-20 pt-16 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="absolute inset-0 opacity-15">
          <Image src="/site-media/photos/76-c5dyzlspl58.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[var(--ink)]/90 to-[var(--ink)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
            {/* LEFT — headline + CTAs (renders second on mobile) */}
            <motion.div {...fadeUp} className="lg:order-1">
              <SectionLabel>Volunteer with WeCare</SectionLabel>
              <h1 className="mt-1 text-[clamp(2.8rem,6.5vw,5.8rem)] font-[720] leading-[0.92]">
                One person showing up can change someone&rsquo;s day.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
                Every classroom session, awareness drive, and community initiative begins because someone chooses to show up. That someone could be you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#volunteer-form" className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                  Volunteer With Us
                  <ArrowRight size={18} />
                </a>
                <a href="#volunteer-stories" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] backdrop-blur transition-colors hover:bg-white/25">
                  Read Volunteer Stories
                </a>
              </div>

              {/* Impact chips — below CTAs on desktop */}
              <div className="mt-10 flex flex-wrap gap-2">
                {impactCards.filter((_, i) => i !== 1).map((card) => (
                  <span key={card.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.55rem] font-black uppercase tracking-[0.1em] text-white/60 backdrop-blur">
                    <span className="text-[var(--sun)]">{card.value}</span>
                    {card.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — volunteer photo + spotlight card (renders first on mobile) */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="relative lg:order-2"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#2a4a35] media-shadow">
                <Image
                  src="/site-media/photos/In%20the%20classroom%20of%20Bachpanshala.jpg"
                  alt="Volunteers teaching children at Bachpanshala"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Floating spotlight card — bottom-left */}
              <div className="relative -mt-12 mx-4 sm:-mt-16 sm:mx-6 lg:absolute lg:bottom-5 lg:left-5 lg:mx-0 lg:-mt-0 lg:max-w-xs">
                <div className="rounded-2xl border border-white/15 bg-white/12 backdrop-blur-xl p-4 shadow-2xl sm:p-5">
                  <p className="text-[0.5rem] font-black uppercase tracking-[0.15em] text-[var(--sun)]">
                    Volunteer Spotlight
                  </p>
                  <blockquote className="mt-1.5 text-xs leading-5 text-white/80 sm:text-sm sm:leading-6">
                    &ldquo;Every Sunday, volunteers turn a simple classroom into a place where children feel seen, heard, and supported.&rdquo;
                  </blockquote>
                  <p className="mt-1.5 text-[0.55rem] font-bold tracking-[0.06em] text-white/50">
                    &mdash; WeCare Volunteer
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 — REAL VOLUNTEER STORIES ===== */}
      <section id="volunteer-stories" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Real Volunteer Stories</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">Stories from the ground.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              Every volunteer carries a story. Here are a few from people who decided to show up.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {volunteerStories.map((story, i) => (
              <motion.article
                key={story.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-black/8 bg-white quiet-shadow transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,48,39,0.14)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe6d6]">
                  <Image src={story.image} alt={story.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="inline-flex w-fit rounded-full bg-[#f1c84b]/24 px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">
                    {story.kicker}
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold leading-snug">{story.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#4f5d54]">{story.copy}</p>
                  <div className="mt-4 border-t border-black/8 pt-4">
                    <blockquote className="text-sm italic leading-6 text-[#5a665e]">&ldquo;{story.quote}&rdquo;</blockquote>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3 — VOLUNTEER APPLICATION FORM ===== */}
      <section id="volunteer-form" ref={formRef} className="scroll-mt-20 bg-[#f4f1e8] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
            {/* LEFT — context */}
            <motion.div {...fadeUp}>
              <SectionLabel>Apply to Volunteer</SectionLabel>
              <h2 className="text-[clamp(2rem,5vw,4.4rem)] font-[720] leading-[0.95]">Take the first step.</h2>
              <p className="mt-6 text-lg leading-8 text-[#5a665e]">
                Your time and willingness to help are enough. Fill out the form and we will reach out to match you with the right program.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-[1rem] bg-white/70 p-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-xs font-black text-white">✓</span>
                  <div>
                    <p className="text-sm font-extrabold">1,000+ lives impacted</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#5a665e]">Every volunteer adds to this number.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-white/70 p-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-xs font-black text-white">✓</span>
                  <div>
                    <p className="text-sm font-extrabold">100+ active volunteers</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#5a665e]">Students, working professionals, and changemakers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-[1rem] bg-white/70 p-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-xs font-black text-white">✓</span>
                  <div>
                    <p className="text-sm font-extrabold">4 programs to choose from</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#5a665e]">Education, women empowerment, animal welfare, cleanliness drives.</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] quiet-shadow">
                <Image src="/site-media/photos/01-c-ffn9xv27m.jpg" alt="WeCare volunteers teaching children at Bachpanshala" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover" />
              </div>
            </motion.div>

            {/* RIGHT — form */}
            <motion.div {...fadeUp}>
              {submitError ? (
                <div className="rounded-[2rem] border border-black/8 bg-white p-8 text-center quiet-shadow sm:p-12">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--rose)]">
                    <span className="text-2xl font-black text-white">!</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-[700] text-[var(--ink)]">Submission failed</h3>
                  <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5a665e]">{submitError}</p>
                  <button type="button" onClick={() => setSubmitError(null)} className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                    Try Again
                    <ArrowRight size={18} />
                  </button>
                </div>
              ) : !submitted ? (
                <div className="rounded-[2rem] border border-black/8 bg-white p-4 quiet-shadow sm:p-6">
                  <div className="flex items-center gap-3 border-b border-black/8 pb-5">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f1c84b]/24 text-[var(--leaf-deep)]">
                      <ShieldCheck size={23} />
                    </span>
                    <div>
                      <h3 className="text-2xl font-[700]">Volunteer Application</h3>
                      <p className="text-sm text-[#667066]">This takes two minutes.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Full Name <span className="text-[var(--rose)]">*</span></label>
                        <input type="text" placeholder="Your full name" value={formData.fullName} onChange={handleChange("fullName")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                        {errors.fullName && <p className="mt-1 text-xs text-[var(--rose)]">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Phone Number <span className="text-[var(--rose)]">*</span></label>
                        <input type="tel" placeholder="Your phone number" value={formData.phone} onChange={handleChange("phone")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                        {errors.phone && <p className="mt-1 text-xs text-[var(--rose)]">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Email Address <span className="text-[var(--rose)]">*</span></label>
                        <input type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange("email")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                        {errors.email && <p className="mt-1 text-xs text-[var(--rose)]">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Age <span className="text-[var(--rose)]">*</span></label>
                        <input type="number" placeholder="Your age" value={formData.age} onChange={handleChange("age")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                        {errors.age && <p className="mt-1 text-xs text-[var(--rose)]">{errors.age}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">City</label>
                        <input type="text" placeholder="Your city" value={formData.city} onChange={handleChange("city")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Occupation / Student</label>
                        <input type="text" placeholder="e.g. Student, Teacher, Engineer" value={formData.occupation} onChange={handleChange("occupation")} className="w-full rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Interest Area <span className="text-[var(--rose)]">*</span></label>
                        <select value={formData.interestArea} onChange={handleChange("interestArea")} className="w-full appearance-none rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30">
                          <option value="">Select an area</option>
                          <option value="Education">Education</option>
                          <option value="Women Empowerment">Women Empowerment</option>
                          <option value="Animal Welfare">Animal Welfare</option>
                          <option value="Cleanliness Drives">Cleanliness Drives</option>
                          <option value="Community Events">Community Events</option>
                          <option value="Any Area">Any Area</option>
                        </select>
                        {errors.interestArea && <p className="mt-1 text-xs text-[var(--rose)]">{errors.interestArea}</p>}
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Availability <span className="text-[var(--rose)]">*</span></label>
                        <select value={formData.availability} onChange={handleChange("availability")} className="w-full appearance-none rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30">
                          <option value="">Select availability</option>
                          <option value="Weekdays">Weekdays</option>
                          <option value="Weekends">Weekends</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                        {errors.availability && <p className="mt-1 text-xs text-[var(--rose)]">{errors.availability}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-black uppercase tracking-[0.12em] text-[#667066]">Why do you want to volunteer with WeCare?</label>
                      <textarea rows={3} placeholder="Tell us what motivates you..." value={formData.whyVolunteer} onChange={handleChange("whyVolunteer")} className="w-full resize-none rounded-2xl border border-black/8 bg-[#fbfaf4] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[#8a928a] outline-none focus:ring-2 focus:ring-[var(--leaf)]/30"></textarea>
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={submitting} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--leaf)] px-6 py-3 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)] disabled:opacity-60">
                        {submitting ? "Submitting..." : "Submit Application"}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[2rem] border border-black/8 bg-white p-8 text-center quiet-shadow sm:p-12"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--leaf)]">
                    <Check size={30} className="text-white" />
                  </div>
                  <h3 className="mt-5 text-2xl font-[700]">Thank you for volunteering &#x2764;&#xfe0f;</h3>
                  <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#5a665e]">
                    Your application has been received.
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-base leading-7 text-[#5a665e]">
                    Someone from WeCare will contact you soon.
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-sm italic leading-6 text-[#8a928a]">
                    Every classroom session, awareness drive, and community initiative begins because someone chooses to show up.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-[#5a665e]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1c84b]/18 px-3 py-1.5 text-xs font-black uppercase tracking-[0.06em] text-[var(--leaf-deep)]">
                      <Check size={12} /> Application received
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1c84b]/18 px-3 py-1.5 text-xs font-black uppercase tracking-[0.06em] text-[var(--leaf-deep)]">
                      <Check size={12} /> WeCare team will review
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1c84b]/18 px-3 py-1.5 text-xs font-black uppercase tracking-[0.06em] text-[var(--leaf-deep)]">
                      <Check size={12} /> Contact soon
                    </span>
                  </div>
                  <button type="button" onClick={handleReset} className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#f4f1e8] px-5 py-2.5 text-sm font-black text-[var(--ink)] uppercase tracking-[0.02em] transition-colors hover:bg-[#ece6d8]">
                    Submit Another Response
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4 — FAQ ===== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div {...fadeUp} className="text-center">
            <SectionLabel>FAQs</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">Common questions.</h2>
          </motion.div>
          <motion.div {...fadeUp} className="mt-8 space-y-3">
            {faqData.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 5 — FINAL CTA ===== */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div className="absolute inset-0 opacity-20">
              <Image src="/site-media/photos/01-c-ffn9xv27m.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <Users size={32} className="mx-auto text-[var(--sun)]" />
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">The next story could start with you.</h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/65">
                Fill out the form and become part of something that grows every week. We will reach out to help you get started.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#volunteer-form" className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-6 py-3 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                  Become a Volunteer
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function VolunteerPage() {
  return <VolunteerContent />;
}
