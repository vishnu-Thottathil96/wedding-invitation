import { lazy, Suspense, useRef, useState } from 'react';
import './index.css';
import { weddingData } from './data/wedding';

// UI Chrome
import { ScrollProgress } from './components/ui/ScrollProgress';
import { AudioPlayer, type AudioPlayerHandle } from './components/ui/AudioPlayer';
import { WelcomeGate } from './components/ui/WelcomeGate';

// Sections

// Every section sits behind the envelope at first, so they all load in the background
// while the guest is looking at it — the envelope itself shows up as fast as possible.
const HeroSection = lazy(() => import('./components/sections/HeroSection').then((m) => ({ default: m.HeroSection })));
const StorySection = lazy(() => import('./components/sections/StorySection').then((m) => ({ default: m.StorySection })));
const FamilySection = lazy(() => import('./components/sections/FamilySection').then((m) => ({ default: m.FamilySection })));
const VenueSection = lazy(() => import('./components/sections/VenueSection').then((m) => ({ default: m.VenueSection })));
const CloudMemoriesSection = lazy(() => import('./components/sections/CloudMemoriesSection').then((m) => ({ default: m.CloudMemoriesSection })));
const FooterSection = lazy(() => import('./components/sections/FooterSection').then((m) => ({ default: m.FooterSection })));

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const playerRef = useRef<AudioPlayerHandle>(null);

  const {
    couple,
    families,
    weddingDate,
    venue,
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
          onTap={() => playerRef.current?.start()}
          onOpen={() => setHasEntered(true)}
          brideName={couple.brideName}
          groomName={couple.groomName}
        />
      )}

      {/* ── Top Golden Scroll Progress ── */}
      <ScrollProgress />

      <Suspense fallback={null}>
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

      {/* ── Venue: bride's residence, opens Google Maps ── */}
      <VenueSection
        name={venue.name}
        address={venue.address}
        mapUrl={venue.mapUrl}
        dateDisplay={weddingDate.display}
        muhoortham={weddingDate.muhoortham}
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
      </Suspense>

      {/* ── Fixed Bottom-Right Audio Player Toggle ── */}
      <AudioPlayer
        ref={playerRef}
        src={music.src}
        title={music.title}
        artist={music.artist}
      />
    </div>
  );
}
