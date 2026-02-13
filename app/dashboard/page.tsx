'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Settings, LogOut, Search, Loader2, 
  ChevronLeft, Activity, Users, ShieldCheck, 
  Zap, Clock, Globe, BarChart3, Crown 
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServer, setSelectedServer] = useState<any>(null); // Estado para el panel Pro
  const [userName, setUserName] = useState('Administrator');

  const API_URL = 'https://corporations-hampton-export-corporate.trycloudflare.com';

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('discord_token', token);
      fetchGuilds(token);
    } else {
      const savedToken = localStorage.getItem('discord_token');
      if (savedToken) fetchGuilds(savedToken);
      else window.location.href = `${API_URL}/auth/login`;
    }
  }, [searchParams]);

  const fetchGuilds = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/user/guilds?token=${token}`);
      const data = await response.json();
      setServers(data.guilds || []);
    } catch (error) {
      setServers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    window.location.href = `${API_URL}/auth/login`;
  };

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- VISTA 1: LISTA DE SERVIDORES ---
  const ServerList = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="mb-12">
        <h1 className="text-5xl font-black text-white mb-3">
          Your <span className="bg-gradient-to-r from-[#7289da] to-[#43b581] text-transparent bg-clip-text">Servers</span>
        </h1>
        <p className="text-gray-400 text-lg">Select a server to manage its performance and settings.</p>
      </header>

      <div className="relative max-w-lg mb-12 group">
        <div className="absolute inset-0 bg-[#7289da]/10 blur-xl group-focus-within:bg-[#7289da]/20 transition-all rounded-full" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search servers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#36393f]/80 backdrop-blur-md text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-[#7289da] focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredServers.map((server) => (
            <motion.div
              key={server.id}
              layoutId={server.id}
              className="bg-[#36393f]/50 hover:bg-[#36393f] rounded-3xl p-6 border border-white/5 flex items-center justify-between group cursor-pointer transition-all"
              onClick={() => server.status === 'online' && setSelectedServer(server)}
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#2f3136] flex items-center justify-center text-gray-500 font-bold text-xl group-hover:bg-[#7289da] group-hover:text-white transition-all">
                  {server.name[0]}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{server.name}</h3>
                  <span className={`text-sm ${server.status === 'online' ? 'text-[#43b581]' : 'text-gray-500'}`}>
                    ● {server.status === 'online' ? 'Linked & Active' : 'Offline / Needs Setup'}
                  </span>
                </div>
              </div>
              <button 
                className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 ${
                  server.status === 'online' ? 'bg-[#7289da] text-white' : 'bg-white/5 text-gray-500'
                }`}
              >
                {server.status === 'online' ? <Activity className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                {server.status === 'online' ? 'Manage' : 'Setup'}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  // --- VISTA 2: PANEL PRO (MANAGE) ---
  const ServerManagePanel = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Navbar Superior del Panel */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setSelectedServer(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" /> Back to servers
        </button>
        <div className="flex items-center gap-4">
          <span className="px-4 py-1.5 bg-[#43b581]/10 text-[#43b581] rounded-full text-xs font-black uppercase tracking-widest border border-[#43b581]/20">
            Live Status
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Info Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#36393f] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#7289da] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#7289da]/20">
                <Server className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">{selectedServer.name}</h2>
                <p className="text-gray-400 font-mono">IP: mc.ejemplo.com</p>
              </div>
            </div>

            {/* Stats Rápidas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#2f3136] p-4 rounded-2xl border border-white/5">
                <Users className="w-5 h-5 text-[#7289da] mb-2" />
                <div className="text-2xl font-black text-white">12/50</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Players</div>
              </div>
              <div className="bg-[#2f3136] p-4 rounded-2xl border border-white/5">
                <Activity className="w-5 h-5 text-[#43b581] mb-2" />
                <div className="text-2xl font-black text-white">19.8</div>
                <div className="text-xs text-gray-500 uppercase font-bold">TPS Avg</div>
              </div>
              <div className="bg-[#2f3136] p-4 rounded-2xl border border-white/5">
                <Clock className="w-5 h-5 text-yellow-500 mb-2" />
                <div className="text-2xl font-black text-white">99.9%</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Uptime</div>
              </div>
            </div>
          </div>

          {/* Gráfica de Jugadores (Visual) */}
          <div className="bg-[#36393f] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#7289da]" /> Player Activity (24h)
              </h3>
            </div>
            <div className="h-48 flex items-end gap-2 px-2">
              {[40, 70, 45, 90, 65, 80, 30, 50, 85, 40, 60, 95].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="flex-1 bg-gradient-to-t from-[#7289da]/20 to-[#7289da] rounded-t-lg"
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500 font-bold uppercase">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Sidebar de Gestión & Premium */}
        <div className="space-y-6">
          {/* Card de Configuración */}
          <div className="bg-[#36393f] rounded-3xl p-6 border border-white/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Quick Settings
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-[#2f3136] hover:bg-[#7289da]/10 text-gray-300 hover:text-[#7289da] rounded-xl text-left text-sm font-bold transition-all flex items-center justify-between">
                Change Minecraft IP <Globe className="w-4 h-4" />
              </button>
              <button className="w-full py-3 px-4 bg-[#2f3136] hover:bg-[#7289da]/10 text-gray-300 hover:text-[#7289da] rounded-xl text-left text-sm font-bold transition-all flex items-center justify-between">
                Edit Notifications <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECCIÓN PREMIUM (Publicidad) */}
          <div className="bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-3xl p-1 shadow-xl shadow-[#7289da]/20">
            <div className="bg-[#1a1d23] rounded-[22px] p-6 h-full">
              <div className="flex items-center gap-2 text-yellow-500 mb-4">
                <Crown className="w-6 h-6 fill-yellow-500" />
                <span className="font-black uppercase tracking-tighter">Go Premium</span>
              </div>
              <h4 className="text-white font-black text-xl mb-2">Unlock Full Potential</h4>
              <ul className="text-gray-400 text-sm space-y-2 mb-6">
                <li className="flex items-center gap-2">● Infinite Graph History</li>
                <li className="flex items-center gap-2">● Custom Bot Status</li>
                <li className="flex items-center gap-2">● Priority Support</li>
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-[#7289da] to-[#43b581] text-white font-black rounded-xl hover:scale-[1.02] transition-transform shadow-lg">
                UPGRADE NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      {/* Sidebar */}
      <aside className="w-20 bg-[#36393f] border-r border-white/5 flex flex-col items-center py-8 gap-6 shrink-0">
        <motion.div 
          onClick={() => setSelectedServer(null)}
          className="w-12 h-12 bg-[#7289da] rounded-xl flex items-center justify-center cursor-pointer"
        >
          <Server className="w-6 h-6 text-white" />
        </motion.div>
        <div className="flex-1" />
        <button onClick={handleLogout} className="p-3 text-gray-500 hover:text-red-400 transition-colors">
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-[#7289da] animate-spin" /></div>
          ) : (
            selectedServer ? <ServerManagePanel /> : <ServerList />
          )}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#1a1d23]" />}>
      <DashboardContent />
    </Suspense>
  );
}