import ListingHeader from '../ListingHeader/';
import React, { useState } from 'react';
import ListingRow from '../ListingRow';
import { Product } from '../../helpers/interface';
import { addProduct } from '../../features/addProduct';
import Modal from '../Modal/Modal';
import { Button } from 'react-bootstrap';

interface Props {
  TableHeader: string[];
  filterProducts: Product[];
  onResult: (product: Product[]) => void;
}

const Listing = ({ TableHeader, filterProducts, onResult }: Props): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [typeModal, setTypeModal] = useState<'add' | 'edit'>('add');
  const [defaultValue, setDefaultValue] = useState<Product | undefined>(undefined);
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

  return (
    <React.Fragment>
      <Button variant="primary" className="mb-3" onClick={handleAddProduct}>
        Add product
      </Button>
      <table className="table table-success table-borderless table-hover">
        <ListingHeader TableHeader={TableHeader} />
        <tbody>
          {filterProducts.map((item) => (
            <ListingRow
              key={item.id}
              name={item.name}
              price={item.price}
              brandName={item.brandName}
              onEditProduct={() => handleEditProduct(item)}
            />
          ))}
        </tbody>
      </table>
      <Modal
        isVisible={visible}
        onHide={() => setVisible(false)}
        type={typeModal}
        onResult={onResult}
        defaultValue={defaultValue}
        listProducts={filterProducts}
      />
    </React.Fragment>
  );
};

export default React.memo(Listing);
