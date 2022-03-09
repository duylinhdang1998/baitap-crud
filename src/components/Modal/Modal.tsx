import React, { useEffect, useState } from 'react';
import { Modal as ModalBootsrap, Button, Form, InputGroup } from 'react-bootstrap';
import { brands, products } from '../../constants/mock-data';
import { addProduct } from '../../features/addProduct';
import { editProduct } from '../../features/editProduct';
import { Product } from '../../helpers/interface';

export interface ModalProps {
  isVisible: boolean;
  onHide?: () => void;
  type: 'edit' | 'add';
  onResult: (result: Product[]) => void;
  defaultValue?: Product;
  listProducts?: Product[];
}

const defaultField = {
  name: '',
  price: 0,
  brandId: 1,
  id: undefined,
};

export default function Modal({
  isVisible = false,
  onHide,
  type = 'add',
  onResult,
  defaultValue,
  listProducts,
}: ModalProps) {
  const [validated, setValidated] = useState(false);
  const [valueForm, setValueForm] = useState<Product>(defaultField);

  useEffect(() => {
    if (!!defaultValue) {
      setValueForm(defaultValue);
    } else {
      setValueForm(defaultField);
    }
  }, [defaultValue]);

  const handleChangeBrandName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setValueForm((prev) => ({
      ...prev,
      brandId: parseInt(value),
    }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setValueForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (type === 'add') {
      const newProducts = !!listProducts
        ? addProduct(listProducts, { ...valueForm, id: listProducts.length + 1 })
        : [];
      onResult(newProducts);
      setValueForm(defaultField);
      onHide?.();
      return;
    } else {
      const newProducts = !!listProducts ? editProduct(listProducts, valueForm) : [];
      console.log({ newProducts });
      onResult(newProducts);
      onHide?.();
      return;
    }
    return;
  };

  return (
    <ModalBootsrap
      show={isVisible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <ModalBootsrap.Header closeButton>
        <ModalBootsrap.Title id="contained-modal-title-vcenter">
          {type === 'add' ? 'Add product' : 'Edit Product'}
        </ModalBootsrap.Title>
      </ModalBootsrap.Header>
      <ModalBootsrap.Body>
        <Form onSubmit={handleSubmit} validated={validated} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select brand</Form.Label>
            <Form.Select onChange={handleChangeBrandName} defaultValue={valueForm.brandId}>
              {brands.map((b) => (
                <option value={b.id} key={b.id}>
                  {b.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Product Name"
                aria-describedby="inputGroupPrepend"
                required
                onChange={handleChangeInput}
                name="name"
                value={valueForm.name}
              />
              <Form.Control.Feedback type="invalid">
                Please fill product name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="priceProduct">
            <Form.Label>Price</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                placeholder="Price"
                aria-describedby="inputGroupPrepend"
                required
                onChange={handleChangeInput}
                name="price"
                value={valueForm.price}
              />
              <Form.Control.Feedback type="invalid">Please fill price.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">
            {type === 'add' ? 'Add Product' : 'Edit Product'}
          </Button>
        </Form>
      </ModalBootsrap.Body>
    </ModalBootsrap>
  );
}
