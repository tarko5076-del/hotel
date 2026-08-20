"use client";

import Link from "next/link";
import {useTranslations} from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const hotelLinks = [["rooms", "#rooms"], ["experience", "#experience"], ["dining", "#dining"], ["gallery", "#gallery"], ["location", "#location"]] as const;
  return <footer className="bg-[#1e1e1a] text-ivory">
    <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:py-24">
      <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-12 lg:gap-x-10 lg:pb-20">
        <div className="lg:col-span-5"><Link href="/" className="focus-ring text-[17px] font-semibold tracking-[0.24em]">PARADIS HOTEL</Link><p className="mt-5 text-[11px] font-bold tracking-[0.18em] text-white/58">Wereta, Ethiopia</p></div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          <nav aria-label={t("explore")}><p className="text-[9px] font-bold tracking-[0.2em] text-[#d5c294]">{t("explore")}</p><ul className="mt-5 space-y-3">{hotelLinks.map(([label, href]) => <li key={label}><Link href={href} className="focus-ring text-[13px] text-white/78 hover:text-white">{nav(label)}</Link></li>)}</ul></nav>
          <address className="not-italic"><p className="text-[9px] font-bold tracking-[0.2em] text-[#d5c294]">{t("contact")}</p><p className="mt-5 text-[13px] leading-7 text-white/70">Paradis Hotel<br />Wereta, Ethiopia<br /><a href="tel:0998659519" className="focus-ring hover:text-white">09 98659519</a><br /><a href="mailto:example@gmail.com" className="focus-ring break-all hover:text-white">example@gmail.com</a></p><Link href="#booking" className="focus-ring mt-5 inline-block border-b border-white/45 pb-1 text-[10px] font-bold tracking-[0.16em] hover:border-white">{t("book")}</Link></address>
          <div className="min-w-0"><p className="text-[9px] font-bold tracking-[0.2em] text-[#d5c294]">{t("follow")}</p><div className="mt-5 flex flex-col items-start gap-3">{(t.raw("social") as string[]).map((name) => <button type="button" disabled key={name} className="cursor-not-allowed break-words text-left text-[13px] text-white/45" aria-label={t("coming", {name})}>{name}</button>)}</div></div>
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-7 text-[10px] font-medium tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between"><p>{t("copyright")}</p><div className="flex flex-wrap gap-x-5 gap-y-2"><span>{t("privacy")}</span><span>{t("terms")}</span></div></div>
    </div>
  </footer>;
}
