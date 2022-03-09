import React, { useMemo, useState } from 'react';
import { brands, products } from '../../constants/mock-data';
import { Product } from '../../helpers/interface';
import Listing from '../Listing';

interface Props {
  TableHeader: string[];
}

const Layout = ({ TableHeader }: Props): JSX.Element => {
  const [listBrands, setBrands] = useState(brands);
  const [listProducts, setProducts] = useState(products);

  const filterProducts = useMemo(() => {
    return listProducts.map((data) => {
      const mappedBrand = listBrands.find((item) => item.id === data.brandId);
      return {
        ...data,
        brandName: mappedBrand?.name,
      };
    });
  }, [listProducts]);

  const handleResult = (newProduct: Product[]) => {
    setProducts(newProduct);
  };

  return (
    <div className="layout-page">
      <h1 className="text-center py-4">List Product Brand</h1>
      <Listing TableHeader={TableHeader} filterProducts={filterProducts} onResult={handleResult} />
    </div>
  );
};

export default React.memo(Layout);
