export interface Slide {
  id: number;
  bg: string;
  title: string;
  subtitle?: string;
  text: string;
}

export interface PricingPlan {
  id: number;
  title: string;
  price: string;
  features: string[];
  icon: 'calc' | 'chart' | 'sand';
}

export interface GalleryItem {
  id: number;
  src: string;
  full: string;
  title: string;
  location: string;
  size: 'small' | 'tall' | 'wide' | 'big';
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  image: string;
  align: 'left' | 'right';
}

export interface Contacts {
  phone1: string;
  phone1Href: string;
  phone2: string;
  phone2Href: string;
  email: string;
  city: string;
  address: string;
  inn: string;
  owner: string;
  hours: string;
}
