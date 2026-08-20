"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {useTranslations} from "next-intl";
import { RevealImage } from "@/components/ui/RevealImage";

const image = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=84";
const ease = [0.22, 1, 0.36, 1] as const;

export function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("intro");
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="welcome" ref={sectionRef} className="overflow-hidden bg-ivory py-24 sm:py-32 lg:py-44" aria-labelledby="introduction-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <motion.p {...enter()} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-moss">
              <span className="h-px w-8 bg-gold" /> {t("eyebrow")}
            </motion.p>
            <motion.h2 id="introduction-title" {...enter(0.12)} className="mt-7 max-w-2xl font-display text-[clamp(3.45rem,7vw,7rem)] font-medium leading-[0.83] tracking-[-0.045em] text-ink">
              {t("title").split("\n").map((line) => <span className="block" key={line}>{line}</span>)}
            </motion.h2>
          </div>
          <div className="max-w-md lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-2">
            <motion.p {...enter(0.25)} className="text-[15px] leading-7 text-ink/75 sm:text-base sm:leading-8">
              {t("description")}
            </motion.p>
            <motion.div {...enter(0.38)} className="mt-7">
              <Link href="#rooms" className="focus-ring group inline-flex items-center gap-3 border-b border-ink/45 pb-2 text-[10px] font-bold tracking-[0.18em] transition-colors hover:border-ink">
                {t("cta")} <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        <RevealImage src={image} alt={t("alt")} sizes="(max-width: 1023px) 90vw, 92vw" objectPosition="center 58%" parallax overlayClassName="bg-black/10" className="mt-16 aspect-[5/4] sm:mt-20 lg:mt-28 lg:aspect-[2.25/1]" />
      </div>
    </section>
  );
}
