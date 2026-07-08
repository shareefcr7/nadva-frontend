export type Discount = {
  amount: number;
  percentage: number;
};

export type SizeOption = {
  _id: string;
  size: string;
  stock: number;
  price?: number;
};

export type ProductVariant = {
  _id: string;
  color: string; // Used as Variant Name
  sizesArray: SizeOption[];
  price: number;
  stock: number;
  images: string[];
  isDefault: boolean;
  description?: string;
  duration?: string;
  capacity?: string;
  maxGuests?: string;
  roomType?: string;
  serviceType?: string;
};

export type Product = {
  id: number | string;
  title: string;
  category?: string;
  description?: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  variants?: ProductVariant[];
  amenities?: string[];
};
