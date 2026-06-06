import { AdvantagesSection } from "./components/AdvantagesSection";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { InfluenceSection } from "./components/InfluenceSection";
import { MagicTrail } from "./components/MagicTrail";
import { MetricsSection } from "./components/MetricsSection";
import { Navigation } from "./components/Navigation";
import { PageIntro } from "./components/PageIntro";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SkillsSection } from "./components/SkillsSection";
import { useProfile } from "./hooks/useProfile";
import { useRevealMotion } from "./hooks/useRevealMotion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import ReactGA from 'react-ga4';
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-Y0T0V9X7J7";
ReactGA.initialize(GA_MEASUREMENT_ID);

function App() {
  const profile = useProfile();

  useSmoothScroll();
  useRevealMotion([profile.projects]);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <main className="relative overflow-x-clip bg-[#090d12] text-slate-100">
      <PageIntro />
      <MagicTrail
        particleCount={30}
        particleSize={[0.7, 2.2]}
        particleSpeed={[0.5, 1.6]}
        shadowBlur={8}
        trailLength={18}
        trailMaxWidth={2.35}
        trailOpacity={0.42}
      />
      <div className="site-curtain min-h-screen overflow-x-clip">
        <Navigation contacts={profile.contacts} />
        <HeroSection profile={profile} />
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6 sm:px-6 lg:px-8">
          <MetricsSection metrics={profile.metrics} />
          <AdvantagesSection advantages={profile.advantages} />
          <ProjectsSection projects={profile.projects} />
          <SkillsSection skills={profile.skills} />
          <InfluenceSection contacts={profile.contacts} influence={profile.influence} />
          <ContactSection />
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

export default App;
