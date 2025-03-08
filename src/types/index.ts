// src/types/index.ts


export interface Contractor {
  title: string;
  link: string;
  website: string;
  stars: number;
  reviews: number;
  phone: string;
  address: string;
  city: string;
  state: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
  category: string;
  photo_url: string;
  updated_image: string;
  image_downloaded: boolean;
  unique_id: string;
  geohash: string;
  neighbors: string[];
  local_image_path?: string; // New field for local image path
  featured?: boolean; // New field to mark a contractor as featured
  reviewers?: Reviewer[]; // New field for reviews
}

export interface Reviewer {
  reviewer_name: string;
  review_text: string;
}

export type FenceContractor = Contractor;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
}

export interface LocationData {
  states: string[];
  citiesByState: Record<string, string[]>;
  contractors: Contractor[];
}

export interface SearchFilters {
  query: string;
  state?: string;
  city?: string;
}
