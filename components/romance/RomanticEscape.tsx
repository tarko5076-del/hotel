"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {useTranslations} from "next-intl";
import { RevealImage } from "@/components/ui/RevealImage";

const image = "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1280&q=84";
const ease = [0.22, 1, 0.36, 1] as const;

export function RomanticEscape() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("romance");
  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 22 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.95, delay, ease } });

  return (
    <section ref={ref} className="overflow-hidden bg-[#dedbd2] py-24 sm:py-32 lg:py-44" aria-labelledby="romance-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:pt-16">
            <motion.p {...enter()} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-moss"><span className="h-px w-8 bg-gold" /> {t("eyebrow")}</motion.p>
            <motion.h2 id="romance-title" {...enter(0.12)} className="mt-7 font-display text-[clamp(3.5rem,6.3vw,6.7rem)] font-medium leading-[0.8] tracking-[-0.05em]">{t("title").split("\n").map((line) => <span className="block" key={line}>{line}</span>)}</motion.h2>
            <motion.p {...enter(0.25)} className="mt-8 max-w-sm text-[15px] leading-7 text-ink/72 sm:text-base sm:leading-8">{t("description")}</motion.p>
            <motion.div {...enter(0.37)} className="mt-8"><Link href="#gallery" className="focus-ring group inline-flex items-center gap-3 border-b border-ink/45 pb-2 text-[10px] font-bold tracking-[0.18em] hover:border-ink">{t("cta")} <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></motion.div>
          </div>
          <RevealImage src={image} alt={t("alt")} sizes="(max-width: 1023px) 90vw, 58vw" objectPosition="center" parallax overlayClassName="bg-black/10" className="aspect-[4/5] bg-[#a99c8b] sm:aspect-[16/11] lg:col-span-7 lg:aspect-[.95/1]" />
        </div>
      </div>
    </section>
  );
}
