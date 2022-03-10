import ListingHeader from '../ListingHeader/';
import React, { useEffect, useState } from 'react';
import ListingRow from '../ListingRow';
import { Brand, Product } from '../../helpers/interface';
import { addProduct } from '../../features/addProduct';
import Modal from '../Modal/Modal';
import { Button } from 'react-bootstrap';
import { BrandHeader } from '../../constants/table-header';
import { brands } from '../../constants/mock-data';
import ModalBrand from '../ModalBrand/ModalBrand';

interface Props {
  TableHeader: string[];
  filterProducts: Product[];
  onResult: (product: Product[]) => void;
}

const Listing = ({ TableHeader, filterProducts, onResult }: Props): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState<'add' | 'edit'>('add');
  const [defaultValue, setDefaultValue] = useState<Product | undefined>(undefined);
  const [isListProduct, setIsListProduct] = useState(false);
  const [listBrands, setListBrands] = useState(brands);
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    if (isListProduct) {
      setData(filterProducts);
    } else {
      setData(listBrands);
    }
  }, [isListProduct]);

  const handleAddProduct = () => {
    setVisible(true);
    setTypeModal('add');
    setDefaultValue(undefined);
  };

  const handleEditProduct = (item: Product) => {
    setVisible(true);
    setTypeModal('edit');
    setDefaultValue(item);
  };

  const handleChangeList = () => {
    setIsListProduct((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Button variant="primary" className="mb-3 mx-1" onClick={handleAddProduct}>
        {isListProduct ? ' Add product' : 'Add brand'}
      </Button>
      <Button variant="primary" className="mb-3 mx-1" onClick={handleChangeList}>
        Change List
      </Button>
      <table className="table table-success table-borderless table-hover">
        <ListingHeader TableHeader={!isListProduct ? BrandHeader : TableHeader} />
        <tbody>
          {data?.map((item) => (
            <ListingRow
              key={item.id}
              name={item.name}
              price={item.price}
              brandName={item.brandName ?? item.name}
              brandId={item.id}
              onEditProduct={() => handleEditProduct(item)}
              type={isListProduct ? 'product' : 'brand'}
            />
          ))}
        </tbody>
      </table>
      <Modal
        isVisible={isListProduct ? visible : false}
        onHide={() => setVisible(false)}
        type={typeModal}
        onResult={onResult}
        defaultValue={defaultValue}
        listProducts={filterProducts}
      />
      <ModalBrand
        isVisible={isListProduct ? false : visible}
        onHide={() => setVisible(false)}
        type={typeModal}
        listBrands={listBrands}
        onResult={(data) => setListBrands(data)}
      />
    </React.Fragment>
  );
};

export default React.memo(Listing);
