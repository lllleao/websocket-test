"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Aqui você chamaria sua rota de autenticação
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const bodyRes = await res.json()

    if (res.ok) {
      localStorage.setItem("userEmailTo", bodyRes.to);
      localStorage.setItem("userEmail", bodyRes.email);
      window.location.href = "/chat";
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          🔐 Login
        </h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200 active:scale-95 font-semibold"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
