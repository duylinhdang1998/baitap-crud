import { Product } from '../helpers/interface';

export const addProduct = (listProducts: Product[], data: Product) => {
  return [...listProducts, data];
};
