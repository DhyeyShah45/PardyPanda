import React from "react";
import { useUserContext } from "../context/userContext";

const ProductDetails = ({ product, onEdit, onDelete }) => {
  const { role } = useUserContext();

  return (
    <>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>
          <strong>Type:</strong> {product.type}
        </p>
        <p>
          <strong>Added By:</strong> {product.addedBy}
        </p>
        <p>
          <strong>Quantity:</strong> {product.qty}
        </p>
        <p>
          <strong>Price:</strong> ${product.price.toFixed(2)}
        </p>
        <p>
          {(role === 1 || role === 2) && (
            <button onClick={() => onEdit(product)}>Edit Product</button>
          )}
          {role === 1 && (
            <button onClick={() => onDelete(product)}>Delete</button>
          )}
        </p>
        <img src={product.photo} alt={product.name} />
      </div>
    </>
  );
};

export default ProductDetails;
