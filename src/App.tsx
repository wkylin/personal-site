import { AdvantagesSection } from "./components/AdvantagesSection";
import { HeroSection } from "./components/HeroSection";
import { InfluenceSection } from "./components/InfluenceSection";
import { MetricsSection } from "./components/MetricsSection";
import { Navigation } from "./components/Navigation";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SkillsSection } from "./components/SkillsSection";
import { useProfile } from "./hooks/useProfile";
import { useRevealMotion } from "./hooks/useRevealMotion";

function App() {
  const profile = useProfile();

  useRevealMotion([profile.projects]);

  return (
    <main className="relative overflow-x-clip bg-[#090d12] text-slate-100">
      <div className="site-curtain min-h-screen overflow-x-clip">
        <Navigation contacts={profile.contacts} />
        <HeroSection profile={profile} />

        <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6 sm:px-6 lg:px-8">
          <MetricsSection metrics={profile.metrics} />
          <AdvantagesSection advantages={profile.advantages} />
          <ProjectsSection projects={profile.projects} />
          <SkillsSection skills={profile.skills} />
          <InfluenceSection contacts={profile.contacts} influence={profile.influence} />
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

export default App;
