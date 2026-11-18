// ── South Indian Wedding Configuration & Invitation Data ────────────────────────
// Fully structured single source of truth for the modern royal wedding invitation

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export type WeddingConfig = any;

export interface EventItem {
  id: string;
  title: string;
  subTitle: string;
  day: string;
  date: string;
  time: string;
  muhoorthamTime?: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  dressCode: string;
  mapUrl: string;
  mapEmbedUrl: string;
  badge?: string;
  icon: string;
}

export interface StoryMilestone {
  id: string;
  step: number;
  year: string;
  date: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  polaroidRotation: number;
}

export interface CloudMemory {
  id: string;
  image: string;      // larger photo, shown when a guest taps to expand
  thumb?: string;     // small copy used in the grid (falls back to image)
  title?: string;     // optional short title under the photo
  caption?: string;   // optional caption
  location?: string;
  date?: string;
  rotation: number;   // slight tilt of the polaroid, in degrees
}

export interface ColorSwatch {
  name: string;
  tamilName: string;
  hex: string;
  accent: string;
  description: string;
}

export interface WeddingData {
  couple: {
    brideName: string;
    brideFullName: string;
    brideDegree: string;
    groomName: string;
    groomFullName: string;
    groomDegree: string;
    initials: string;
    hashtag: string;
  };
  invocation: {
    sanskrit: string;
    tamil: string;
    english: string;
  };
  families: {
    groom: {
      father: string;
      mother: string;
      grandparents?: string;
      lineage: string;
      blessing: string;
      image: string;
      sibling?: string;
    };
    bride: {
      father: string;
      mother: string;
      grandparents?: string;
      lineage: string;
      blessing: string;
      image: string;
      sibling?: string;
    };
  };
  weddingDate: {
    display: string;
    dateISO: string;
    dayOfWeek: string;
    dateDay: string;
    dateMonth: string;
    dateYear: string;
    muhoortham: string;
    muhoorthamLagna: string;
    timezone: string;
    timezoneLabel: string;
  };
  storyMilestones: StoryMilestone[];
  events: EventItem[];
  cloudMemories: CloudMemory[];
  /** Which photo goes in which column (top to bottom), per screen size. Uses photo ids. */
  galleryLayout?: { phone: string[][]; tablet: string[][]; desktop: string[][] };
  dressCode: {
    title: string;
    subTitle: string;
    intro: string;
    recommendedNote: string;
    avoidNote: string;
    recommendedColors: ColorSwatch[];
    avoidColors: { name: string; hex: string; reason: string }[];
    etiquetteTips: string[];
  };
  venue: {
    name: string;
    address: string;
    city: string;
    mapUrl: string;
    mapEmbedUrl: string;
  };
  images: {
    hero: string;
    coverPortrait: string;
    bride: string;
    groom: string;
    hands: string;
    families: string;
  };
  music: {
    src: string;
    title: string;
    artist: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    brideName: 'Anaswara',
    brideFullName: 'Anaswara',
    brideDegree: '',
    groomName: 'Ashil',
    groomFullName: 'Ashil',
    groomDegree: '',
    initials: 'A & A',
    hashtag: '#AnaswaraWedsAshil',
  },

  invocation: {
    sanskrit: '',
    tamil: '',
    english: 'Together with their families invite you',
  },

  families: {
    groom: {
      father: 'LATE MR. RAVEENDRAN',
      mother: 'MRS. SAJINI',
      sibling: '',
      grandparents: '',
      lineage: 'Traditional heritage',
      blessing: 'With immense joy and gratitude in our hearts, we invite you to join hands with us as we bless our beloved son Ashil into marital bliss.',
      image: '/images/boy.png',
    },
    bride: {
      father: 'MR. BHASKARAN',
      mother: 'MRS. SAJINI',
      sibling: '',
      grandparents: '',
      lineage: 'Traditional heritage',
      blessing: 'With the benevolence of the Almighty and our ancestors, we warmly welcome you to witness our precious daughter Anaswara take her sacred steps.',
      image: '/images/girl.png',
    },
  },

  weddingDate: {
    display: 'Saturday, 21st November 2026',
    dateISO: '2026-11-21T12:25:00+05:30',
    dayOfWeek: 'Saturday',
    dateDay: '21',
    dateMonth: 'November',
    dateYear: '2026',
    muhoortham: '12:25 – 1:00 PM',
    muhoorthamLagna: 'Auspicious Muhurtham',
    timezone: 'Asia/Kolkata',
    timezoneLabel: 'IST (UTC+05:30)',
  },

