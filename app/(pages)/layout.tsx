"use client";

import Image from "next/image";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { brand } from "@/content/brand";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/stories", label: "Stories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support Us" },
];

function ButtonLink({
  href,
  children,
  variant = "primary",
  className: extraClass = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--leaf)] text-white hover:bg-[var(--leaf-deep)]"
      : variant === "secondary"
        ? "bg-white/88 text-[var(--ink)] ring-1 ring-black/10 hover:bg-white"
        : "bg-transparent text-[var(--ink)] hover:bg-black/5";

  return (
    <a
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${className} ${extraClass}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          {navLinks.map((link) => (
            <a key={link.href} className="rounded-full px-3 py-2 hover:bg-black/5" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink href={brand.donationUrl} className="hidden sm:inline-flex">
            Donate
            <ArrowRight size={17} />
          </ButtonLink>
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-[#526052] hover:bg-black/5 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen ? (
        <div className="mx-auto mt-2 max-w-7xl rounded-[1.4rem] border border-white/60 bg-white/92 p-3 shadow-[0_18px_60px_rgba(23,35,27,0.12)] backdrop-blur-xl md:hidden">
          <div className="grid gap-1 text-sm font-bold text-[#526052]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-2xl px-4 py-3 hover:bg-black/5"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-2 border-t border-black/8 pt-2">
            <ButtonLink href={brand.donationUrl} className="w-full">
              Donate
              <ArrowRight size={17} />
            </ButtonLink>
          </div>
        </div>
      ) : null}
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
