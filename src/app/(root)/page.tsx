import ImageSlider from "@/components/ui/image-slider";
import Camp from "../../components/Camp";
import FeaturesSection from "../../components/FeaturesSection";
import Guide from "../../components/Guide";
import Hero from "../../components/Hero";
import HeroSlider from "@/components/ui/HeroSlider";
import HomeWhoWeAreSection from "@/components/HomeWhoWeAreSection";
import DownloadBrochureSection from "@/components/DownloadBrochureSection";
import { fetchCategories } from "@/lib/api";
import { Category } from "../../../types";

export default async function Home() {
  const categories = (await fetchCategories()) as Category[];

  return (
    <>
      <Hero />
      <HomeWhoWeAreSection />
      <section id="about">{/* <Guide /> */}</section>
      <FeaturesSection categories={categories} />
      {/* <Camp /> */}
      <DownloadBrochureSection />
    </>
  );
}