  storyMilestones: [
    {
      id: 'story-1',
      step: 1,
      year: '2023',
      date: 'Autumn in Chennai',
      title: 'A Cup of Filter Coffee',
      tagline: 'When two conversations became one',
      description: 'Under the gentle yellow lights of an old Mylapore cafe, a polite 30-minute introductory meeting turned into three hours of endless conversation, shared laughter, and an unspoken spark.',
      image: '/images/couple_conversation.jpg',
      polaroidRotation: -3,
    },
    {
      id: 'story-2',
      step: 2,
      year: '2024',
      date: 'Spring by the Shore',
      title: 'Starlit Walks & Shared Dreams',
      tagline: 'Finding rhythm in each other',
      description: 'From discussing classical music concerts to debating favorite book endings along the breezy sands of Besant Nagar beach, we found not just a companion, but our deepest comfort.',
      image: '/images/couple_laughing.jpg',
      polaroidRotation: 3.5,
    },
    {
      id: 'story-3',
      step: 3,
      year: '2025',
      date: 'The Families Meet',
      title: 'Two Homes, One Heart',
      tagline: 'Laughter, blessings, and sweets',
      description: 'When our parents met, the warmth was instant and undeniable. Stories were exchanged, traditional filter coffee flowed, and in the joyous clinking of tumblers, two families bonded as one.',
      image: '/images/two_families.jpg',
      polaroidRotation: -2.5,
    },
    {
      id: 'story-4',
      step: 4,
      year: '2026',
      date: 'The Sacred Vows',
      title: 'Nichayathartham & Forever',
      tagline: 'Bound by jasmine, faith, and love',
      description: 'Surrounded by fragrance of fresh mallipoo, glowing brass lamps, and the chanting of auspicious Vedic mantras, our engagement sealed a promise that leads us to this divine altar.',
      image: '/images/hands_together.jpg',
      polaroidRotation: 2,
    },
  ],

  events: [
    {
      id: 'event-1',
      title: 'Viratham & Sumangali Prarthanai',
      subTitle: 'Sacred pre-wedding ancestral prayers and purification rituals',
      day: 'Saturday Morning',
      date: '21 November 2026',
      time: '8:30 AM – 11:30 AM',
      venueName: 'Ananda Hall, Krishnankoil Mandapam',
      venueAddress: 'Temple Road, Krishnankoil',
      venueCity: 'Virudhunagar, Tamil Nadu — 626 190',
      dressCode: 'Traditional South Indian Silks / Madisar & Veshti',
      mapUrl: 'https://maps.google.com/?q=Krishnankoil+Temple+Virudhunagar',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15735.632297880195!2d77.625845!3d9.585521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf720dc55f5f%3A0xe13ba7f2b96e5797!2sKrishnankoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      badge: 'Traditional Rituals',
      icon: 'sparkles',
    },
    {
      id: 'event-2',
      title: 'Nichayathartham & Sangeet Gala',
      subTitle: 'Formal betrothal followed by an evening of music, dance, and feast',
      day: 'Saturday Evening',
      date: '21 November 2026',
      time: '6:00 PM onwards',
      venueName: 'The Royal Courtyard, Heritage Mandapam',
      venueAddress: 'Heritage Courtyard, Krishnankoil',
      venueCity: 'Virudhunagar, Tamil Nadu',
      dressCode: 'Festive Indian Attire • Jewel Tone Sarees, Kurta Pajama, Bandhgalas',
      mapUrl: 'https://maps.google.com/?q=Krishnankoil+Temple+Virudhunagar',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15735.632297880195!2d77.625845!3d9.585521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf720dc55f5f%3A0xe13ba7f2b96e5797!2sKrishnankoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      badge: 'Celebration & Music',
      icon: 'music',
    },
    {
      id: 'event-3',
      title: 'The Holy Muhoortham',
      subTitle: 'Kanyadaanam, Maangalya Dhaaranam & Sapthapadi',
      day: 'Sunday Morning',
      date: '22 November 2026',
      time: '8:00 AM – 12:00 PM',
      muhoorthamTime: 'Auspicious Muhoortham: 10:47 AM (Kumba Lagna)',
      venueName: 'Krishnankoil Heritage Kalyana Mandapam',
      venueAddress: 'Main Temple Road, Krishnankoil',
      venueCity: 'Virudhunagar, Tamil Nadu — 626 190',
      dressCode: 'Authentic Traditional South Indian Attire • Kanjeevaram Silks & Pattu Veshti',
      mapUrl: 'https://maps.google.com/?q=Krishnankoil+Temple+Virudhunagar',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15735.632297880195!2d77.625845!3d9.585521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf720dc55f5f%3A0xe13ba7f2b96e5797!2sKrishnankoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      badge: 'Main Auspicious Ceremony',
      icon: 'flame',
    },
    {
      id: 'event-4',
      title: 'Grand Wedding Feast & Reception',
      subTitle: 'Traditional Kalyana Virundhu (Banana Leaf Feast) & Evening Reception',
      day: 'Sunday Afternoon & Evening',
      date: '22 November 2026',
      time: 'Feast from 12:30 PM • Reception 6:30 PM',
      venueName: 'The Grand Banquet Hall, Krishnankoil Mandapam',
      venueAddress: 'Main Temple Road, Krishnankoil',
      venueCity: 'Virudhunagar, Tamil Nadu',
      dressCode: 'Graceful Traditional or Formal Indian Festive Wear',
      mapUrl: 'https://maps.google.com/?q=Krishnankoil+Temple+Virudhunagar',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15735.632297880195!2d77.625845!3d9.585521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf720dc55f5f%3A0xe13ba7f2b96e5797!2sKrishnankoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      badge: 'Elai Saapaadu & Gala',
      icon: 'utensils',
    },
  ],

