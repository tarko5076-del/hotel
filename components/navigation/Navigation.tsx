"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

const links = ["rooms", "experience", "dining", "gallery", "location"] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHash(window.location.hash);
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusable = () => Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusable()[0]?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = focusable();
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-black/10 bg-ivory/95 text-ink shadow-[0_4px_22px_rgba(30,30,26,0.03)] backdrop-blur-md" : "text-white"}`}>
      <nav className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-[94px] lg:px-12" aria-label="Primary navigation">
        <Link href="/" className="focus-ring relative z-[60] font-sans text-[14px] font-semibold tracking-[0.24em]" aria-label="Ardent Hotel home">
          ARDENT HOTEL
        </Link>

        <div className="hidden items-center gap-9 lg:flex" aria-label="Hotel sections">
          {links.map((link) => <Link className="focus-ring text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-60" href={`#${link}`} key={link}>{t(link)}</Link>)}
        </div>

        <Link href={`${pathname}${hash}`} locale={locale === "en" ? "am" : "en"} className="focus-ring hidden min-h-11 items-center px-2 text-[10px] font-bold tracking-[0.16em] lg:inline-flex" aria-label={locale === "en" ? "Switch language to Amharic" : "Switch language to English"}>{locale === "en" ? "አማ" : "EN"}</Link>

        <Link href="#booking" className="focus-ring hidden border border-current px-5 py-3 text-[10px] font-bold tracking-[0.15em] transition-colors hover:bg-current hover:text-ivory lg:block">
          BOOK NOW
        </Link>

        <button ref={menuButtonRef} type="button" className="focus-ring relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center lg:hidden" onClick={() => setOpen((current) => !current)} aria-label={open ? t("close") : t("open")} aria-expanded={open}>
          {open ? <X size={21} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("mobile")}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            ref={menuRef}
            className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-ivory px-6 pb-8 pt-28 text-ink"
          >
            <div className="flex flex-1 flex-col justify-center gap-6">
              {links.map((link, index) => (
                <motion.div key={link} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.05, duration: 0.45 }}>
                  <Link href={`#${link}`} onClick={() => setOpen(false)} className="focus-ring font-display text-5xl leading-none">{t(link)}</Link>
                </motion.div>
              ))}
            </div>
            <Link href={`${pathname}${hash}`} locale={locale === "en" ? "am" : "en"} onClick={() => setOpen(false)} className="focus-ring flex min-h-11 items-center justify-center border border-ink px-5 text-center text-[11px] font-bold tracking-[0.17em]">{locale === "en" ? "አማርኛ" : "ENGLISH"}</Link>
            <Link href="#booking" onClick={() => setOpen(false)} className="focus-ring border border-ink px-5 py-4 text-center text-[11px] font-bold tracking-[0.17em]">{t("book")}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
