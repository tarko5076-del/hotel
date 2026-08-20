"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {useTranslations} from "next-intl";
import { RevealImage } from "@/components/ui/RevealImage";
import type { Room } from "@/lib/rooms";

const ease = [0.22, 1, 0.36, 1] as const;

export function RoomShowcase({ room, index }: { room: Room; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("rooms");
  const enter = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: reduceMotion ? 0 : 0.06, ease },
  };

  return (
    <article ref={ref} className={`group grid grid-cols-1 gap-y-7 lg:grid-cols-12 lg:items-start lg:gap-x-10`} aria-labelledby={`room-${index}`}>
      <RevealImage
        src={room.image}
        alt={t(`items.${index}.alt`)}
        sizes="(max-width: 1023px) 90vw, 58vw"
        imageClassName={room.imagePositionClassName}
        delay={index * 0.08}
        className={`${room.imageClassName} relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[1.2/1]`}
      />
      <motion.div {...enter} transition={{ ...enter.transition, delay: reduceMotion ? 0 : 0.16 }} className={room.detailsClassName}>
        <p className="text-[10px] font-bold tracking-[0.2em] text-moss">{t(`items.${index}.category`)}</p>
        <h3 id={`room-${index}`} className="mt-3 font-display text-[clamp(2.7rem,4.4vw,4.5rem)] font-medium leading-[0.88] tracking-[-0.035em] text-ink transition-transform duration-500 group-hover:translate-x-1">
          {t(`items.${index}.name`)}
        </h3>
        <p className="mt-5 max-w-sm text-[14px] leading-7 text-ink/70 sm:text-[15px]">{t(`items.${index}.description`)}</p>
        <Link href="#booking" className="focus-ring group mt-7 inline-flex items-center gap-3 border-b border-ink/45 pb-2 text-[10px] font-bold tracking-[0.18em] transition-colors hover:border-ink">
          {t("explore")} <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </article>
  );
}