  // Photo gallery ("Floating Memories"). Add a title/caption to any photo if you like.
  // 5 beach + 5 earlier photos, no repeats, ordered so similar photos never sit together.
  // Photos live in public/images/gallery (grid copies in /thumbs).
  cloudMemories: [
    { id: 'beach-promise', image: '/images/gallery/beach-promise.webp', thumb: '/images/gallery/thumbs/beach-promise.webp', rotation: 0 },
    { id: 'old-wall-stand', image: '/images/gallery/old-wall-stand.webp', thumb: '/images/gallery/thumbs/old-wall-stand.webp', rotation: 0 },
    { id: 'beach-flowers', image: '/images/gallery/beach-flowers.webp', thumb: '/images/gallery/thumbs/beach-flowers.webp', rotation: 0 },
    { id: 'old-steps', image: '/images/gallery/old-steps.webp', thumb: '/images/gallery/thumbs/old-steps.webp', rotation: 0 },
    { id: 'beach-title', image: '/images/gallery/beach-title.webp', thumb: '/images/gallery/thumbs/beach-title.webp', rotation: 0 },
    { id: 'old-house', image: '/images/gallery/old-house.webp', thumb: '/images/gallery/thumbs/old-house.webp', rotation: 0 },
    { id: 'beach-lift', image: '/images/gallery/beach-lift.webp', thumb: '/images/gallery/thumbs/beach-lift.webp', rotation: 0 },
    { id: 'old-mandapam', image: '/images/gallery/old-mandapam.webp', thumb: '/images/gallery/thumbs/old-mandapam.webp', rotation: 0 },
    { id: 'beach-rocks', image: '/images/gallery/beach-rocks.webp', thumb: '/images/gallery/thumbs/beach-rocks.webp', rotation: 0 },
    { id: 'old-wall-sit', image: '/images/gallery/old-wall-sit.webp', thumb: '/images/gallery/thumbs/old-wall-sit.webp', rotation: 0 },
  ],

  // Gallery columns, planned per screen size as a checkerboard: beach and earlier photos
  // alternate, the two laterite-wall photos never touch, and photos with text are spread out.
  // If you add/remove a photo, any photo not listed here is added to the shortest column.
  galleryLayout: {
    phone: [
      ['beach-promise', 'old-steps', 'beach-title', 'old-wall-stand', 'beach-lift'],
      ['old-wall-sit', 'beach-rocks', 'old-house', 'beach-flowers', 'old-mandapam'],
    ],
    tablet: [
      ['beach-promise', 'old-wall-stand', 'beach-lift', 'old-mandapam'],
      ['old-steps', 'beach-flowers', 'old-house'],
      ['beach-rocks', 'old-wall-sit', 'beach-title'],
    ],
    desktop: [
      ['beach-promise', 'old-house'],
      ['old-wall-stand', 'beach-lift'],
      ['beach-flowers', 'old-mandapam'],
      ['old-steps', 'beach-rocks'],
      ['beach-title', 'old-wall-sit'],
    ],
  },

