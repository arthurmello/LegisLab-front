"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"; // ✅ Uses environment variable

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // ✅ Added success message state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous success message

    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("🔍 Backend response:", data);
    setLoading(false);

    if (!response.ok) {
      setError(data.detail || "Ocorreu um erro.");
      return;
    }

    if (isLogin) {
      localStorage.setItem("access_token", data.access_token);
      
      // ✅ Manually set session in Supabase
      const { data: sessionError } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token, // If available
      });
    
      // if (sessionError) {
      //   console.error("❌ Error setting session in Supabase:", sessionError);
      // }
    
      router.push("/dashboard"); // ✅ Redirect after login
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">{isLogin ? "Entrar" : "Criar conta"}</CardTitle>
        <CardDescription>
          {isLogin ? "Entre para acompanhar as atividades do Congresso" : "Crie sua conta para começar a acompanhar"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
            {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
          </Button>
          <div className="text-center text-sm">
            {isLogin ? (
              <>
                Não tem uma conta?{" "}
                <button onClick={() => setIsLogin(false)} className="underline font-medium">
                  Criar conta
                </button>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <button onClick={() => setIsLogin(true)} className="underline font-medium">
                  Entrar
                </button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
