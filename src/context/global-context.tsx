"use client";

import { ICart } from "@/types/cart";
import { getCart } from "@/utils/cart";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type IGlobalContext = {
  login: (username: string) => void;
  logout: VoidFunction;
  userId: string;
  cartData: ICart[];
  filteredUserCart: ICart[];
  totalQuantityCount: number;
};

export const GlobalContext = createContext({} as IGlobalContext);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>("");
  const [cartData, setCartData] = useState<ICart[]>([]);

  const router = useRouter();

  const login = (username: string) => {
    setUserId(username);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUserId("");
    router.push("/login");
  };

  const filteredUserCart: ICart[] = userId
    ? cartData.filter((order) => order.userId === Number(userId))
    : [];

  const totalQuantityCount = filteredUserCart.reduce((total, cart) => {
    const cartTotal = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return total + cartTotal;
  }, 0);

  const fetchCartData = useCallback(async () => {
    const fetchCart = await getCart();
    setCartData(fetchCart);
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setUserId(JSON.parse(id));
    }
  }, [userId]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          userId,
          login,
          logout,
          cartData,
          filteredUserCart,
          totalQuantityCount,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};
