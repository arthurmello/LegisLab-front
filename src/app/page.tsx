'use client'; // Add this directive to mark the file as a client component

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard"); // Redirect to the dashboard route
  }, [navigate]);

  return null; // Return null since the redirect happens immediately
}