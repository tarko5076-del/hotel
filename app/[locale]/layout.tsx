import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {routing} from "@/i18n/routing";
import {Noto_Sans_Ethiopic} from "next/font/google";

const ethiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  display: "swap"
});

type Props = Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>;

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, "children">): Promise<Metadata> {
  const {locale} = await params;
  const amharic = locale === "am";
  const title = amharic ? "አርደንት ሆቴል | በወረታ የቅንጦት ቆይታ" : "Ardent Hotel | Luxury Stay in Wereta, Ethiopia";
  const description = amharic ? "በወረታ፣ ኢትዮጵያ ውስጥ ለማይረሳ ጉዞ፣ ለረጋ ጊዜያት እና ለልዩ መስተንግዶ የተዘጋጀ ውብ ቆይታ።" : "Discover Ardent Hotel in Wereta, Ethiopia — a refined 4-star stay designed for unforgettable journeys, peaceful moments, and exceptional hospitality.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {en: "/en", am: "/am"}
    },
    openGraph: {type: "website", locale: locale === "am" ? "am_ET" : "en_US", url: `/${locale}`, siteName: amharic ? "አርደንት ሆቴል" : "Ardent Hotel", title, description}
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return <NextIntlClientProvider messages={messages}><div lang={locale} dir="ltr" className={`${locale === "am" ? `${ethiopic.variable} locale-am` : "locale-en"}`}>{children}</div></NextIntlClientProvider>;
}
