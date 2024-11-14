// Some of the components in this file have been made with the help of AI
import React, { useState } from 'react';
import { Product } from '../interface/products'; // Assuming you have this interface
import '../styles/productPage.css';
import { useCart } from "../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";


interface ProductPage1Props {
    products: Product[];
}

const ProductPage1: React.FC<ProductPage1Props> = ({ products }) => {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();


    const product = products.find((prod) => prod.id === parseInt(id || '0'));

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(event.target.value));
    };
    const handleAddToCart = () => {
        console.log('before products added to cart');
        addToCart(product, quantity);
        console.log('after products added to cart');
        navigate("/basket"); // Navigate to ShoppingBasketPage after adding to cart
        console.log('after navigate to basket');
    };

    return (
        <div className="product-page">
            <div className="product-container">
                {/* Product image */}
                <div className="product-image">
                    <img src={product.thumbnail} alt={product.title} />
                </div>

                {/* Product details */}
                <div className="product-details">
                    <h1>{product.title}</h1>
                    <p className="product-description">{product.description}</p>

                    <div className="product-purchase">
                        <div className="product-price">
                            <span>{product.price},-</span>
                        </div>

                        <div className="product-quantity">
                            <label htmlFor="quantity">Antal:</label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                            >
                                {Array.from(Array(10).keys()).map((number) => (
                                    <option key={number + 1} value={number + 1}>
                                        {number + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="add-to-cart" onClick={handleAddToCart}>Læg i Kurv</button>
                        <p>På lager online (10+)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage1;
