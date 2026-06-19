"use client";

import Image from "next/image";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
} from "lucide-react";
import { brand } from "@/content/brand";

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

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/78 px-3 py-2 shadow-[0_18px_60px_rgba(23,35,27,0.12)] backdrop-blur-xl">
        <a className="focus-ring flex items-center gap-3 rounded-full pr-2" href="/">
          <span className="relative h-14 w-14 overflow-hidden">
            <Image
              src="/site-media/photos/Logo.PNG"
              alt="WeCare NGO logo"
              fill
              className="object-contain"
            />
          </span>
          <span className="hidden text-sm font-black sm:block">{brand.name}</span>
        </a>
        <div className="hidden items-center gap-1 text-sm font-bold text-[#526052] md:flex">
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="/work">
            Work
          </a>
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="/stories">
            Stories
          </a>
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="/volunteer">
            Volunteer
          </a>
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="/about">
            About
          </a>
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="/support">
            Support Us
          </a>
        </div>
        <ButtonLink href={brand.donationUrl}>
          Donate
          <ArrowRight size={17} />
        </ButtonLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="text-4xl font-black">{brand.name}</div>
          <p className="mt-3 max-w-md text-white/68">
            Education, women empowerment, animal welfare, and community care in {brand.city}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={brand.donationUrl}>
            Donate
            <HeartHandshake size={18} />
          </ButtonLink>
          <ButtonLink href={`mailto:${brand.contactEmail}`}>
            <Mail size={18} />
            Email
          </ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl justify-center border-t border-white/12 pt-5 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-white/64">
        <a className="focus-ring rounded-full transition hover:text-white" href="https://www.vfinite.com/" target="_blank" rel="noreferrer">
          Designed and maintained by VFinite
        </a>
      </div>
    </footer>
  );
}

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
