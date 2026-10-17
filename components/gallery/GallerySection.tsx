"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState, type RefObject } from "react";
import {useTranslations} from "next-intl";
import { galleryImages } from "@/lib/gallery";
import { RevealImage } from "@/components/ui/RevealImage";

const ease = [0.22, 1, 0.36, 1] as const;

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("gallery");
  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 22 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay, ease } });

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? null : (current + 1) % galleryImages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [activeIndex]);

  const close = () => setActiveIndex(null);
  const showPrevious = () => setActiveIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => setActiveIndex((current) => current === null ? null : (current + 1) % galleryImages.length);

  return (
    <section id="gallery" ref={sectionRef} className="bg-[#e7e3da] py-24 sm:py-32 lg:py-44" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p {...enter()} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-moss"><span className="h-px w-8 bg-gold" /> {t("eyebrow")}</motion.p>
            <motion.h2 id="gallery-title" {...enter(0.12)} className="mt-7 font-display text-[clamp(3.5rem,7vw,7.2rem)] font-medium leading-[0.78] tracking-[-0.05em]">{t("title")}</motion.h2>
          </div>
          <motion.p {...enter(0.24)} className="max-w-sm text-[15px] leading-7 text-ink/70 sm:text-base sm:leading-8 lg:col-span-4 lg:pb-1">{t("description")}</motion.p>
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:auto-rows-[110px] md:gap-5">
          {galleryImages.map((image, index) => (
            <Fragment key={image.src}>
            <button type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setActiveIndex(index); }} className={`${image.className} focus-ring group relative min-h-[clamp(240px,75vw,340px)] overflow-hidden bg-[#bcb5aa] text-left md:min-h-0`} aria-label={t("open", {title: t(`items.${index}.title`), category: t(`items.${index}.category`)})}>
              <RevealImage src={image.src} alt={t(`items.${index}.alt`)} sizes="(max-width: 767px) 90vw, (max-width: 1023px) 50vw, 58vw" className="absolute inset-0" animation="scale" delay={index * 0.08} />
              <div className="absolute inset-0 bg-black/[0.04] transition-colors duration-500 group-hover:bg-black/[0.3]" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-end justify-between gap-4 p-5 text-white opacity-100 transition-all duration-500 md:translate-y-3 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 sm:p-6"><div className="min-w-0"><p className="text-[9px] font-bold tracking-[0.2em]">{t(`items.${index}.category`)}</p><p className="mt-2 break-words font-display text-2xl leading-none">{t(`items.${index}.title`)}</p></div><span className="shrink-0 text-[10px] font-bold tracking-[0.16em]">{t("view")}</span></div>
            </button>
            </Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && <Lightbox index={activeIndex} onClose={close} onPrevious={showPrevious} onNext={showNext} closeRef={closeRef} reduceMotion={reduceMotion} t={t} />}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ index, onClose, onPrevious, onNext, closeRef, reduceMotion, t }: { index: number; onClose: () => void; onPrevious: () => void; onNext: () => void; closeRef: RefObject<HTMLButtonElement | null>; reduceMotion: boolean | null; t: ReturnType<typeof useTranslations> }) {
  const image = galleryImages[index];
  // Gallery tiles use a smaller source; the higher-resolution source is only
  // requested after a visitor opens the image at full size.
  const lightboxSrc = image.src.replace("w=1200", "w=1800");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", trapFocus);
    return () => window.removeEventListener("keydown", trapFocus);
  }, []);

  return (
    <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t("dialog", {title: t(`items.${index}.title`)})} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#171812]/95 p-5 sm:p-10" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0, scale: 0.98 }} transition={{ duration: 0.35, ease }} className="relative flex h-full w-full max-w-[1400px] items-center justify-center">
        <Image src={lightboxSrc} alt={t(`items.${index}.alt`)} width={1800} height={1200} quality={88} sizes="90vw" className="max-h-full w-auto max-w-full object-contain" priority />
        <button ref={closeRef} type="button" onClick={onClose} className="focus-ring absolute right-0 top-0 flex h-11 w-11 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white hover:text-ink" aria-label={t("close")}><X size={19} strokeWidth={1.5} /></button>
        <button type="button" onClick={onPrevious} className="focus-ring absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white hover:text-ink" aria-label={t("previous")}><ChevronLeft size={20} strokeWidth={1.5} /></button>
        <button type="button" onClick={onNext} className="focus-ring absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white hover:text-ink" aria-label={t("next")}><ChevronRight size={20} strokeWidth={1.5} /></button>
        <p className="absolute bottom-0 left-0 text-[10px] font-bold tracking-[0.18em] text-white/80">{String(index + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")} — {t(`items.${index}.category`)}</p>
      </motion.div>
    </motion.div>
  );
}