  dressCode: {
    title: 'A Note to Our Cherished Guests',
    subTitle: 'Attire & Auspicious Colors Guide',
    intro: 'We invite you to immerse yourself in the rich visual tapestry and timeless heritage of South Indian celebrations. To help you plan your attire, we have put together our favorite festive hues and cultural etiquette.',
    recommendedNote: 'South Indian weddings are a kaleidoscope of rich handloom silks, shimmering zari borders, and warm auspicious jewel tones. Feel free to shine in your finest traditional Kanjeevarams, Pattu pavadais, silk veshtis, or elegant festive kurtas.',
    avoidNote: 'Out of deference to traditional Vedic customs and elderly rituals, we kindly request our dear guests to avoid all-black or plain mourning shades during the morning religious ceremonies.',
    recommendedColors: [
      {
        name: 'Temple Gold',
        tamilName: 'Pon / Zari',
        hex: '#D4AF37',
        accent: '#9A7D18',
        description: 'Symbolizes divinity, prosperity, and auspicious light.',
      },
      {
        name: 'Royal Burgundy',
        tamilName: 'Kunkumam Red',
        hex: '#6B1724',
        accent: '#470912',
        description: 'The sacred hue of mangalsutra threads and kumkum.',
      },
      {
        name: 'Peacock Blue',
        tamilName: 'Mayil Kazhuthu',
        hex: '#0D4F8B',
        accent: '#062B4E',
        description: 'The shimmering double-shade of South Indian royal silks.',
      },
      {
        name: 'Mango Yellow',
        tamilName: 'Maanthulir & Manjal',
        hex: '#E5A93C',
        accent: '#A67319',
        description: 'Celebrates warmth, turmeric blessings, and sunrise optimism.',
      },
      {
        name: 'Rani Rose Pink',
        tamilName: 'Arali / Roja',
        hex: '#C23867',
        accent: '#831A3E',
        description: 'Joyful floral energy reminiscent of fresh temple garlands.',
      },
      {
        name: 'Forest Emerald',
        tamilName: 'Pachai / Kili Pachai',
        hex: '#1E5E4B',
        accent: '#0F382C',
        description: 'Symbol of fertility, nature, and eternal family growth.',
      },
    ],
    avoidColors: [
      {
        name: 'Strictly Pure Black',
        hex: '#111111',
        reason: 'Traditionally deemed inauspicious during sacred Vedic ceremonies and Muhurtham.',
      },
      {
        name: 'Plain Monochrome White',
        hex: '#EEEEEE',
        reason: 'Reserved for solemn rites; traditional off-white silks with rich golden zari borders are warmly welcomed!',
      },
    ],
    etiquetteTips: [
      'Traditional Footwear: Mandapam halls observe sacred sanctity; convenient footwear stations are arranged at the entrance.',
      'Blessing with Akshadai: During the Maangalya Dhaaranam (10:47 AM), please shower the couple with turmeric-infused rice grains (akshadai) distributed in baskets.',
      'Elai Saapaadu: A 24-dish traditional vegetarian feast served on fresh banana leaves awaits you right after the ceremony.',
    ],
  },

  venue: {
    name: "Bride's Residence",
    address: 'The home of Mr. Bhaskaran & Mrs. Sajini',
    city: '',
    mapUrl: 'https://maps.app.goo.gl/s36Ezw7MbK8CpmLK7',
    mapEmbedUrl: '',
  },

  images: {
    hero: '/images/hero_opening.jpg',
    coverPortrait: '/images/wedding_portrait.jpg',
    bride: '/images/couple_flowers.jpg',
    groom: '/images/couple_conversation.jpg',
    hands: '/images/hands_together.jpg',
    families: '/images/two_families.jpg',
  },

  music: {
    // Song file lives in public/audio/ (change this path to swap the song).
    // It starts at full volume when the guest taps the envelope seal.
    src: '/audio/bgm.mp3',
    title: 'Our Song',
    artist: 'Anaswara & Ashil',
  },
};

export default weddingData;
