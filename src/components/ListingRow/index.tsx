import React from 'react';
import { Button } from 'react-bootstrap';
import { ListProductsProps } from '../../helpers/interface';

const ListingRow = ({
  name,
  brandName,
  price,
  onEditProduct,
  brandId,
  type = 'product',
}: ListProductsProps) => {
  if (type === 'product') {
    return (
      <tr className="list-order">
        <td className="fw-bold col-4" scope="row">
          {brandName}
        </td>
        <td className="col-2">{name}</td>
        <td className="col-2">{price + ' $'}</td>
        <td className="col-2">
          <Button variant="danger" className="mx-1" onClick={onEditProduct}>
            Edit Product
          </Button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{brandId}</td>
        <td>{brandName}</td>
        <td>
          <Button variant="danger" className="mx-1" onClick={() => {}}>
            Edit Brand
          </Button>
        </td>
      </tr>
    );
  }
};

export default React.memo(ListingRow);
