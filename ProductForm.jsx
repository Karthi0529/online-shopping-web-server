import React, { useState, useEffect } from "react";
import API from "../api";

const ProductForm = ({ productToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  // Pre-fill data if editing
  useEffect(() => {
    if (productToEdit) setFormData(productToEdit);
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        // Update
        await API.put(`/products/${productToEdit.id}`, formData);
      } else {
        // Add new
        await API.post("/products", formData);
      }
      onSave(); // reload list
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="product-form">
      <h3>{productToEdit ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{productToEdit ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductForm;
