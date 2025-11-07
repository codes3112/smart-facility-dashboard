import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, getCurrentUser, User } from "@/api/auth";
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  };
  const logout = async () => {
    await apiLogout();
    setUser(null);
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
