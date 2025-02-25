"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/home"); // ✅ Redirect to dashboard if logged in
      } else {
        router.push("/auth"); // ✅ Redirect to auth page if not logged in
      }
    }
  }, [user, loading, router]);

  return <p>Loading...</p>; // Show a loading state while checking auth
}
