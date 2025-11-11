import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useLoader } from "@/hooks/useLoader";
export interface User {
  email: string;
  name: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
  fetchUser: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user", { withCredentials: true });
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser(); // check session on mount
  }, []);
  const login = async (email: string, password: string) => {
    try {
      showLoader();
      setLoading(true);
      await axios.post("/api/login", { email, password }, { withCredentials: true });
      await fetchUser(); // fetch user after login
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || err.message };
    } finally {
      setLoading(false);
      hideLoader();
    }
  };
  const logout = async () => {
    try {
      showLoader();
      setLoading(true);
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};