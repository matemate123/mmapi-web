'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Settings, LogOut, Search, Loader2, 
  ChevronLeft, Activity, Users, ShieldCheck, 
  Zap, Clock, Globe, BarChart3, Crown, 
  AlertCircle, ChevronRight, CreditCard
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServer, setSelectedServer] = useState<any>(null);
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

  // --- VISTA 1: LISTA DE SERVIDORES (CON BOTÓN PREMIUM) ---
  const ServerList = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-white mb-3">
            Your <span className="bg-gradient-to-r from-[#7289da] to-[#43b581] text-transparent bg-clip-text">Servers</span>
          </h1>
          <p className="text-gray-400 text-lg">Select a server to access the Pro Management Panel.</p>
        </div>
        {/* Botón Premium Global */}
        <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-yellow-500/20">
          <Crown className="w-5 h-5 fill-black" />
          GET PREMIUM
        </button>
      </header>

      <div className="relative max-w-lg mb-12 group">
        <div className="absolute inset-0 bg-[#7289da]/10 blur-xl group-focus-within:bg-[#7289da]/20 transition-all rounded-full" />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search servers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#36393f]/80 backdrop-blur-md text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-[#7289da] focus:outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredServers.map((server) => (
          <motion.div
            key={server.id}
            whileHover={{ x: 10 }}
            className="bg-[#36393f]/50 hover:bg-[#36393f] rounded-3xl p-6 border border-white/5 flex items-center justify-between group cursor-pointer transition-all"
            onClick={() => server.status === 'online' && setSelectedServer(server)}
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#2f3136] flex items-center justify-center text-gray-400 font-bold text-xl group-hover:bg-[#7289da] group-hover:text-white transition-all">
                {server.name[0]}
              </div>
              <div>
                <h3 className="text-white font-bold text-xl group-hover:text-[#7289da] transition-colors">{server.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-[#43b581]' : 'bg-gray-500'}`} />
                  <span className="text-sm text-gray-500">{server.status === 'online' ? 'Linked' : 'Needs Setup'}</span>
                  {server.status === 'online' && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-black rounded uppercase">Free Plan</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {server.status === 'online' ? (
                <button className="px-6 py-2.5 bg-[#7289da] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#5b6eae] transition-all">
                  Manage <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="px-6 py-2.5 bg-[#43b581] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#3ca374] transition-all">
                  Setup Bot
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // --- VISTA 2: PANEL PRO (DETALLES Y GRÁFICAS) ---
  const ServerManagePanel = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      {/* Navbar Panel */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setSelectedServer(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-all"
        >
          <ChevronLeft className="w-6 h-6" /> Return to Servers
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#43b581]/10 text-[#43b581] rounded-xl border border-[#43b581]/20 font-bold text-sm">
            <div className="w-2 h-2 bg-[#43b581] rounded-full animate-ping" />
            System Live
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Estadísticas e Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Card */}
          <div className="bg-[#36393f] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Server className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-2">{selectedServer.name}</h2>
              <div className="flex items-center gap-4 text-gray-400 font-mono mb-8">
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> mc.example.com</span>
                <span className="text-[#7289da]">ID: {selectedServer.id.slice(0,8)}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Players', val: '14/50', icon: Users, color: 'text-[#7289da]' },
                  { label: 'TPS', val: '20.0', icon: Activity, color: 'text-[#43b581]' },
                  { label: 'Uptime', val: '99.9%', icon: Clock, color: 'text-yellow-500' },
                  { label: 'Version', val: '1.20.4', icon: ShieldCheck, color: 'text-purple-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#2f3136] p-4 rounded-2xl border border-white/5">
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <div className="text-xl font-black text-white">{stat.val}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-black">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Graph (Hecha con Framer Motion) */}
          <div className="bg-[#36393f] rounded-[2rem] p-8 border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-[#7289da]" /> Player Activity (24h)
              </h3>
              <select className="bg-[#2f3136] text-xs font-bold text-gray-400 px-3 py-1.5 rounded-lg border border-white/5 outline-none">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-48 flex items-end gap-3 px-2">
              {[30, 50, 45, 80, 60, 95, 40, 70, 85, 30, 55, 90, 65, 40].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-[#7289da]/10 via-[#7289da]/40 to-[#7289da] rounded-t-md relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.floor(h/2)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] text-gray-500 font-black uppercase tracking-widest">
              <span>00:00</span><span>08:00</span><span>16:00</span><span>24:00</span>
            </div>
          </div>
        </div>

        {/* Sidebar Gestión & Premium */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#36393f] rounded-[2rem] p-6 border border-white/5">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" /> Server Settings
            </h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-1">Minecraft IP</label>
                <input 
                  type="text" 
                  placeholder="mc.yourserver.com" 
                  className="w-full bg-[#2f3136] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-[#7289da] outline-none transition-all"
                />
              </div>
              <button className="w-full py-3 bg-[#7289da] text-white font-bold rounded-xl hover:bg-[#5b6eae] transition-all shadow-lg shadow-[#7289da]/20 mt-2">
                Save Changes
              </button>
            </div>
          </div>

          {/* Tarjeta PREMIUM Pro */}
          <div className="bg-gradient-to-br from-[#7289da] to-[#43b581] p-1 rounded-[2rem] shadow-2xl shadow-[#7289da]/20">
            <div className="bg-[#1a1d23] rounded-[1.8rem] p-6 text-center">
              <div className="inline-flex p-3 bg-yellow-500/10 rounded-2xl mb-4">
                <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              </div>
              <h4 className="text-white font-black text-2xl mb-2">Upgrade to PRO</h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Unlock detailed analytics, custom alerts, and priority bot performance.
              </p>
              <div className="space-y-3 mb-8">
                {['Unlimited History', 'Custom Bot Status', 'SMS Notifications'].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-left text-gray-300 font-bold">
                    <Zap className="w-3 h-3 text-[#43b581] fill-[#43b581]" /> {feat}
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[#7289da] to-[#43b581] text-white font-black rounded-xl hover:scale-105 transition-all shadow-xl">
                UPGRADE NOW — $4.99
              </button>
              <p className="mt-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <CreditCard className="w-3 h-3" /> Secure Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#1a1d23] flex text-slate-200">
      {/* Sidebar Navigation */}
      <aside className="w-20 bg-[#36393f] border-r border-white/5 flex flex-col items-center py-8 gap-6 shrink-0">
        <div 
          onClick={() => setSelectedServer(null)}
          className="w-12 h-12 bg-[#7289da] rounded-2xl flex items-center justify-center cursor-pointer shadow-lg shadow-[#7289da]/20"
        >
          <Server className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1" />
        <button onClick={handleLogout} className="p-4 text-gray-500 hover:text-red-400 transition-colors">
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-[#7289da] animate-spin" />
              <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Fetching Data...</p>
            </div>
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