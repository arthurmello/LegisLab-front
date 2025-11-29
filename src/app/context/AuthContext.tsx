"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

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

// Helper function to decode JWT token
const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                
                const token = localStorage.getItem("access_token");
                
                if (!token) {
                    console.warn("⚠️ No access token found.");
                    setUser(null);
                    setLoading(false);
                    return;
                }
                
                // Decode JWT to get user info
                const decoded = decodeJWT(token);
                if (!decoded) {
                    console.warn("⚠️ Invalid token.");
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    setUser(null);
                    setLoading(false);
                    return;
                }
                
                console.log("✅ Token found, fetching user data...");
                
                // Fetch user options from backend
                const fetchOptionsResponse = await fetch(`${API_URL}/conta/get-user-options`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (!fetchOptionsResponse.ok) {
                    if (fetchOptionsResponse.status === 401) {
                        // Token expired or invalid
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        setUser(null);
                        setLoading(false);
                        return;
                    }
                    throw new Error("Erro ao buscar opções do usuário.");
                }
                
                const updatedOptionsRaw = await fetchOptionsResponse.json();
                
                const updatedOptions = {
                    optinEmail: updatedOptionsRaw.optin_email || false,
                    optinWhatsapp: updatedOptionsRaw.optin_whatsapp || false,
                    keywords: updatedOptionsRaw.keywords || [],
                    selectedTopics: updatedOptionsRaw.temas || [],
                    telefone: updatedOptionsRaw.telefone || "",
                };
                
                console.log("✅ User data loaded:", { id: decoded.sub || decoded.user_id, email: decoded.email });
                
                // Update AuthContext with user data
                setUser({
                    id: decoded.sub || decoded.user_id || "",
                    email: decoded.email || "",
                    plan: decoded.plan || "free",
                    options: updatedOptions,
                    token: token,
                });
                
            } catch (err) {
                console.error("❌ Unexpected error in fetchUser:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
        
        // Listen for storage changes (e.g., when token is set in another tab/window)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "access_token") {
                fetchUser();
            }
        };
        
        window.addEventListener("storage", handleStorageChange);
        
        // Also listen for custom event when token is set in same window
        const handleTokenSet = () => {
            fetchUser();
        };
        
        window.addEventListener("tokenSet", handleTokenSet);
        
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("tokenSet", handleTokenSet);
        };
    }, []);

    const signOut = async () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
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
