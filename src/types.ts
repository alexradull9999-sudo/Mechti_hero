export interface CaseItem {
  id: string;
  title: string;
  location: string;
  area: string;
  style: string;
  description: string;
  cover: string;          // путь к обложке /portfolio/...
  videoLoop?: string;     // 10-30 сек короткое видео для карточки (autoplay loop)
  videoFull?: string;     // ~60 сек полный обзор для модалки
  gallery: string[];      // 3 фото для модалки
  plan: string;           // план / схема
  hidden?: boolean;       // временно скрыть проект
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
  youtubeUrl?: string;
}

export interface TrendItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CatalogObject {
  id: string;
  title: string;
  complex: string;
  area_m2: number;
  floor: string;
  price_rub: number;
  city: string;
  url: string;
  rooms: number;
  type?: "house";
  image?: string;  // ← новое поле: полный URL фотографии. Если нет — рисуем градиент
}
