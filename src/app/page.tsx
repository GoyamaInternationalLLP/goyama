import Camp from "../../components/Camp";
import FeaturesSection from "../../components/FeaturesSection";
import Guide from "../../components/Guide";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="about">
        <Guide />
      </section>
      <FeaturesSection />
      <Camp />
    </>
  );
}
