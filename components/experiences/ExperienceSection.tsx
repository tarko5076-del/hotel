"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {useTranslations} from "next-intl";
import { experiences } from "@/lib/experiences";
import { RevealImage } from "@/components/ui/RevealImage";

const ease = [0.22, 1, 0.36, 1] as const;

export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("experience");
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="experience" className="overflow-hidden bg-[#24251f] py-24 text-ivory sm:py-32 lg:py-44" aria-labelledby="experience-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <div ref={headingRef} className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p {...enter()} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-[#d5c294]"><span className="h-px w-8 bg-gold" /> {t("eyebrow")}</motion.p>
            <motion.h2 id="experience-title" {...enter(0.12)} className="mt-7 font-display text-[clamp(3.5rem,7.5vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.05em]">{t("title").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</motion.h2>
          </div>
          <motion.p {...enter(0.24)} className="max-w-md text-[15px] leading-7 text-white/68 sm:text-base sm:leading-8 lg:col-span-4 lg:pb-1">{t("description")}</motion.p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-x-10">
          <motion.div initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }} animate={inView ? { clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 1.2, delay: 0.18, ease }} className="relative hidden aspect-[4/5] overflow-hidden bg-[#3a3b34] md:block lg:col-span-7 lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div key={experiences[active].image} initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0 }} transition={{ duration: 0.65, ease }} className="absolute inset-0">
                <Image src={experiences[active].image} alt={t(`items.${active}.alt`)} fill quality={82} sizes="(max-width: 1023px) 90vw, 58vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-6 left-6 text-[10px] font-bold tracking-[0.2em] text-white/90">{experiences[active].number} / 04</p>
          </motion.div>

          <div className="lg:col-span-5">
            {experiences.map((experience, index) => (
              <article key={experience.number} className={`border-t border-white/20 ${index === experiences.length - 1 ? "border-b" : ""}`}>
                <button type="button" onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index} className={`focus-ring group w-full py-7 text-left sm:py-8 ${active === index ? "text-ivory" : "text-white/50"}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[10px] font-bold tracking-[0.18em]">{experience.number} — {t(`items.${index}.category`)}</p>
                    <ArrowUpRight size={16} strokeWidth={1.4} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-3 font-display text-[clamp(2.35rem,3.5vw,3.75rem)] font-medium leading-[0.9] tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-1">{t(`items.${index}.title`)}</h3>
                  <p className={`grid overflow-hidden text-[14px] leading-7 transition-[grid-template-rows,margin] duration-500 ${active === index ? "mt-4 grid-rows-[1fr] text-white/65" : "mt-0 grid-rows-[0fr]"}`}><span className="overflow-hidden">{t(`items.${index}.description`)}</span></p>
                </button>
                <Link href="#dining" className={`focus-ring group/link mb-7 inline-flex items-center gap-3 border-b pb-2 text-[10px] font-bold tracking-[0.18em] transition-all sm:mb-8 ${active === index ? "border-white/45 text-white opacity-100" : "pointer-events-none h-0 overflow-hidden border-transparent opacity-0"}`} tabIndex={active === index ? 0 : -1}>
                  {t("explore")} <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-14 md:hidden">
          {experiences.map((experience) => (
            <article key={experience.number}>
              <RevealImage src={experience.image} alt={t(`items.${experiences.indexOf(experience)}.alt`)} sizes="90vw" className="aspect-[4/5]" overlayClassName="bg-black/15" delay={experiences.indexOf(experience) * 0.08} />
              <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-[#d5c294]">{experience.number} — {t(`items.${experiences.indexOf(experience)}.category`)}</p>
              <h3 className="mt-3 font-display text-[2.8rem] font-medium leading-[0.88] tracking-[-0.035em]">{t(`items.${experiences.indexOf(experience)}.title`)}</h3>
              <p className="mt-4 max-w-md text-[14px] leading-7 text-white/68">{t(`items.${experiences.indexOf(experience)}.description`)}</p>
              <Link href="#dining" className="focus-ring group mt-6 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[10px] font-bold tracking-[0.18em] hover:border-white">{t("explore")} <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
