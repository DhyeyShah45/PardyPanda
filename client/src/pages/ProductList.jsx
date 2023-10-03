import { useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductDetails from "../components/ProductDetails";
import { useUserContext } from "../context/userContext";
import useFetch from "../hooks/useFetch";

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { role, token, user } = useUserContext();
  const { data, error, isLoading, getData } = useFetch(
    `${process.env.REACT_APP_URL}/products`
  );

  const handleEditProduct = (product) => {
    // console.log(product);
    setSelectedProduct(product); // Set the selected product for editing
  };

  const handleAddNewProduct = async (product) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/add/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ ...product, addedBy: user.email }),
      });
      const data = await response.json();
      console.log(data);
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveProduct = async (updatedProduct) => {
    // console.log("Saved/Updated Product:", updatedProduct);
    setSelectedProduct(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/product/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ ...updatedProduct, addedBy: user.email }),
        }
      );
      const data = await response.json();
      console.log(data);
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDelete = async (product) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/product/${product._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {!isLoading && (
        <>
          <div
            style={{
              display: "flex",
              gap: "20px",
              margin: "20px",
              flexWrap: "wrap",
            }}
          >
            {error && <p>{error}</p>}
            {data.map((product, index) => (
              <ProductDetails
                key={index}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {role === 1 && <strong> Total Products : {data.length}</strong>}
          {role === 1 || role === 2 ? (
            <>
              <h1>Add a new Product</h1>
              <AddProduct
                editProduct={selectedProduct}
                onSaveProduct={handleSaveProduct}
                onAddProduct={handleAddNewProduct}
              />
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
