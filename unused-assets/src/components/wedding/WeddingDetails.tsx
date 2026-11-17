import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Calendar, Phone, Mail, Copy, Check } from 'lucide-react';
import type { WeddingConfig } from '../../data/wedding';

interface WeddingDetailsProps {
  config: WeddingConfig;
}

export function WeddingDetails({ config }: WeddingDetailsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [copied, setCopied] = useState(false);

  const { couple, wedding } = config;
  const contact = (config as any).contact;

  // ── Calendar event (ICS) ────────────────────────────────────────────────
  const buildCalendarUrl = () => {
    const startDate = wedding.dateISO.replace(/-/g, '');
    // Format: YYYYMMDDTHHMMSS — use the ceremony time as a simple string
    const startTime = '100000'; // 10:00:00
    const endTime   = '140000'; // 14:00:00
    const title = encodeURIComponent(`${couple.brideName} & ${couple.groomName} Wedding`);
    const location = encodeURIComponent(`${wedding.venue.name}, ${wedding.venue.address}`);
    const details = encodeURIComponent(`Join us to celebrate the wedding of ${couple.brideName} & ${couple.groomName}. ${wedding.venue.name}, ${wedding.venue.address}, ${wedding.venue.city}.`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}T${startTime}/${startDate}T${endTime}&details=${details}&location=${location}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${wedding.venue.name}, ${wedding.venue.address}, ${wedding.venue.city}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text
    }
  };

  return (
    <section
      id="scene-invitation"
      ref={ref}
      aria-label="Wedding Invitation Details"
      style={{
        background: 'var(--ivory)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Preamble */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="chapter-label" style={{ marginBottom: '1.5rem', display: 'block' }}>
            Scene VII — The Invitation
          </span>

          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.85,
              color: 'var(--espresso)',
            }}
          >
            Every beautiful story has the people who make it even more meaningful.
            <br /><br />
            As we begin this new chapter, we would love nothing more than to have you with us.
          </p>

          <div className="gold-divider" style={{ margin: '2rem auto' }} aria-hidden />

          <p
            className="font-script"
            style={{ fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1 }}
          >
            Come celebrate the beginning of our forever.
          </p>
        </motion.div>

        {/* Invitation Card */}
        <motion.div
          className="invitation-card"
          style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Names */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 300,
                color: 'var(--espresso)',
                lineHeight: 1.2,
              }}
            >
              {couple.brideName}
              <span
                className="font-script"
                style={{
                  display: 'block',
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  color: 'var(--gold)',
                  margin: '0.2rem 0',
                }}
              >
                &amp;
              </span>
              {couple.groomName}
            </h2>
          </div>

          {/* Details */}
          <div>
            <div className="detail-row">
              <span className="detail-label">Wedding Date</span>
              <span className="detail-value font-serif">{wedding.date}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Ceremony Time</span>
              <span className="detail-value font-serif">{wedding.muhoortham || (wedding as any).time}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Venue</span>
              <span className="detail-value font-serif">{wedding.venue.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Address</span>
              <span
                className="detail-value font-serif"
                style={{ fontSize: '1rem', lineHeight: 1.5 }}
              >
                {wedding.venue.address}
                <br />
                {wedding.venue.city}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '2rem',
              justifyContent: 'center',
            }}
          >
            <a
              href={wedding.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn"
              aria-label="Open venue location in Google Maps"
              id="btn-open-maps"
            >
              <MapPin size={14} strokeWidth={1.5} aria-hidden />
              Open in Maps
            </a>

            <a
              href={buildCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn"
              aria-label="Add wedding to Google Calendar"
              id="btn-add-calendar"
            >
              <Calendar size={14} strokeWidth={1.5} aria-hidden />
              Add to Calendar
            </a>

            <button
              onClick={copyAddress}
              className="action-btn"
              aria-label="Copy venue address to clipboard"
              id="btn-copy-address"
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={1.5} aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={1.5} aria-hidden />
                  Copy Address
                </>
              )}
            </button>

            {contact.rsvpUrl ? (
              <a
                href={contact.rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                aria-label="RSVP to the wedding"
                id="btn-rsvp"
                style={{ background: 'var(--gold)', color: 'var(--soft-white)', borderColor: 'var(--gold)' }}
              >
                RSVP
              </a>
            ) : contact.rsvpPhone ? (
              <a
                href={`https://wa.me/${contact.rsvpPhone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                aria-label="RSVP via WhatsApp"
                id="btn-rsvp-wa"
                style={{ background: 'var(--gold)', color: 'var(--soft-white)', borderColor: 'var(--gold)' }}
              >
                <Phone size={14} strokeWidth={1.5} aria-hidden />
                RSVP via WhatsApp
              </a>
            ) : null}
          </div>

          {/* Contact Info */}
          {(contact.rsvpEmail || contact.rsvpPhone) && (
            <div
              style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(182,154,112,0.2)',
                textAlign: 'center',
              }}
            >
              <p
                className="font-sans"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--olive)',
                  marginBottom: '0.5rem',
                }}
              >
                For enquiries
              </p>
              {contact.rsvpEmail && (
                <a
                  href={`mailto:${contact.rsvpEmail}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--espresso)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    marginBottom: '0.25rem',
                  }}
                  aria-label={`Send email to ${contact.rsvpEmail}`}
                >
                  <Mail size={13} strokeWidth={1.5} aria-hidden />
                  {contact.rsvpEmail}
                </a>
              )}
              {contact.rsvpPhone && (
                <a
                  href={`tel:${contact.rsvpPhone.replace(/\s/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    color: 'var(--espresso)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                  aria-label={`Call ${contact.rsvpPhone}`}
                >
                  <Phone size={13} strokeWidth={1.5} aria-hidden />
                  {contact.rsvpPhone}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
