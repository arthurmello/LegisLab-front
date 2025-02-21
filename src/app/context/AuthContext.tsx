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
    token?: string; // ✅ Add this
    options: {
        optinEmail: boolean;
        optinWhatsapp: boolean;
        keywords: string[];
        selectedTopics: string[];
        telefone: string;
    };
}

// Define Context Type
interface AuthContextProps {
    user: User | null;
    loading: boolean;
    signOut: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // ✅ Add this
}

// Create Auth Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
          
              const { data: { session }, error } = await supabase.auth.getSession();
          
              if (error || !session || !session.user) {
                console.warn("⚠️ No active session found.");
                setUser(null);
                setLoading(false);
                return;
              }
          
              console.log("✅ Active session detected:", session);
          
              const token = session.access_token;
          
              // ✅ Fetch latest options from backend
              const fetchOptionsResponse = await fetch(`${API_URL}/conta/get-user-options`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
          
              if (!fetchOptionsResponse.ok) {
                throw new Error("Erro ao buscar opções do usuário.");
              }
          
              const updatedOptionsRaw = await fetchOptionsResponse.json();
              
              const updatedOptions = {
                optinEmail: updatedOptionsRaw.optin_email,
                optinWhatsapp: updatedOptionsRaw.optin_whatsapp,
                keywords: updatedOptionsRaw.keywords,
                selectedTopics: updatedOptionsRaw.temas,
                telefone: updatedOptionsRaw.telefone,
              };
              console.log("✅ Latest options from backend:", updatedOptions);
          
              // ✅ Update AuthContext with latest data
              setUser({
                id: session.user.id,
                email: session.user.email ?? "",
                plan: session.user.user_metadata?.plan || "free",
                options: updatedOptions, // ✅ Use the latest options
                token: token, // ✅ Keep the session token
              });
          
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
                        token: refreshedSession.access_token,
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
        <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
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
