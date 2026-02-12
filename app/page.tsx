"use client";
import { useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");

  const handleLogin = () => {
    // Redirigimos a la ruta de login de tu API de FastAPI
    window.location.href = "https://aimed-finds-cgi-rides.trycloudflare.com/auth/login";
  };

  return (
    <main className="min-h-screen bg-[#2c2f33] text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-extrabold mb-6 text-[#7289da]">MC Monitor Dashboard</h1>
      <p className="text-xl mb-10 text-gray-300">Gestiona tus servidores de Minecraft desde un solo lugar.</p>
      
      <button 
        onClick={handleLogin}
        className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg"
      >
        Entrar con Discord
      </button>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#23272a] p-6 rounded-xl border border-gray-700">
          <h3 className="text-blue-400 font-bold mb-2">🚀 Monitoreo Real</h3>
          <p className="text-sm text-gray-400">Estado de RAM, CPU y jugadores en tiempo real.</p>
        </div>
        <div className="bg-[#23272a] p-6 rounded-xl border border-gray-700">
          <h3 className="text-green-400 font-bold mb-2">💎 Planes Premium</h3>
          <p className="text-sm text-gray-400">Desbloquea funciones avanzadas para tu comunidad.</p>
        </div>
        <div className="bg-[#23272a] p-6 rounded-xl border border-gray-700">
          <h3 className="text-purple-400 font-bold mb-2">🤖 Bot Integrado</h3>
          <p className="text-sm text-gray-400">Comandos directos desde tu servidor de Discord.</p>
        </div>
      </div>
    </main>
  );
}
