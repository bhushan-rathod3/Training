import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  fetchProductsByCategory: (category: string) => void;
  refetchProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      return response.data;
    },
  });

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const endpoint =
        selectedCategory === ""
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${selectedCategory}`;
      const response = await axios.get(endpoint);
      return response.data;
    },
    staleTime: 0,
  });

  const fetchProductsByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        fetchProductsByCategory,
        refetchProducts: refetch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
