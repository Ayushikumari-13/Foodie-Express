
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fe_user")) || null;
    } catch {
      return null;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fe_cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fe_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart((current) => {
      const existing = current.find((item) => item._id === food._id);

      if (existing) {
        return current.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...food, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });

    const token = data.token || data.accessToken;
    const loggedInUser = data.user;

    if (!token || !loggedInUser) {
      throw new Error("Unexpected login response from server.");
    }

    localStorage.setItem("fe_token", token);
    localStorage.setItem("fe_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    if (data.token && data.user) {
      localStorage.setItem("fe_token", data.token);
      localStorage.setItem("fe_user", JSON.stringify(data.user));
      setUser(data.user);
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("fe_token");
    localStorage.removeItem("fe_user");
    setUser(null);
  };

  const value = {
    user,
    cart,
    addToCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
