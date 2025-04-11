import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  return products;
};
