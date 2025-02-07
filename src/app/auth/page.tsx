'use client';

import React, { useState } from "react";
import { AuthForm } from "../(components)/auth-form";
import { Logo } from "../(components)/logo";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen">
      <div
        className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center p-8"
      >
        <div className="max-w-md">
          <Logo className="text-white mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Acompanhe as atividades do Congresso
          </h1>
          <p className="text-gray-400">
            Mantenha-se informado sobre projetos de lei, votações e atividades
            parlamentares em tempo real.
          </p>
        </div>
      </div>
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <Logo
            className="lg:hidden text-black dark:text-white mb-8"
          />
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
