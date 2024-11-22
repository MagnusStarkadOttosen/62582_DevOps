import React from "react";
import { useCart } from "../context/CartContext";
import { Table } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import "../styles/ShoppingBasket.css";
interface ShoppingBasketPageProps {
  onQuantityChange: (productId: number, quantity: number) => void;

}
const ShoppingBasketPage: React.FC<ShoppingBasketPageProps> = ({onQuantityChange}) => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Assuming removeItem is a function in CartContext
  const navigate = useNavigate();
  // Calculate the subtotal for all items in the cart
  const subTotal = cart.reduce((acc, { product, quantity }) => {
    // Calculate the total for each product considering discount
    const totalBeforeDiscount = product.price * quantity;
    const discount = product.discountPercentage
      ? (totalBeforeDiscount * product.discountPercentage) / 100
      : 0;
    const totalForProduct = totalBeforeDiscount - discount;
    return acc + totalForProduct;
  }, 0);
  const handleBack = () => {
    navigate("/");
  };
  const handlePay = () => {
    navigate("/payment");
  };
  return (
    <div className="shopping-cart-container">
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table className="shopping-cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const totalBeforeDiscount = item.product.price * item.quantity;
                const discount = item.product.discountPercentage
                  ? (totalBeforeDiscount * item.product.discountPercentage) / 100
                  : 0;
                const totalForProduct = totalBeforeDiscount - discount;

                return (
                  <tr key={item.product.id}>
                    <td>
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="product-thumbnail"
                      />
                    </td>
                    <td>{item.product.title}</td>
                    <td>${item.product.price.toFixed(2)}</td>
                    <td >
                      <div  className="quantity-controls">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="quantity-input"
                        />
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>${totalForProduct.toFixed(2)}</td>
                    <td>
                      <button onClick={() => removeFromCart(item.product.id)}>🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h2 >Total: ${subTotal.toFixed(2)}</h2>
        </>
      )}

      <div className="cart-actions">
        <button className="back-button" type="button" onClick={handleBack}>
          Shop more
        </button>
        <button className="checkout-button" type="submit" onClick={handlePay}>
          Go to checkout
        </button>
      </div>
    </div>
  );
};


export default ShoppingBasketPage;