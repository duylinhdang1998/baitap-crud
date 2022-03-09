import { Product, Brand } from "../helpers/interface";

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 6',
    price: 300,
    brandId: 1,
  },
  {
    id: 2,
    name: 'iPhone galaxy',
    price: 300,
    brandId: 2,
  },
  {
    id: 3,
    name: 'Oppo A75',
    price: 200,
    brandId: 3,
  },
];

export const brands: Brand[] = [
  {
    id: 1,
    name: 'Apple',
  },
  {
    id: 2,
    name: 'Samsung',
  },
  {
    id: 3,
    name: 'Oppo',
  },
];
