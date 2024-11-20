// Some of the components in this file have been made with the help of AI
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/views/HomePage"; // Import your HomePage component
// import ProductPage from "../src/views/ProductPage"; // Import ProductPage component
import PaymentPage from "../src/views/PaymentPage"; // Import PaymentPage component
// import productsData from "./data/products.json"; // Import the products JSON file
import ShoppingBasketPage from "./views/ShoppingBasketPage";
import ReceiptPage from "../src/views/ReceiptPage";
import { CartProvider } from "./context/CartContext";
import ProductPage1 from "../src/views/ProductPage1";
import NavigationBar from "./components/navigation_bar";

const App: React.FC = () => {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // // Handler function for quantity change
  const handleQuantityChange = (productId: number, quantity: number) => {
    console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
    // Add your logic to handle quantity change, e.g., update the cart
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
    fetch(`${apiUrl}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("API Response:", response); // Log response
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Products:", data); // Log fetched data
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/product/:id" element={<ProductPage1 products={products} />} />
          <Route path="/basket" element={<ShoppingBasketPage onQuantityChange={handleQuantityChange}/>} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
