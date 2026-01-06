import { createContext, useState, useEffect } from "react";
import { getProduct, addProduct, updateProduct, deleteProduct } from "../services/productService";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await getProduct();
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewProduct = async (productData) => {
    const res = await addProduct(productData);
    setProducts((prev) => [res.data, ...prev]);
  };

  const updateExistingProduct = async (id, productData) => {
    const res = await updateProduct(id, productData);
    setProducts((prev) => prev.map(p => p._id === id ? res.data : p));
  };

  const deleteExistingProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter(p => p._id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      fetchProducts,
      addNewProduct,
      updateExistingProduct,
      deleteExistingProduct,
      setProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
