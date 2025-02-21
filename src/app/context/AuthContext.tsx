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
    options: {
        optinEmail: boolean;
        optinWhatsapp: boolean;
        keywords: string[];
        selectedTopics: string[];
    };
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

    // Add refresh token function
    const refreshSession = async (session: Session) => {
        const expiryTime = new Date(session.expires_at! * 1000);
        const timeUntilExpiry = expiryTime.getTime() - Date.now();
        
        // Refresh if token expires in less than 60 seconds
        if (timeUntilExpiry < 60000) {
            console.log("🔄 Refreshing session token...");
            const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
            if (error) {
                console.error("❌ Error refreshing token:", error);
                return null;
            }
            return newSession;
        }
        return session;
    };

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
    
                // Add token refresh check after getting session
                if (session) {
                    const refreshedSession = await refreshSession(session);
                    if (refreshedSession && refreshedSession.user) {
                        setUser({
                            id: refreshedSession.user.id,
                            email: refreshedSession.user.email ?? "",
                            plan: refreshedSession.user.user_metadata?.plan || "free",
                            options: refreshedSession.user.user_metadata?.options,
                        });
                    }
                }
            } catch (err) {
                console.error("❌ Unexpected error in fetchUser:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUser();
    
        // Set up periodic token refresh
        const refreshInterval = setInterval(async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await refreshSession(session);
            }
        }, 50000); // Check every 50 seconds
    
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(`🔄 Auth event: ${event}`, session);
            
            if (session?.user) {
                // Refresh token if needed before setting user
                const refreshedSession = await refreshSession(session);
                if (refreshedSession) {
                    setUser({
                        id: refreshedSession.user.id,
                        email: refreshedSession.user.email ?? "",
                        plan: refreshedSession.user.user_metadata?.plan || "free",
                        options: refreshedSession.user.user_metadata?.options,
                    });
                }
            } else {
                setUser(null);
            }
        });
    
        return () => {
            authListener.subscription.unsubscribe();
            clearInterval(refreshInterval);
        };
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
