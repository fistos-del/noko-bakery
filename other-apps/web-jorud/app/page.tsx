import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import BeforeAfter from "@/components/BeforeAfter";
import Timeline from "@/components/Timeline";
import Impact from "@/components/Impact";
import TenderPortal from "@/components/TenderPortal";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <BeforeAfter />
      <Timeline />
      <Impact />
      <TenderPortal />
      <Contact />
    </main>
  );
}