import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {CartProvider } from '../context/CartContext'; // Assuming CartProvider wraps the context
import ShoppingBasketPage from '../views/ShoppingBasketPage';
import { NonNullExpression } from 'typescript';
import{waitFor} from '@testing-library/dom';

const mockCart = [
  {
    product: {
      id: 1,
      title: "Test Product 1",
      price: 100,
      discountPercentage: 10,
      thumbnail: "/test-image1.jpg",
    },
    quantity: 2,
  },
  {
    product: {
      id: 2,
      title: "Test Product 2",
      price: 200,
      discountPercentage: 5,
      thumbnail: "/test-image2.jpg",
    },
    quantity: 1,
  }
];
beforeEach(() => {
  jest.spyOn(require('../context/CartContext'), 'useCart').mockImplementation(()=>({
    cart: mockCart,
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
  }));
});

const renderComponent = () =>
  render(
    <CartProvider>
      <BrowserRouter>
        <ShoppingBasketPage onQuantityChange={jest.fn()} />
      </BrowserRouter>
    </CartProvider>
  );

describe('ShoppingBasketPage', () => {
  it('should display empty cart message when there are no items', () => {
    jest.spyOn(require('../context/CartContext'), 'useCart').mockImplementation(()=>({
        cart: [],
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
      }));
  
  
    renderComponent();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('should display cart items when there are products in the cart', () => {
    renderComponent();

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();

    expect(screen.findByText((content,node)=>{
      if(!node) return false;
      const hasTest =(node: HTMLElement)=>node.textContent?.includes('$90.00')??false;
      const nodeHasText = hasTest(node as HTMLElement);
      const childrenDontHaveText = Array.from(node.children).every(child=>!hasTest(child as HTMLElement));
      return nodeHasText && childrenDontHaveText;
    })).resolves.toBeInTheDocument();  
  });

  it('should allow updating the quantity of products', async() => {
    renderComponent();

    const incrementButton = screen.getAllByText('+')[0];
    fireEvent.click(incrementButton);
    waitFor(()=>{
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();  // Quantity should update
    });
  });

  beforeEach(()=>{
    const mockRemoveFromCart = jest.fn();
    jest.spyOn(require('../context/CartContext'), 'useCart').mockImplementation(()=>({
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: jest.fn(),
    }));
  });
  it('should allow removing an item from the cart', () => {
    renderComponent();

    const deleteButton = screen.getAllByText('🗑️')[0];
    fireEvent.click(deleteButton);

    // You should mock `removeFromCart` function to check if it's called
    const{removeFromCart}=require('../context/CartContext').useCart();
    expect(removeFromCart).toHaveBeenCalledTimes(1);
  });

  it('should navigate to the homepage when "Shop more" is clicked', () => {
    const { getByText } = renderComponent();

    const backButton = getByText(/shop more/i);
    fireEvent.click(backButton);

    // Mock useNavigate and verify it was called with correct arguments
    expect(window.location.pathname).toBe('/');
  });

  it('should navigate to the payment page when "Go to checkout" is clicked', () => {
    const { getByText } = renderComponent();

    const checkoutButton = getByText(/go to checkout/i);
    fireEvent.click(checkoutButton);

    // Mock useNavigate and verify it was called with correct arguments
    expect(window.location.pathname).toBe('/payment');
  });
});
