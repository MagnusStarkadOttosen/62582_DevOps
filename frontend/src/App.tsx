// Some of the components in this file have been made with the help of AI
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/views/HomePage"; // Import your HomePage component
// import ProductPage from "../src/views/ProductPage"; // Import ProductPage component
import PaymentPage from "../src/views/PaymentPage"; // Import PaymentPage component
import productsData from "./data/products.json"; // Import the products JSON file
import ShoppingBasketPage from "./views/ShoppingBasketPage";
import ReceiptPage from "../src/views/ReceiptPage";
import { HomePageProvider } from "../src/context/HomePageContext";
import { CartProvider } from "./context/CartContext";
import ProductPage1 from "../src/views/ProductPage1";
import NavigationBar from "./components/navigation_bar";

const App: React.FC = () => {
  // Handler function for quantity change
  const handleQuantityChange = (productId: number, quantity: number) => {
    console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
    // Add your logic to handle quantity change, e.g., update the cart
  };

  return (
    //<HomePageProvider>
    <CartProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={<HomePage products={productsData.products} />}
          />
          <Route path="/payment" element={<PaymentPage />} />
          {/* {<Route path="/product/:id" element={<ProductPage1 onQuantityChange={handleQuantityChange}/>} /> Pass the handler */}
          <Route
            path="/product/:id"
            element={<ProductPage1 products={productsData.products} />}
          />
          <Route
            path="/basket"
            element={
              <ShoppingBasketPage onQuantityChange={handleQuantityChange} />
            }
          />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>

    //</HomePageProvider>
  );
};

export default App;
