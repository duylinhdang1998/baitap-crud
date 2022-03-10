import React, { useState } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';
import { addBrand } from '../../features/addBrand';
import { Brand } from '../../helpers/interface';

export interface ModalBrandProps {
  isVisible: boolean;
  onHide?: () => void;
  type: 'add' | 'edit';
  listBrands: Brand[];
  onResult: (brands: Brand[]) => void;
}

export default function ModalBrand({
  isVisible,
  onHide,
  type,
  listBrands,
  onResult,
}: ModalBrandProps) {
  const [validated, setValidated] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (type === 'add') {
      const newBrands = addBrand(listBrands, { id: listBrands.length + 1, name: value });
      onResult(newBrands);
      onHide?.();
      return;
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <Modal
      show={isVisible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {type === 'add' ? 'Add brand' : 'Edit brand'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} validated={validated} noValidate>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Brand Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Brand Name"
                aria-describedby="inputGroupPrepend"
                required
                onChange={handleChangeInput}
                name="name"
                value={value}
              />
              <Form.Control.Feedback type="invalid">Please fill brand name.</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">
            {type === 'add' ? 'Add Brand' : 'Edit Brand'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
