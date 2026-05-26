export interface CaseItem {
  id: string;
  title: string;
  location: string;
  area: string;
  style: string;
  description: string;
  cover: string;          // путь к обложке /portfolio/...
  gallery: string[];      // 3 фото для модалки
  plan: string;           // план / схема
}

export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  image: string;
  badge: string;
}

export interface DesignService {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

export interface RoadmapStep {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  project: string;
  area: string;
  quote: string;
  videoPlaceholder: string;
  rutubeUrl?: string;
  embedUrl?: string;
}

export interface TrendItem {
  id: string;
  title: string;
  description: string;
  image: string;
}
