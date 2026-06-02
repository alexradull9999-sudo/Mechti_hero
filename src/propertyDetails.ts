import detailsData from './propertyDetails.json';

export interface DetailedInfo {
  id: string;
  code: string;
  description: string;
  images: string[];
}

export const propertyDetailsMap = detailsData as unknown as Record<string, DetailedInfo>;
