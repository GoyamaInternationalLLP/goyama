export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  images?: ProductImage[];
  videos?: ProductVideo[];
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
}

export interface ProductVideo {
  id: string;
  productId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "USER" | "ADMIN";
}

export interface PaginationResponse<T> {
  products?: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
