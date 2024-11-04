import React, { createContext, useContext, useEffect, useState } from 'react';


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    availableOnline: number;
    discountPercentage?: number;
}

interface ProductContextType {
    products: Product[];
    productDetail: Product | null;
    fetchProductById: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

//mocked data will be removed once database works
const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a description for product 1',
        price: 100,
        image: '/images/product1.jpg',
        availableOnline: 10
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is a description for product 2',
        price: 200,
        image: '/images/product2.jpg',
        availableOnline: 5
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'This is a description for product 3',
        price: 150,
        image: '/images/product3.jpg',
        availableOnline: 8
    }
];

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productDetail, setProductDetail] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // const productsData = await fetch('/api/products').then((res) => res.json());
        // setProducts(productsData);
        
        // Simulate API request with mock data
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setProducts(mockProducts);
                resolve();
            }, 500);
        });
    };

    const fetchProductById = async (id: number) => {
        // const productData = await fetch(`/api/products/${id}`).then((res) => res.json());
        // setProductDetail(productData);

        // Simulate fetching a single product by ID
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const product = mockProducts.find((product) => product.id === id) || null;
                setProductDetail(product);
                resolve();
            }, 500);  // Simulating network latency
        });
    };

    return (
        <ProductContext.Provider value={{ products, productDetail, fetchProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};