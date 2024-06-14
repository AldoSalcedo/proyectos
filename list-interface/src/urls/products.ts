import { request } from "../lib/network";

export const getProducts = (): Promise<any> => request({
  url: '/products',
  method: 'GET',
});