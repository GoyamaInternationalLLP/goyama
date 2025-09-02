import DownloadBrochureSection from "@/components/DownloadBrochureSection";
import HomeWhoWeAreSection from "@/components/HomeWhoWeAreSection";
import { Category } from "../../../types";
import FeaturesSection from "../../components/FeaturesSection";
import Hero from "../../components/Hero";
import { getCategories } from "@/actions/categories";
import LoadingSpinner from "@/components/LoadingSpinner";

export default async function Home() {
  return (
    <>
      <Hero />
      <HomeWhoWeAreSection />
      <section id="about">{/* <Guide /> */}</section>
      <FeaturesSection />
      {/* <Camp /> */}
      <DownloadBrochureSection />
    </>
  );
}
