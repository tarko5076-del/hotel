"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const image = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1920&q=84";
const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.16 });
  const reduceMotion = useReducedMotion();
  const [desktopMotion, setDesktopMotion] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion || !desktopMotion ? ["0%", "0%"] : ["-4%", "4%"]);
  const enter = (delay = 0) => ({ initial: reduceMotion ? false : { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay, ease } });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktopMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <section ref={ref} className="relative isolate min-h-[620px] overflow-hidden bg-[#292821] text-ivory sm:min-h-[740px]" aria-labelledby="final-cta-title">
    <motion.div initial={reduceMotion ? false : { scale: 1.07 }} animate={{ scale: 1 }} transition={{ duration: 1.1, ease }} className="absolute inset-x-0 -top-[6%] h-[112%]" style={{ y }}><Image src={image} alt="A serene luxury hotel exterior at dusk" fill quality={84} sizes="100vw" className="object-cover" priority={false} /></motion.div>
    <motion.div initial={reduceMotion ? false : { opacity: 0.15 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease }} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,13,0.74),rgba(17,17,13,0.31)_70%,rgba(17,17,13,0.18))]" />
    <div className="relative mx-auto flex min-h-[620px] max-w-[1600px] flex-col justify-end px-5 py-16 sm:min-h-[740px] sm:px-8 sm:py-20 md:px-12"><div className="max-w-3xl"><motion.p {...enter(0.16)} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.22em] text-[#dec995]"><span className="h-px w-8 bg-gold" /> YOUR ESCAPE AWAITS</motion.p><motion.h2 id="final-cta-title" {...enter(0.28)} className="mt-7 font-display text-[clamp(3.4rem,8.4vw,8.8rem)] font-medium leading-[0.8] tracking-[-0.055em] sm:leading-[0.78]">STAY AT<br />PARADIS.</motion.h2><motion.p {...enter(0.4)} className="mt-8 max-w-sm text-[15px] leading-7 text-white/80 sm:text-base sm:leading-8">Make your next journey one worth remembering.</motion.p><motion.div {...enter(0.52)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"><Link href="#booking" className="focus-ring group inline-flex w-fit items-center gap-6 bg-ivory px-6 py-4 text-[10px] font-bold tracking-[0.17em] text-ink hover:bg-[#dfd8c8]">BOOK YOUR STAY <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link><Link href="#welcome" className="focus-ring w-fit border-b border-white/55 pb-2 text-[10px] font-bold tracking-[0.17em] hover:border-white">EXPLORE PARADIS</Link></motion.div></div></div>
  </section>;
}
