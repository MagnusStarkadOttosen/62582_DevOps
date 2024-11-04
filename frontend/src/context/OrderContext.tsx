import React, { createContext, useContext, useEffect, useState } from 'react';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    items: OrderItem[];
    totalAmount: number;
}

interface OrderContextType {
    order: Order | null;
    processPayment: (cartItems: OrderItem[], userInfo: any) => Promise<Order>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);

    const processPayment = async (cartItems: OrderItem[], userInfo: any): Promise<Order> => {
        // const newOrder: Order = {
        //     id: Math.random().toString(36).slice(2, 11),
        //     items: cartItems,
        //     totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        // };
        // setOrder(newOrder);
        // return newOrder;  // Simulate payment and order creation

        // Simulate order creation and payment processing
        return new Promise<Order>((resolve) => {
            setTimeout(() => {
                const newOrder: Order = {
                    id: Math.random().toString(36).slice(2, 11),
                    items: cartItems,
                    totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                };
                setOrder(newOrder);
                resolve(newOrder); // Simulate successful order processing
            }, 500);  // Simulating network latency
        });
    };

    return (
        <OrderContext.Provider value={{ order, processPayment }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};