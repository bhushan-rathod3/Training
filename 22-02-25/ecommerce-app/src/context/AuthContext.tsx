import { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { resetCart } = useCart();

  const logout = () => {
    setUser(null);
    resetCart();
    navigate("/login");
  };

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "adminpass") {
      setUser({ id: 0, username: "admin", isAdmin: true });
      navigate("/");
    } else {
      axios
        .post("https://fakestoreapi.com/auth/login", { username, password })
        .then((res) => {
          setUser({ id: 1, username, isAdmin: false, token: res.data.token });
          navigate("/");
        })
        .catch(() => alert("Invalid login credentials"));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
