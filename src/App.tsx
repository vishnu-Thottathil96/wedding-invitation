import { useState } from 'react';
import './index.css';
import { weddingData } from './data/wedding';

// UI Chrome
import { ScrollProgress } from './components/ui/ScrollProgress';
import { AudioPlayer } from './components/ui/AudioPlayer';
import { WelcomeGate } from './components/ui/WelcomeGate';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { StorySection } from './components/sections/StorySection';
import { FamilySection } from './components/sections/FamilySection';
import { CloudMemoriesSection } from './components/sections/CloudMemoriesSection';
import { FooterSection } from './components/sections/FooterSection';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const {
    couple,
    families,
    weddingDate,
    cloudMemories,
    music,
  } = weddingData;

  const handleScrollToStory = () => {
    const el = document.getElementById('our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#221410] text-[#FAF5EB] font-sans selection:bg-[#D4AF37]/35 selection:text-white">
      {/* ── Welcome Gate with Lottie Paper Plane & Confetti ── */}
      {!hasEntered && (
        <WelcomeGate
          onOpen={() => setHasEntered(true)}
          brideName={couple.brideName}
          groomName={couple.groomName}
        />
      )}

      {/* ── Top Golden Scroll Progress ── */}
      <ScrollProgress />

      {/* ── 1. Hero Section ── */}
      <HeroSection
        brideName={couple.brideName}
        groomName={couple.groomName}
        dateDisplay={weddingDate.display}
        dateISO={weddingDate.dateISO}
        muhoortham={weddingDate.muhoortham}
        muhoorthamLagna={weddingDate.muhoorthamLagna}
        onScrollToStory={handleScrollToStory}
      />

      {/* ── 2. Story Section ("Our Story" with Light String Pull) ── */}
      <StorySection />

      {/* ── 3. Family Section ("Our Families") ── */}
      <FamilySection
        groomFamily={families.groom}
        brideFamily={families.bride}
        groomName={couple.groomName}
        brideName={couple.brideName}
      />

      {/* ── 4. Memories ("Above the Clouds" Cloud-Parallax) ── */}
      <CloudMemoriesSection memories={cloudMemories} />

      {/* ── 5. Footer ("With Gratitude") ── */}
      <FooterSection
        brideName={couple.brideName}
        groomName={couple.groomName}
        initials={couple.initials}
        hashtag={couple.hashtag}
      />

      {/* ── Fixed Bottom-Right Audio Player Toggle ── */}
      <AudioPlayer
        src={music.src}
        title={music.title}
        artist={music.artist}
      />
    </div>
  );
}
