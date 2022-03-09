import React from 'react';
import { Button } from 'react-bootstrap';
import { ListProductsProps } from '../../helpers/interface';

const ListingRow = ({ name, brandName, price, onEditProduct }: ListProductsProps) => {
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
};

export default React.memo(ListingRow);
