import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../interface/products";

interface HomePageContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; //Update products state
}

export const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

interface HomePageProviderProps {
  children: ReactNode;
}
export const HomePageProvider: React.FC<HomePageProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]); // Manage products state

  return (
    <HomePageContext.Provider value={{ products, setProducts }}>
      {children}
    </HomePageContext.Provider>
  );
};
