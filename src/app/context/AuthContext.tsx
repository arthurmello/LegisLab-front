"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

// Define User Type
interface User {
  id: string;
  email?: string; // ✅ Allow email to be optional
}

// Define Context Type
interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

// Create Auth Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ? { id: user.id, email: user.email ?? "" } : null); // ✅ Ensures email is always a string
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session: Session | null) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email ?? "" } : null); // ✅ Fixes email issue
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to Use Auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}