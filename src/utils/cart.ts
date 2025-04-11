import axios from "axios";

export const getCart = async () => {
  const response = await axios.get("https://fakestoreapi.com/carts");
  const carts = response.data;
  return carts;
};
