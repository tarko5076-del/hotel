"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import {useTranslations} from "next-intl";
import { testimonials } from "@/lib/testimonials";

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("testimonials");
  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 22 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay, ease } });
  const previous = () => setActive((index) => (index - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((index) => (index + 1) % testimonials.length);

  return (
    <section ref={ref} className="bg-[#dedbd2] py-24 sm:py-32 lg:py-44" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <motion.p {...enter()} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-moss"><span className="h-px w-8 bg-gold" /> {t("eyebrow")}</motion.p>
        <motion.h2 id="testimonials-title" {...enter(0.12)} className="mt-7 font-display text-[clamp(3.5rem,7vw,7.2rem)] font-medium leading-[0.78] tracking-[-0.05em]">{t("title").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</motion.h2>
        <motion.div {...enter(0.24)} className="mt-16 grid border-t border-ink/15 pt-10 sm:mt-24 sm:pt-14 lg:grid-cols-12 lg:gap-x-10">
          <p className="text-[9px] font-bold tracking-[0.18em] text-moss lg:col-span-3">{t("note").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</p>
          <div className="mt-10 lg:col-span-7 lg:col-start-5 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }} aria-live="polite">
                <blockquote className="font-display text-[clamp(2.35rem,4.4vw,4.7rem)] font-medium leading-[0.94] tracking-[-0.04em] text-ink">“{t(`items.${active}.quote`)}”</blockquote>
                <footer className="mt-8 text-[10px] font-bold tracking-[0.18em] text-ink/65">{t(`items.${active}.guest`).toUpperCase()} <span className="mx-2 text-gold">/</span> {t(`items.${active}.location`).toUpperCase()}</footer>
              </motion.div>
            </AnimatePresence>
            <div className="mt-12 flex items-center gap-5">
              <span className="text-[10px] font-bold tracking-[0.18em] text-ink/65">{String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
              <div className="flex border border-ink/25"><button type="button" onClick={previous} className="focus-ring flex h-11 w-11 items-center justify-center border-r border-ink/25 transition-colors hover:bg-ink hover:text-ivory" aria-label={t("previous")}><ArrowLeft size={15} strokeWidth={1.4} /></button><button type="button" onClick={next} className="focus-ring flex h-11 w-11 items-center justify-center transition-colors hover:bg-ink hover:text-ivory" aria-label={t("next")}><ArrowRight size={15} strokeWidth={1.4} /></button></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
