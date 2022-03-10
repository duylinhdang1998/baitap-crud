import { Brand } from '../helpers/interface';

export const editBrand = (listBrands: Brand[], brand: Brand) => {
  const newBrands = listBrands.map((i) => {
    if (i.id === brand.id) {
      return brand;
    } else return i;
  });
  return newBrands;
};
