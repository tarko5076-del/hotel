"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef } from "react";
import {useTranslations} from "next-intl";
import { diningExperiences } from "@/lib/dining";
import { RevealImage } from "@/components/ui/RevealImage";

const featureImage = "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=84";
const ease = [0.22, 1, 0.36, 1] as const;

export function DiningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.13 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("dining");
  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 22 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay, ease } });

  return (
    <section id="dining" ref={sectionRef} className="overflow-hidden bg-ivory py-24 sm:py-32 lg:py-44" aria-labelledby="dining-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <motion.div initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }} animate={inView ? { clipPath: "inset(0 0 0% 0)" } : {}} transition={{ duration: 1.2, ease }} className="relative min-h-[600px] overflow-hidden sm:min-h-[690px] lg:min-h-[760px]">
          <Image src={featureImage} alt={t("featureAlt")} fill quality={84} sizes="(max-width: 1023px) 90vw, 92vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,15,0.71),rgba(18,18,15,0.27)_72%,rgba(18,18,15,0.1))]" />
          <div className="relative flex min-h-[600px] max-w-2xl flex-col justify-end px-6 py-10 text-ivory sm:min-h-[690px] sm:px-10 sm:py-14 lg:min-h-[760px] lg:px-14 lg:py-16">
            <motion.p {...enter(0.12)} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-[#dfcea1]"><span className="h-px w-8 bg-gold" /> {t("eyebrow")}</motion.p>
            <motion.h2 id="dining-title" {...enter(0.22)} className="mt-7 font-display text-[clamp(3.5rem,7vw,7.2rem)] font-medium leading-[0.8] tracking-[-0.05em]">{t("title").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</motion.h2>
            <motion.p {...enter(0.34)} className="mt-7 max-w-sm text-[15px] leading-7 text-white/80 sm:text-base sm:leading-8">{t("description")}</motion.p>
          </div>
        </motion.div>

        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-3 lg:gap-10 lg:py-28">
          {diningExperiences.map((item, index) => (
            <Fragment key={item.image}>
            <motion.article {...enter(0.12 + index * 0.08)} className="group border-t border-ink/15 pt-5">
              <RevealImage src={item.image} alt={t(`items.${index}.alt`)} sizes="(max-width: 1023px) 90vw, 31vw" className="aspect-[16/10]" animation="scale" delay={index * 0.08} />
              <h3 className="mt-6 font-display text-[clamp(2.4rem,3.2vw,3.5rem)] font-medium leading-[0.88] tracking-[-0.035em]">{t(`items.${index}.title`)}</h3>
              <p className="mt-4 max-w-sm text-[14px] leading-7 text-ink/70 sm:text-[15px]">{t(`items.${index}.description`)}</p>
              <Link href="#booking" className="focus-ring group/link mt-6 inline-flex items-center gap-3 border-b border-ink/40 pb-2 text-[10px] font-bold tracking-[0.18em] hover:border-ink">{t("explore")} <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" /></Link>
            </motion.article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
