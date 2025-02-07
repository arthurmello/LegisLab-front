"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

// Define User Type
interface User {
    id: string;
    email?: string;
    plan: string; // ✅ Store user's plan
}

// Define Context Type
interface AuthContextProps {
    user: User | null;
    loading: boolean;
    signOut: () => void;
}

// Create Auth Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
    
                // ✅ Small delay to ensure session is available
                await new Promise((resolve) => setTimeout(resolve, 500));
    
                const { data: { session }, error } = await supabase.auth.getSession();
    
                if (error || !session || !session.user) {
                    console.warn("⚠️ No active session found.");
                    setUser(null);
                    setLoading(false);
                    return;
                }
    
                console.log("✅ Active session detected:", session);
    
                setUser({
                    id: session.user.id,
                    email: session.user.email ?? "",
                    plan: session.user.user_metadata?.plan || "free",
                });
            } catch (err) {
                console.error("❌ Unexpected error in fetchUser:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUser();
    
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(`🔄 Auth event: ${event}`, session);
            
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email ?? "",
                    plan: session.user.user_metadata?.plan || "free",
                });
            } else {
                setUser(null);
            }
        });
    
        return () => authListener.subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/auth");
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
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
