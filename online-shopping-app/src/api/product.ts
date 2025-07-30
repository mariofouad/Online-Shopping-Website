import { apiClient } from './client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  sizes?: string[];
  colors?: string[];
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export const productsApi = {
  getAll: async (filters?: ProductFilters) => {
    console.log('Fetching products with filters:', filters);
    const response = await apiClient.get<Product[]>('/products', { params: filters });
    console.log('Fetched products:', response.data);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
  
  // getFeatured: async () => {
  //   const response = await apiClient.get<Product[]>('/products/featured');
  //   return response.data;
  // },

  // getByCategory: async (category: string) => {
  //   const response = await apiClient.get<Product[]>(`/products/category/${category}`);
  //   return response.data;
  // },
  
  // create: async (product: Omit<Product, 'id'>) => {
  //   const response = await apiClient.post<Product>('/products', product);
  //   return response.data;
  // },

  // update: async (id: string, product: Partial<Product>) => {
  //   const response = await apiClient.put<Product>(`/products/${id}`, product);
  //   return response.data;
  // },

  // delete: async (id: string) => {
  //   await apiClient.delete(`/products/${id}`);
  // }
};