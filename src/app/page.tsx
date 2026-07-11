import Hero from "@/components/ui/Hero";
import ServicesSummary from "@/components/ui/ServicesSummary";
import ProjectsSummary from "@/components/ui/ProjectsSummary";
import Features from "@/components/ui/Features";
import Workflow from "@/components/ui/Workflow";
import Team from "@/components/ui/Team";
import FAQ from "@/components/ui/FAQ";


export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSummary />
      <ServicesSummary />
      <Features />
      <Workflow />
      <Team />
      <FAQ />

    </>
  );
}

