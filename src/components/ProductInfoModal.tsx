import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductModalProps {
  show: boolean;
  handleClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} style={{ width: '100%', maxWidth: '300px' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
