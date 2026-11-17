import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Music,
  Flame,
  Utensils,
  ChevronDown,
} from 'lucide-react';
import type { EventItem } from '../../data/wedding';
import { GoldenDivider } from '../ui/OrnateFlourish';

interface EventsSectionProps {
  events: EventItem[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  // Active map embed state for cards
  const [expandedMapId, setExpandedMapId] = useState<string | null>(null);

  const toggleMap = (id: string) => {
    setExpandedMapId(expandedMapId === id ? null : id);
  };

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#E6CA65]" />;
      case 'music':
        return <Music className="w-5 h-5 text-[#E6CA65]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#E6CA65]" />;
      case 'utensils':
        return <Utensils className="w-5 h-5 text-[#E6CA65]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#E6CA65]" />;
    }
  };

  return (
    <section id="festivities" className="relative py-24 sm:py-32 px-4 bg-[#1F120E] text-[#FAF5EB]">
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(84,17,29,0.3)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <GoldenDivider
          subtitle="Celebrations & Sacred Rites"
          title="Festivities & Events"
          className="mb-14 sm:mb-20"
        />

        {/* Ceremonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((event, idx) => {
            const isMapOpen = expandedMapId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#3E0B13]/90 via-[#2A060C]/95 to-[#1C0408] border transition-all duration-500 flex flex-col justify-between ${
                  event.badge === 'Main Auspicious Ceremony'
                    ? 'border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]/50'
                    : 'border-[#D4AF37]/35 shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]'
                }`}
              >
                {/* Event Badge */}
                {event.badge && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#221410] font-cinzel text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#221410]" />
                    <span>{event.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-[#54111D] border border-[#D4AF37]/40 shadow-inner flex-shrink-0">
                      {getEventIcon(event.icon)}
                    </div>

                    <div>
                      <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#D4AF37] block">
                        {event.day}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF5EB] font-light mt-0.5">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm font-sans text-[#FAF5EB]/75 font-light mb-6">
                    {event.subTitle}
                  </p>

                  {/* Timing & Venue details */}
                  <div className="space-y-3 py-4 border-y border-[#D4AF37]/20 text-sm font-sans">
                    {/* Time */}
                    <div className="flex items-center gap-3 text-[#F6E29F]">
                      <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <div>
                        <span className="font-medium">{event.date}</span>
                        <span className="text-[#FAF5EB]/80 ml-2">({event.time})</span>
                      </div>
                    </div>

                    {/* Muhoortham Highlight if applicable */}
                    {event.muhoorthamTime && (
                      <div className="p-2.5 rounded-xl bg-[#54111D]/90 border border-[#D4AF37]/40 text-xs sm:text-sm font-medium text-[#FFF4CC] flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#FFC83B] flex-shrink-0 animate-pulse" />
                        <span>{event.muhoorthamTime}</span>
                      </div>
                    )}

                    {/* Venue */}
                    <div className="flex items-start gap-3 text-[#FAF5EB]/90">
                      <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-serif text-base text-[#FAF5EB] block font-medium">
                          {event.venueName}
                        </span>
                        <span className="text-xs text-[#FAF5EB]/70 block">
                          {event.venueAddress}, {event.venueCity}
                        </span>
                      </div>
                    </div>

                    {/* Dress Code hint */}
                    <div className="flex items-start gap-3 text-xs text-[#D4AF37]">
                      <span className="font-cinzel tracking-wider uppercase text-[10px] text-[#FAF5EB]/50 mt-0.5 flex-shrink-0">
                        Attire:
                      </span>
                      <span className="text-[#F6E29F]/90 italic">{event.dressCode}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Open in Maps & Interactive Map Embed Toggle */}
                <div className="mt-6 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Direct External Google Maps Link */}
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#221410] font-cinzel text-xs font-semibold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Toggle Embedded Interactive Map */}
                    <button
                      onClick={() => toggleMap(event.id)}
                      className="px-4 py-2.5 rounded-xl bg-[#54111D]/80 border border-[#D4AF37]/40 text-[#F6E29F] font-cinzel text-xs tracking-wider uppercase hover:bg-[#6B1726] hover:border-[#D4AF37] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{isMapOpen ? 'Hide Map' : 'Preview Map'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isMapOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Collapsible Google Maps Embed Iframe */}
                  <AnimatePresence>
                    {isMapOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-[#D4AF37]/20"
                      >
                        <div className="w-full h-56 rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-inner">
                          <iframe
                            title={`Map for ${event.title}`}
                            src={event.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
