import { useState } from "react";
import axios from "axios";
import { useProduct } from "../context/ProductContext";

interface Product {
  id: number;
  title: string;
  price: number | string;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

function AdminDashboard() {
  const { products, categories, refetchProducts } = useProduct();
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: { rate: 0, count: 0 },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleAddProduct = () => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.image ||
      !newProduct.description
    ) {
      alert("All fields are required!");
      return;
    }

    axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then(() => {
        alert("Product added successfully!");
        setNewProduct({
          id: 0,
          title: "",
          price: "",
          category: "",
          image: "",
          description: "",
          rating: { rate: 0, count: 0 },
        });
        refetchProducts(); // ✅ Refresh the product list
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`https://fakestoreapi.com/products/${id}`)
        .then(() => {
          alert("Product deleted successfully!");
          refetchProducts(); // ✅ Refresh product list
        })
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newProduct.title}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={newProduct.price}
        onChange={handleChange}
      />
      <select
        name="category"
        value={newProduct.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {categories.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={newProduct.image}
        onChange={handleChange}
      />
      <textarea
        placeholder="Description"
        name="description"
        value={newProduct.description}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleAddProduct}>Add Product</button>

      <h2>Existing Products</h2>
      {products.map((product: Product) => (
        <div
          key={product.id}
          style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <p>{product.title}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleDeleteProduct(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
