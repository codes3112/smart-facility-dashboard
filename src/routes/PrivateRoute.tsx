import { Navigate } from "react-router-dom";
import { JSX, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading, fetchUser } = useAuth();

  useEffect(() => {
    if (!user) fetchUser(); // lazy fetch if user not loaded
  }, [user]);

  if (loading) return null; // or show global loader

  return user ? children : <Navigate to="/login" replace />;
}