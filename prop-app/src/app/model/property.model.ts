
export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  address: string;
  garages: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  features: string[];
  images: string[];
  videoUrl?: string;
  pdfUrl?: string;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  ref?: string;
  type?: string;
}