"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useRef } from "react";
import { RevealImage } from "@/components/ui/RevealImage";

const image = "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1280&q=84";
const details = [
  ["Arrive", "A peaceful base for discovering the region."],
  ["Explore", "Experience the landscapes, culture, and character of Ethiopia."],
  ["Return", "Come back to a place designed for rest and comfort."],
];
const ease = [0.22, 1, 0.36, 1] as const;

export function DestinationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const reduceMotion = useReducedMotion();
  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 22 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay, ease } });

  return (
    <section id="location" ref={ref} className="overflow-hidden bg-ivory py-24 sm:py-32 lg:py-44" aria-labelledby="destination-title">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <RevealImage src={image} alt="An expansive Ethiopian landscape with green hills" sizes="(max-width: 1023px) 90vw, 58vw" objectPosition="center" parallax overlayClassName="bg-black/[0.08]" className="aspect-[4/5] bg-[#c7bca9] sm:aspect-[16/10] lg:col-span-7 lg:aspect-[1.1/1]" />
          <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
            <motion.p {...enter(0.08)} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-moss"><span className="h-px w-8 bg-gold" /> THE DESTINATION</motion.p>
            <motion.h2 id="destination-title" {...enter(0.18)} className="mt-7 font-display text-[clamp(3.45rem,5.8vw,6.2rem)] font-medium leading-[0.8] tracking-[-0.05em]">DISCOVER<br />WERETA.</motion.h2>
            <motion.p {...enter(0.3)} className="mt-8 max-w-sm text-[15px] leading-7 text-ink/72 sm:text-base sm:leading-8">A stay at Ardent Hotel is an invitation to slow down, explore, and experience the character of northern Ethiopia.</motion.p>
          </div>
        </div>
        <div className="mt-16 grid border-t border-ink/15 sm:mt-20 md:grid-cols-3">
          {details.map(([label, copy], index) => <Fragment key={label}><motion.div {...enter(0.22 + index * 0.1)} className="border-b border-ink/15 py-7 md:border-b-0 md:border-r md:px-8 md:py-8 md:first:pl-0 md:last:border-r-0"><p className="text-[10px] font-bold tracking-[0.2em] text-moss">0{index + 1} — {label.toUpperCase()}</p><p className="mt-4 max-w-xs text-[14px] leading-7 text-ink/72">{copy}</p></motion.div></Fragment>)}
        </div>
      </div>
    </section>
  );
}
