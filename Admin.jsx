import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const Admin = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productPrice: "",
    totalItems: "",
    categoryId: "",
  });

  // Fetch data
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    API.get("/products").then(res => setProducts(res.data));
  };

  const fetchCategories = () => {
    API.get("/categories").then(res => setCategories(res.data));
  };

  const getCategoryName = (id) => {
    const category = categories.find(c => c.categoryId === id);
    return category ? category.categoryName : "";
  };

  // Handle form input
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      productName: newProduct.productName,
      productPrice: parseFloat(newProduct.productPrice),
      totalItems: parseInt(newProduct.totalItems),
      category: { categoryId: parseInt(newProduct.categoryId) },
    };

    if (editingProductId) {
      await API.put(`/products/${editingProductId}`, payload);
      setEditingProductId(null);
    } else {
      await API.post("/products", payload);
    }

    setNewProduct({ productName: "", productPrice: "", totalItems: "", categoryId: "" });
    setFormVisible(false);
    fetchProducts();
  };

  // Edit product
  const handleEdit = (product) => {
    setNewProduct({
      productName: product.productName,
      productPrice: product.productPrice,
      totalItems: product.totalItems,
      categoryId: product.category?.categoryId || "",
    });
    setEditingProductId(product.productId);
    setFormVisible(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: "20px" }}>
        <h2>Admin Panel</h2>

        {/* Add Product Button */}

        <button
  onClick={() => {
    setFormVisible(!formVisible);
    setNewProduct({ productName: "", productPrice: "", totalItems: "", categoryId: "" });
    setEditingProductId(null);
  }}
  style={{
    backgroundColor: "#004ff8f8",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    marginBottom: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "0.2s"
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1e40af"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
>
  {formVisible ? "✖ Close Form" : "+ Add Product"}
</button>
      {/* Add/Edit Form */}
        {formVisible && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
              flexWrap: "wrap"
            }}
          >
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={newProduct.productName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="productPrice"
              placeholder="Price"
              value={newProduct.productPrice}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="totalItems"
              placeholder="Stock"
              value={newProduct.totalItems}
              onChange={handleChange}
              required
            />
            <select
              name="categoryId"
              value={newProduct.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            <button
              type="submit"
              style={{
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px"
              }}
            >
              {editingProductId ? "Update Product" : "Add Product"}
            </button>
          </form>
        )}

        {/* Product List */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <thead style={{ backgroundColor: "#3b82f6", color: "white" }}>
              <tr>
                <th style={{ padding: "10px" }}>ID</th>
                <th style={{ padding: "10px" }}>Product Name</th>
                <th style={{ padding: "10px" }}>Category</th>
                <th style={{ padding: "10px" }}>Price</th>
                <th style={{ padding: "10px" }}>Stock</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr
                  key={p.productId}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#f3f4f6" : "#ffffff",
                    transition: "0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dbeafe")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? "#f3f4f6" : "#ffffff")
                  }
                >
                  <td style={{ padding: "10px" }}>{p.productId}</td>
                  <td style={{ padding: "10px" }}>{p.productName}</td>
                  <td style={{ padding: "10px" }}>
                    {p.category?.categoryName || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>₹{p.productPrice}</td>
                  <td style={{ padding: "10px" }}>{p.totalItems}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(p)}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        padding: "5px 8px",
                        borderRadius: "3px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.productId)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 8px",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  
  <button
  onClick={() => navigate("/dashboard")}
  
  style={{
    padding: "8px 15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight:"bold"
  }}
>
  ← Back to Dashboard
</button>

      </div>
    </div>



  );
};

export default Admin;
