import products from "../data/products.json";

export interface Product {
  discountPercentage: any;
  id: number;
  title: string;
  description?: string;
  price: number;
  thumbnail?: string;
  
  
}
