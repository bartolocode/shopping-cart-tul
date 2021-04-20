export interface Product {
  id?: string;
  name: string;
  sku: string;
  description: string;
  image: string;
  price: number;
  createdAt: Date;
}

export interface ProductCart extends Product {
  quantity: number;
}
