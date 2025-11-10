import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  // On mount, check sessionStorage for token
  useEffect(() => {
    const savedToken = sessionStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setLoading(false); // no token, user is guest
    }
  }, []);
  const fetchUser = async (tokenToUse?: string) => {
    if (!tokenToUse && !token) {
      setUser(null);
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user", { withCredentials: true });
      setUser(data.user);
    } catch (err: any) {
      setUser(null); // silently handle 401
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      showLoader();
      setLoading(true);
      const { data } = await axios.post("/api/login", { email, password }, { withCredentials: true });
      setUser(data.user);
      setToken(data.token);
      sessionStorage.setItem("authToken", data.token); // persist token for session
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
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
      setToken(null);
      sessionStorage.removeItem("authToken");
    } finally {
      hideLoader();
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
