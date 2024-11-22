// Some of the components in this file have been made with the help of AI
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "../interface/products";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/HomePage.css";
import { FaShoppingCart } from 'react-icons/fa';

interface HomePageProps {
    products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
    console.log("HomePage received products:", products);
    const { addToCart } = useCart();
    const [visibleProducts, setVisibleProducts] = useState(6);
    const navigate = useNavigate();
    const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the observer target

    // Function to handle adding a product to the cart
    const handleAddToCart = (product: Product) => {
        addToCart(product, 1);
        alert(`${product.title} has been added to your cart!`);
    };

    // Navigate to product details
    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    // Infinite scroll: load more products when the user scrolls to the end
    const loadMoreProducts = useCallback(() => {
        setVisibleProducts((prev) => prev + 3);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreProducts();
            }
        });
    const currentRef = observerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [loadMoreProducts]);

    return (
        <div className="homepage-container2">
            <h1 className="homepage-title2">MegaMart</h1>
            <div className="products-container2">
                {products.slice(0, visibleProducts).map((product) => (
                    <div key={product.id} className="product-card2">
                        <div onClick={() => handleProductClick(product.id)}>
                            <h2 className="product-title2">{product.title}</h2>
                            <p className="product-description2">{product.description}</p>
                            <p className="product-price2">Price: ${product.price}</p>
                            <img src={product.thumbnail} alt={product.title} className="homepage-product-image" />
                        </div>
                        <button className="quick-add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                            <span className="cart-icon">
                                <FaShoppingCart />
                            </span> 
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            {/* Invisible div used to trigger infinite scrolling */}
            <div ref={observerRef} style={{ height: 1 }}></div>
        </div>
    );
};

export default HomePage;
