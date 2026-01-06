import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getProduct, addProduct, updateProduct, deleteProduct } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    setLoading(true);
    const res = await getProduct(); // fetch all products
    const userProducts = res.data.filter(p => p.userId === user._id);
    setProducts(userProducts);
    setLoading(false);
  } catch (err) {
    console.error(err);
  }
};

  const handleAddOrUpdate = async (e) => {
  e.preventDefault();
  try {
    const productData = { ...formData, userId: user._id }; 
    if (editId) {
      await updateProduct(editId, productData);
    } else {
      await addProduct(productData);
    }
    fetchProducts();
    setFormOpen(false);
    setFormData({ name: "", category: "", description: "", price: "", image: "" });
    setEditId(null);
  } catch (err) {
    console.error(err);
  }
};


  const handleEdit = (product) => {
    setFormOpen(true);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-sm md:text-2xl font-semibold text-gray-800">
            Welcome, {user?.name}
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setFormOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white md:px-4 md:py-2 rounded-full cursor-pointer md:font-medium shadow-md transition text-sm md:text-md"
          >
            Add Product
          </button>
          <button
            onClick={logoutUser}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 md:py-2 rounded-full border-3 border-purple-500 cursor-pointer md:font-medium shadow-md text-sm md:text-md transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
{formOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
    <form
      onSubmit={handleAddOrUpdate}
      className="bg-linear-br from-white/20 via-white/10 to-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 relative"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white col-span-2 text-center mb-4">
        {editId ? "Update Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border border-white/30 bg-white/10 rounded-xl px-4 py-3 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="border border-white/30 bg-white/10 rounded-xl px-4 py-3 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="border border-white/30 bg-white/10 rounded-xl px-4 py-3 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="border border-white/30 bg-white/10 rounded-xl px-4 py-3 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border border-white/30 bg-white/10 rounded-xl px-4 py-3 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner md:col-span-2 resize-none"
        required
      />

      <div className="md:col-span-2 flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={() => { setFormOpen(false); setEditId(null); }}
          className="px-6 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 transition font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg transition"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <button
        type="button"
        onClick={() => { setFormOpen(false); setEditId(null); }}
        className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500 transition"
      >
        &times;
      </button>
    </form>
  </div>
)}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg--to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
