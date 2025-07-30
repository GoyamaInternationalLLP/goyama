import IndustriesSection from "@/components/IndustriesSection";
import AboutFlyash from "../../components/AboutFlyash";
import Flyash_hero from "../../components/Flyash_hero";
import GlobalExportSection from "@/components/GlobalExportSection";
import FlyAshComposition from "@/components/FlyAshComposition";

export default function flyashPage() {
  return (
    <>
      <Flyash_hero />
      <AboutFlyash />
      <FlyAshComposition />
      <IndustriesSection />
      <GlobalExportSection />
    </>
  );
}
