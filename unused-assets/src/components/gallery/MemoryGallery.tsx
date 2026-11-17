import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { GalleryImage } from '../../data/wedding';

interface MemoryGalleryProps {
  images: GalleryImage[];
}

export function MemoryGallery({ images }: MemoryGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="memory-gallery" role="list">
      {images.map((img, i) => (
        <GalleryItem key={img.src} image={img} index={i} parentInView={inView} />
      ))}
    </div>
  );
}

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  parentInView: boolean;
}

function GalleryItem({ image, index, parentInView }: GalleryItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <motion.div
      ref={ref}
      role="listitem"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1px',
        aspectRatio: '3/4',
        background: 'var(--cream)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.18, ease: 'easeOut' }}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          scale: imgScale,
          filter: 'sepia(10%) saturate(88%) contrast(102%) brightness(96%)',
        }}
        loading="lazy"
        decoding="async"
      />
      {image.caption && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(48,40,32,0.65) 0%, transparent 45%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.25rem 1rem',
          }}
          aria-hidden
        >
          <span
            className="font-script"
            style={{
              color: 'rgba(247,242,233,0.92)',
              fontSize: '1.1rem',
              lineHeight: 1.3,
            }}
          >
            {image.caption}
          </span>
        </div>
      )}
    </motion.div>
  );
}
