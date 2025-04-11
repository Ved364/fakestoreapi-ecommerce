export type CartProduct = {
  productId: number;
  quantity: number;
};

export type ICart = {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
};
