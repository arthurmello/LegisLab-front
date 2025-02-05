"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Use Next.js router

export default function HomePage() {
  const router = useRouter(); // ✅ Next.js router

  useEffect(() => {
    router.push("/dashboard"); // ✅ Redirect to the dashboard
  }, [router]);

  return null; // The component doesn't render anything
}