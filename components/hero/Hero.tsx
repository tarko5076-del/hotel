"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {useTranslations} from "next-intl";

const image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=88";

const easing = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("hero");
  const [desktopMotion, setDesktopMotion] = useState(false);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], ["0%", desktopMotion ? "13%" : "0%"]);
  const contentY = useTransform(scrollY, [0, 900], ["0%", desktopMotion ? "8%" : "0%"]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktopMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: easing },
  });

  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-[#302c23] text-white sm:min-h-screen" aria-labelledby="hero-title">
      <motion.div className="absolute -inset-x-2 -top-[4%] h-[110%] sm:-top-[7%] sm:h-[117%]" style={{ y: reduceMotion || !desktopMotion ? 0 : imageY }} initial={reduceMotion ? false : { scale: 1.045 }} animate={{ scale: 1 }} transition={{ duration: 2.3, ease: easing }}>
        <Image src={image} alt={t("alt")} fill priority quality={88} sizes="100vw" className="object-cover object-[64%_center] sm:object-[55%_center]" />
      </motion.div>
      <motion.div initial={reduceMotion ? false : { opacity: 0.08 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,17,13,0.62)_0%,rgba(18,17,13,0.31)_48%,rgba(18,17,13,0.17)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />

      <motion.div style={{ y: reduceMotion || !desktopMotion ? 0 : contentY }} className="relative mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-end px-5 pb-28 pt-28 sm:px-8 sm:pb-24 md:px-12 lg:min-h-screen lg:pb-28">
        <div className="max-w-[800px]">
          <motion.p {...fadeUp(0.45)} className="mb-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-white/90 sm:mb-8 sm:text-[11px]">
            <span className="h-px w-8 bg-[#c8aa72]" /> {t("location")}
          </motion.p>
          <motion.h1 id="hero-title" {...fadeUp(0.65)} className="font-display text-[clamp(3.35rem,9.1vw,9rem)] font-medium leading-[0.8] tracking-[-0.045em] sm:leading-[0.78]">
            {t("title").split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}
          </motion.h1>
          <motion.p {...fadeUp(0.95)} className="mt-8 max-w-md text-[14px] font-medium leading-7 text-white/88 sm:mt-10 sm:text-[15px]">
            {t("description")}
          </motion.p>
          <motion.div {...fadeUp(1.17)} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-7">
            <Link href="#booking" className="focus-ring group inline-flex w-fit items-center justify-center gap-7 bg-ivory px-5 py-4 text-[10px] font-bold tracking-[0.16em] text-ink transition-colors hover:bg-[#dfd8c8] sm:px-6">
              {t("book")} <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link href="#experience" className="focus-ring w-fit border-b border-white/60 pb-1 text-[10px] font-bold tracking-[0.16em] transition-colors hover:border-white">
              {t("explore")}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(1.35)} className="absolute bottom-7 right-5 flex items-center gap-3 sm:bottom-10 sm:right-8 lg:right-12" aria-hidden="true">
        <span className="text-[9px] font-semibold tracking-[0.2em]">{t("scroll")}</span>
        <motion.span animate={reduceMotion ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }} className="flex h-7 w-7 items-center justify-center border border-white/50 rounded-full"><ArrowDown size={13} strokeWidth={1.4} /></motion.span>
      </motion.div>
      <p className="absolute bottom-7 left-5 hidden text-[9px] font-medium tracking-[0.18em] text-white/70 sm:block sm:bottom-10 sm:left-8 lg:left-12">PARADIS HOTEL · 4 STAR</p>
    </section>
  );
}
