import {Hero} from "@/components/hero/Hero";
import {Navigation} from "@/components/navigation/Navigation";
import {Introduction} from "@/components/sections/Introduction";
import {Rooms} from "@/components/rooms/Rooms";
import {ExperienceSection} from "@/components/experiences/ExperienceSection";
import {DiningSection} from "@/components/dining/DiningSection";
import {RomanticEscape} from "@/components/romance/RomanticEscape";
import {DestinationSection} from "@/components/destination/DestinationSection";
import {GallerySection} from "@/components/gallery/GallerySection";
import {Testimonials} from "@/components/testimonials/Testimonials";
import {BookingForm} from "@/components/booking/BookingForm";
import {FinalCta} from "@/components/cta/FinalCta";
import {Footer} from "@/components/footer/Footer";
import {ContactSection} from "@/components/contact/ContactSection";
import {setRequestLocale} from "next-intl/server";

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <main><Navigation /><Hero /><Introduction /><Rooms /><ExperienceSection /><DiningSection /><RomanticEscape /><DestinationSection /><GallerySection /><Testimonials /><BookingForm /><FinalCta /><ContactSection /><Footer /></main>;
}
