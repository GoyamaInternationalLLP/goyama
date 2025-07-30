import QuartzSpecifications from "@/components/QuartzSpecifications";
import BrochureSections from "../../components/BrochureSections";
import CardGallery from "../../components/CardGallery";
import Hero from "../../components/Hero";

export default function QuartzPage() {
  return (
    <>
      <Hero />
      <BrochureSections />
      <QuartzSpecifications />
      <CardGallery />
    </>
  );
}
