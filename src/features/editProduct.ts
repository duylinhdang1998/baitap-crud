import { products } from '../constants/mock-data';
import { Product } from '../helpers/interface';

export const editProduct = (listProducts: Product[], product: Product) => {
  const newProducts = listProducts.map((i) => {
    if (i.id === product.id) {
      return product;
    } else return i;
  });
  return newProducts;
};
