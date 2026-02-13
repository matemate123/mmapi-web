'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Settings, LogOut, Search, Loader2, ExternalLink } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('Administrator');

  const API_URL = 'https://corporations-hampton-export-corporate.trycloudflare.com';

  const fetchGuilds = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/user/guilds?token=${token}`);
      if (!response.ok) throw new Error('Failed to fetch guilds');
      const data = await response.json();
      setServers(data.guilds || []);
    } catch (error) {
      console.error('Error fetching guilds:', error);
      setServers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    window.location.href = `${API_URL}/auth/login`;
  };

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('discord_token', token);
      fetchGuilds(token);
    } else {
      const savedToken = localStorage.getItem('discord_token');
      if (savedToken) {
        fetchGuilds(savedToken);
      } else {
        window.location.href = `${API_URL}/auth/login`;
      }
    }
  }, [searchParams]);

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getServerIcon = (server: any) => {
    if (server.icon) {
      return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`;
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] flex text-slate-200">
      {/* Sidebar Fijo */}
      <aside className="w-20 bg-[#36393f] border-r border-white/5 flex flex-col items-center py-8 gap-6 shrink-0">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-xl flex items-center justify-center shadow-lg shadow-[#7289da]/30 cursor-pointer mb-4"
        >
          <span className="text-white font-black text-xl">M</span>
        </motion.div>

        <div className="flex-1 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            <button className="p-3 rounded-xl bg-white/5 text-white transition-all shadow-sm">
              <Server className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
              <Settings className="w-6 h-6" />
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="p-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Area de Contenido */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          
          {/* Header con Diseño */}
          <header className="mb-12 flex justify-between items-end">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black text-white mb-3"
              >
                Hello, <span className="bg-gradient-to-r from-[#7289da] via-[#5b6eae] to-[#43b581] text-transparent bg-clip-text">
                  {userName}
                </span>
              </motion.h1>
              <p className="text-gray-400 text-lg font-medium">Manage and monitor your Minecraft realms</p>
            </div>
          </header>

          {/* Buscador Estilizado */}
          <div className="relative max-w-lg mb-12 group">
            <div className="absolute inset-0 bg-[#7289da]/20 blur-xl group-focus-within:bg-[#7289da]/30 transition-all rounded-full" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#7289da] transition-colors" />
              <input
                type="text"
                placeholder="Search across your servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#36393f]/80 backdrop-blur-md text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-[#7289da] focus:outline-none focus:ring-4 focus:ring-[#7289da]/10 transition-all text-lg"
              />
            </div>
          </div>

          {/* Grid de Servidores */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-12 h-12 text-[#7289da] animate-spin" />
              <p className="text-gray-500 font-medium animate-pulse">Syncing with Discord...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              <AnimatePresence mode='popLayout'>
                {filteredServers.map((server, index) => (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#36393f]/50 hover:bg-[#36393f] rounded-3xl p-6 border border-white/5 hover:border-[#7289da]/30 flex items-center justify-between group transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {getServerIcon(server) ? (
                          <img src={getServerIcon(server)!} alt="" className="w-20 h-20 rounded-2xl object-cover shadow-2xl" />
                        ) : (
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#36393f] to-[#2f3136] border border-white/10 flex items-center justify-center text-gray-400 font-bold text-2xl group-hover:from-[#7289da] group-hover:to-[#43b581] group-hover:text-white transition-all duration-500">
                            {getInitials(server.name)}
                          </div>
                        )}
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-[#36393f] ${server.status === 'online' ? 'bg-[#43b581]' : 'bg-gray-500'} group-hover:scale-110 transition-transform`} />
                      </div>

                      <div>
                        <h3 className="text-white font-bold text-2xl mb-1 group-hover:text-[#7289da] transition-colors">{server.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            server.status === 'online' ? 'bg-[#43b581]/10 text-[#43b581]' : 'bg-white/5 text-gray-500'
                          }`}>
                            {server.status === 'online' ? 'Active' : 'Not Linked'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (server.status !== 'online') {
                          alert("Configure this server using /setup in Discord");
                        } else {
                          console.log("Managing", server.id);
                        }
                      }}
                      className={`px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xl ${
                        server.status === 'online' 
                        ? 'bg-[#7289da] hover:bg-[#5b6eae] text-white shadow-[#7289da]/20' 
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span>{server.status === 'online' ? 'Manage' : 'Setup Bot'}</span>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Estado Vacío */}
              {!loading && filteredServers.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-[#36393f]/20 rounded-3xl border-2 border-dashed border-white/5"
                >
                  <Server className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                  <h3 className="text-white text-2xl font-bold mb-2">No servers found</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    {searchTerm ? "We couldn't find any server matching your search." : "Invite the bot to your Discord server to get started."}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1a1d23] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#7289da] animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}