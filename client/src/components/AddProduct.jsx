import React, { useEffect, useState } from "react";

const AddProduct = ({ editProduct, onSaveProduct, onAddProduct }) => {
  const [product, setProduct] = useState(
    editProduct || {
      name: "",
      type: "",
      qty: 0,
      price: 0,
      photo: "",
    }
  );

  useEffect(() => {
    setProduct(
      editProduct || {
        name: "",
        type: "",
        qty: 0,
        price: 0,
        photo: "",
      }
    );
  }, [editProduct]);
  // console.log(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProduct(product);
    setProduct({
      name: "",
      type: "",
      qty: 0,
      price: 0,
      photo: "",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({
      name: "",
      type: "",
      qty: 0,
      price: 0,
      photo: "",
    });
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          fontSize: "1.5rem",
          margin: "auto",
          // minWidth: "200px",
          maxWidth: "60%",
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={product.type}
          onChange={handleChange}
        />

        <label htmlFor="qty">Quantity:</label>
        <input
          type="number"
          id="qty"
          name="qty"
          value={product.qty}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          value={product.price}
          onChange={handleChange}
        />

        <label htmlFor="photo">Photo URL:</label>
        <input
          type="text"
          id="photo"
          name="photo"
          value={product.photo}
          onChange={handleChange}
        />
        {editProduct ? (
          <button type="submit" onClick={handleSubmit}>
            Edit Product
          </button>
        ) : (
          <button type="submit" onClick={handleAdd}>
            Add Product
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
