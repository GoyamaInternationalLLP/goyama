import DownloadBrochureSection from "@/components/DownloadBrochureSection";
import HomeWhoWeAreSection from "@/components/HomeWhoWeAreSection";
import { Category } from "../../../types";
import FeaturesSection from "../../components/FeaturesSection";
import Hero from "../../components/Hero";
import { getCategories } from "@/actions/categories";

export default async function Home() {
  const catRes = await getCategories();

  if (!catRes.success) {
    return <div className="mt-4 text-red-600">Failed to load categories</div>;
  }

  const categories = catRes.data?.categories ?? [];

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
