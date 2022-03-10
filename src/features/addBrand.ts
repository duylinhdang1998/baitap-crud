import { Brand } from '../helpers/interface';

export const addBrand = (listBrands: Brand[], data: Brand) => {
  return [...listBrands, data];
};
