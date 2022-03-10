export interface Product {
  id?: number;
  name: string;
  price: number;
  brandId?: number;
  brandName?: string;
}

export interface ListProductsProps extends Product {
  onEditProduct?: () => void;
  type?: 'product' | 'brand';
}

export interface Brand {
  id?: number;
  name: string;
}
