"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) return;

    localStorage.setItem("user", name);
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200">

      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-80">

        <h1 className="text-xl font-bold text-center mb-4">
          AI Support Login
        </h1>

        <input
          className="w-full p-3 border rounded-xl mb-3"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl"
        >
          Login
        </button>

      </div>

    </div>
  );
}