import { Member, Testimonial, NavItem } from './types';

// ==============================================
// SITE IMAGES
// ==============================================

// Hero Background (Desktop)
// Place an image named 'hero.jpg' in your 'public' folder
export const HERO_IMAGE_URL = "/hero.jpg"; 

// Hero Background (Mobile)
// Mobile-specific hero image URL
export const HERO_MOBILE_IMAGE_URL = "https://ik.imagekit.io/gnubc5ud3/mobilehero.png";

// About Section Image (The choir singing image)
export const ABOUT_IMAGE_URL = "https://ik.imagekit.io/gnubc5ud3/IMG_0698.JPG";

// ==============================================
// NAVIGATION
// ==============================================

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'The Group', href: '#members' },
  { label: 'Contact', href: '#contact' },
];

// ==============================================
// MEMBERS
// ==============================================

export const MEMBERS: Member[] = [
  // President
  { 
    id: 2, 
    name: "Mario", 
    role: "President / Tenor", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/mario.png" 
  },
  { 
    id: 1, 
    name: "Cody", 
    role: "Bass", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/cody.png" 
  },

  // Tenors
  { 
    id: 3, 
    name: "Caleb", 
    role: "Tenor", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/calebf.png" 
  },
  { 
    id: 13, 
    name: "Zyon", 
    role: "Tenor", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/Zyon.png" 
  },

  // Basses
  { 
    id: 4, 
    name: "Caleb", 
    role: "Bass", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/calebh.png" 
  },

  // Pianist
  { 
    id: 14, 
    name: "Nathanael", 
    role: "Pianist", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/Nathanael.png" 
  },

  // Sopranos
  { 
    id: 5, 
    name: "Micayla", 
    role: "Soprano", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/micayla.png" 
  },

  // Altos
  { 
    id: 9, 
    name: "Angelina", 
    role: "Alto", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/angelina.png" 
  },
  { 
    id: 12, 
    name: "Caralina", 
    role: "Alto", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/caralina.png" 
  },

  // Members pending photos (moved to end)
  { 
    id: 8, 
    name: "Kabrina", 
    role: "Soprano", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/kabrina.png" 
  },
  { 
    id: 10, 
    name: "Ilana", 
    role: "Alto", 
    image: "https://ik.imagekit.io/gnubc5ud3/HH%20-%20Headshots/Illana.png" 
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, text: "Their harmonies brought tears to my eyes. Absolutely stunning performance.", author: "Martha S.", event: "Winter Gala 2023" },
  { id: 2, text: "Professional, punctual, and purely magical. They made our wedding ceremony unforgettable.", author: "James & Lily", event: "Wedding Ceremony" },
  { id: 3, text: "The perfect blend of voices. Heavens Harmony is truly world-class.", author: "Rev. Thomas", event: "Easter Service" },
];

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/heavens.harmony_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  facebook: "https://www.facebook.com/heavensharmonygroup",
  youtube: "https://www.youtube.com/@heavensharmonygroup"
};
