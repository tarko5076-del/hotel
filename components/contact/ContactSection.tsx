"use client";

import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import {useTranslations} from "next-intl";

export function ContactSection() {
  const t = useTranslations("contact");
  const contacts = [
    {label: t("phone"), icon: Phone, value: "09 98659519", href: "tel:0998659519"},
    {label: t("email"), icon: Mail, value: "example@gmail.com", href: "mailto:example@gmail.com"},
    {label: t("locationLabel"), icon: MapPin, value: "Wereta, Ethiopia"},
  ];
  return <section className="bg-ivory py-20 sm:py-24 lg:py-32" aria-labelledby="contact-title">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">
      <div className="grid gap-10 border-t border-ink/15 pt-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5"><p className="text-[10px] font-bold tracking-[0.22em] text-moss">{t("hotel")}</p><h2 id="contact-title" className="mt-4 font-display text-[clamp(2.8rem,4vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">{t("location")}</h2></div>
        <address className="grid not-italic sm:grid-cols-3 lg:col-span-7">{contacts.map(({ label, icon: Icon, value, href }) => <div className="border-t border-ink/15 py-5 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 sm:py-0" key={label}><p className="flex items-center gap-2 text-[9px] font-bold tracking-[0.18em] text-moss"><Icon size={13} strokeWidth={1.4} /> {label}</p>{href ? <a href={href} className="focus-ring mt-3 inline-block text-[13px] text-ink/72 transition-colors hover:text-ink">{value}</a> : <p className="mt-3 text-[13px] text-ink/72">{value}</p>}</div>)}</address>
      </div>
      <Link href="#booking" className="focus-ring group mt-10 inline-flex items-center gap-3 border-b border-ink/45 pb-2 text-[10px] font-bold tracking-[0.18em] hover:border-ink">{t("plan")} <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
    </div>
  </section>;
}
