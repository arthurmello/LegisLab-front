"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { withAuth } from "./hoc/withAuth";

function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard"); // ✅ Redirect to dashboard if logged in
      } else {
        router.push("/home"); // ✅ Redirect to auth page if not logged in
      }
    }
  }, [user, loading, router]);

  return <p>Loading...</p>; // Show a loading state while checking auth
}

export default withAuth(HomePage);
