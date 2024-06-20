import { request } from "../lib/network";

export const getProducts = (): Promise<any> => request({
  url: '/products',
  method: 'GET',
});

export const getSingleProduct = (id: number) => request({
  url: `/products/${id}`,
  method: 'GET',
})

export const getAllCategories = () => request({
  url: '/products/categories',
  method: 'GET',
})

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number, count: number }
}