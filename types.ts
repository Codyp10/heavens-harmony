export interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  event: string;
}

export interface NavItem {
  label: string;
  href: string;
}
