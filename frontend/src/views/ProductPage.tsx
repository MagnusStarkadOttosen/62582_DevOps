import React, { useEffect } from "react";
//import { useParams, useNavigate, Navigate } from "react-router-dom";
//import { Product } from "../interface/products";
//import productsData from "../data/products.json"; // Import product data from JSON file
//import { useCart } from "../context/CartContext";
//
//interface ProductPageProps {
//  onQuantityChange: (id: number, quantity: number) => void;
//}
//
//const ProductPage: React.FC<ProductPageProps> = ({ onQuantityChange }) => { // Add onQuantityChange as a prop
//  const { id } = useParams<{ id: string }>(); // Get product ID from the URL
//  const product = productsData.products.find((p: Product) => p.id === parseInt(id || "0"));
//  const [quantity, setQuantity] = React.useState(1);
//  const { addToCart } = useCart();
//  const increaseQuantity = () => setQuantity((prev) => prev + 1);
//  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//
//  useEffect(() => {
//    if (product) {
//      onQuantityChange(product.id, quantity);
//    }
//  }, [quantity, product, onQuantityChange]);
//
//  const navigate = useNavigate();
//  //const context = useCart();
//
//  if (!product) {
//    return <div>Product not found</div>;
//  }
//
//  const handleAddToCart = () => {
//    console.log('before products added to cart');
//    addToCart(product, quantity);
//    console.log('after products added to cart');
//    navigate("/basket"); // Navigate to ShoppingBasketPage after adding to cart
//    console.log('after navigate to basket');
//  };
//
//  return (
//    <div
//      style={{
//        width: "100%",
//        display: "flex",
//        flexDirection: "column",
//        alignItems: "center",
//        justifyContent: "center",
//      }}>
//      <h1>{product.category} </h1>
//      <div>
//        <img src={product.thumbnail} alt={product.title} width="300" />
//        <div>
//          <h3>{product.brand}</h3>
//          <h2>{product.title}</h2>
//          <h3> Rating: {product.rating}</h3>
//          <h3> Size: {product.weight}</h3>
//          <h3> Price: {product.price}</h3>
//          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//            <div>
//              <button onClick={decreaseQuantity}>-</button>
//              <input
//                type="text"
//                value={quantity}
//                readOnly
//                style={{
//                  width: '40px',
//                  textAlign: 'center',
//                  border: '1px solid #ccc',
//                  margin: '0 5px'
//                }}
//              />
//              <button onClick={increaseQuantity}>+</button>
//            </div>
//            <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
//              onClick={handleAddToCart}>
//              Add to Cart
//            </button>
//          </div>
//        </div>
//      </div>
//      <p> Description: {product.description}</p>
//      <p>Warranty Information: {product.warrantyInformation}</p>
//    </div>
//  );
//};
//
//export default ProductPage;
