import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from '../ui/Ornaments';
import type { GalleryImage } from '../../data/wedding';

interface GallerySectionProps {
  images: GalleryImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  // Distribute images into a 2-column staggered layout
  // Odd-indexed images get "tall" treatment for visual variety
  const getSpan = (index: number): boolean => {
    return index === 0 || index === 3;
  };

  return (
    <section
      id="gallery"
      aria-label="Photo gallery"
      style={{
        background: 'var(--ivory-deep)',
        padding: 'var(--section-pad) var(--gutter)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={headRef}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <SectionLabel>A Glimpse</SectionLabel>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.8rem, 5.5vw, 3rem)',
              fontWeight: 300,
              color: 'var(--brown)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            Moments to Remember
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridAutoRows: '180px',
            gap: '6px',
          }}
        >
          {images.map((img, i) => (
            <GalleryItem key={img.src} image={img} index={i} tall={getSpan(i)} />
          ))}
        </div>

      </div>
    </section>
  );
}

function GalleryItem({
  image,
  index,
  tall,
}: {
  image: GalleryImage;
  index: number;
  tall: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      className="gallery-item"
      style={{ gridRow: tall ? 'span 2' : 'span 1' }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform 0.7s cubic-bezier(0.25,0.1,0.25,1)',
          filter: 'sepia(8%) saturate(82%) brightness(1.02) contrast(103%)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
      {image.caption && (
        <div
          className="gallery-caption"
          style={{
            position: 'absolute',
            bottom: 0,
            insetInline: 0,
            padding: '1rem 0.75rem 0.6rem',
            background: 'linear-gradient(transparent, rgba(73,56,47,0.65))',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            color: 'rgba(246,240,229,0.88)',
            letterSpacing: '0.04em',
          }}
        >
          {image.caption}
        </div>
      )}
    </motion.div>
  );
}
