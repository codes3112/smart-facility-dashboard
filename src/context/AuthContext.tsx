import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, logout as apiLogout, getCurrentUser, User } from "@/api/auth";
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  // On mount, check if user is logged in
  useEffect(() => {
    async function fetchUser() {
      const current = await getCurrentUser();
      if (current) setUser(current);
    }
    fetchUser();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const loggedUser = await apiLogin(email, password);
      setUser(loggedUser);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };
  const logout = async () => {
    await apiLogout();
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
