"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {useTranslations} from "next-intl";
import { rooms } from "@/lib/rooms";
import { RoomShowcase } from "./RoomShowcase";

const ease = [0.22, 1, 0.36, 1] as const;

export function Rooms() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("rooms");
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.85, delay, ease },
  });

  return (
    <section id="rooms" className="bg-[#ece9e2] py-24 sm:py-32 lg:py-44" aria-labelledby="rooms-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <div ref={headingRef} className="border-t border-ink/15 pt-7 sm:pt-8">
          <motion.p {...enter()} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-moss"><span className="h-px w-8 bg-gold" /> {t("eyebrow")}</motion.p>
          <div className="mt-7 grid gap-7 lg:grid-cols-12 lg:items-end">
            <motion.h2 id="rooms-title" {...enter(0.1)} className="font-display text-[clamp(3.5rem,7vw,7rem)] font-medium leading-[0.78] tracking-[-0.05em] text-ink lg:col-span-8">{t("title").split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</motion.h2>
            <motion.p {...enter(0.2)} className="max-w-sm text-[15px] leading-7 text-ink/70 sm:text-base sm:leading-8 lg:col-span-4 lg:pb-1">{t("description")}</motion.p>
          </div>
        </div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28 lg:mt-28 lg:space-y-36">
          {rooms.map((room, index) => <RoomShowcase room={room} index={index} key={room.id} />)}
        </div>

        <div className="mt-20 flex justify-center border-t border-ink/15 pt-10 sm:mt-28 sm:pt-12">
          <Link href="#booking" className="focus-ring group inline-flex items-center gap-5 border border-ink px-6 py-4 text-[10px] font-bold tracking-[0.18em] transition-colors hover:bg-ink hover:text-ivory">
            {t("all")} <ArrowRight size={15} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
