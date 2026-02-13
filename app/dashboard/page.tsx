'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Settings, LogOut, Search, Loader2 } from 'lucide-react';

// Separate component for the dashboard content that uses useSearchParams
function DashboardContent() {
  const searchParams = useSearchParams();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('Administrator');

  useEffect(() => {
    // Get token from URL
    const token = searchParams.get('token');
    
    if (token) {
      // Save token to localStorage
      localStorage.setItem('discord_token', token);
      
      // Fetch guilds from API
      fetchGuilds(token);
    } else {
      // Try to get token from localStorage
      const savedToken = localStorage.getItem('discord_token');
      if (savedToken) {
        fetchGuilds(savedToken);
      } else {
        // No token found, redirect to login
        window.location.href = 'https://corporations-hampton-export-corporate.trycloudflare.com/auth/login';
      }
    }
  }, [searchParams]);

const fetchGuilds = async (token: string) => {
    try {
      // 1. Aquí pedimos los datos a la API (fíjate que ahora dice /user/guilds)
      const response = await fetch(`https://corporations-hampton-export-corporate.trycloudflare.com/user/guilds?token=${token}`);
      
      if (!response.ok) throw new Error('Error al conectar con la API');

      const data = await response.json();
      
      // 2. Aquí está la "magia": data es el paquete, y .guilds es lo que hay dentro.
      // Tu api.py devuelve: {"total_admin_guilds": X, "guilds": [...]}
      setServers(data.guilds); 
      
    } catch (error) {
      console.error('Error fetching guilds:', error);
      setServers([]); // Si falla, dejamos la lista vacía para que no explote
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    window.location.href = '/';
  };

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
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      {/* Sidebar */}
      <aside className="w-20 bg-[#36393f] border-r border-white/5 flex flex-col items-center py-8 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-12 h-12 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-xl flex items-center justify-center shadow-lg shadow-[#7289da]/30 cursor-pointer hover:scale-110 transition-transform"
        >
          <span className="text-white font-black text-lg">MC</span>
        </motion.div>

        <div className="flex-1 flex flex-col gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
            title="My Servers"
          >
            <Server className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <div className="absolute left-full ml-2 px-3 py-1.5 bg-[#36393f] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              My Servers
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
            title="Settings"
          >
            <Settings className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            <div className="absolute left-full ml-2 px-3 py-1.5 bg-[#36393f] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              Settings
            </div>
          </motion.button>
        </div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleLogout}
          className="group relative p-3 rounded-xl hover:bg-red-500/10 transition-all duration-200"
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
          <div className="absolute left-full ml-2 px-3 py-1.5 bg-[#36393f] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            Logout
          </div>
        </motion.button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-black text-white mb-2">
              Hello, <span className="bg-gradient-to-r from-[#7289da] to-[#43b581] text-transparent bg-clip-text">{userName}</span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your Minecraft servers from one place</p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#36393f] text-white placeholder-gray-400 pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:border-[#7289da] focus:outline-none transition-all duration-200"
              />
            </div>
          </motion.div>

          {/* Server List */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-[#36393f] rounded-2xl p-6 border border-white/10 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#2c2f33] rounded-xl" />
                    <div className="flex-1">
                      <div className="h-5 bg-[#2c2f33] rounded w-1/3 mb-2" />
                      <div className="h-4 bg-[#2c2f33] rounded w-1/4" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 bg-[#2c2f33] rounded-lg w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredServers.map((server, index) => (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-[#36393f] rounded-2xl p-6 border border-white/10 hover:border-[#7289da]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#7289da]/10"
                  >
                    <div className="flex items-center gap-4">
                      {/* Server Icon */}
                      {getServerIcon(server) ? (
                        <img
                          src={getServerIcon(server) || undefined}
                          alt={server.name}
                          className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-[#7289da]/50 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7289da] to-[#43b581] flex items-center justify-center ring-2 ring-white/10 group-hover:ring-[#7289da]/50 transition-all duration-300 shadow-lg shadow-[#7289da]/30">
                          <span className="text-white font-bold text-xl">
                            {getInitials(server.name)}
                          </span>
                        </div>
                      )}

                      {/* Server Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-xl mb-1 truncate">
                          {server.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-gray-400">
                            <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-[#7289da]' : 'bg-[#43b581]'} animate-pulse`} />
                            <span>{server.status === 'online' ? 'Bot Ready' : 'Needs Setup'}</span>
                          </div>
                          </div>
                          {server.memberCount && (
                            <div className="flex items-center gap-1.5 text-gray-400">
                              <Server className="w-4 h-4" />
                              <span>{server.memberCount.toLocaleString()} members</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Manage Button */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            if (server.status === 'offline') {
                              alert("¡Hola! Ve a tu servidor de Discord y usa el comando /setup para vincular tu Minecraft.");
                            } else {
                              alert(`Aquí se abrirán los ajustes para el servidor: ${server.name}`);
                            }
                          }}
                          className={`px-6 py-2.5 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:scale-105 ${
                            server.status === 'online' 
                            ? 'bg-[#7289da] hover:bg-[#5b6eae] shadow-[#7289da]/30 hover:shadow-[#7289da]/50' // Estilo para Manage
                            : 'bg-[#43b581] hover:bg-[#3ca374] shadow-[#43b581]/30 hover:shadow-[#43b581]/50' // Estilo para Setup
                          }`}
                        >
                          <Settings className="w-4 h-4" />
                          <span>{server.status === 'online' ? 'Manage' : 'Setup Bot'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredServers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 bg-[#36393f] rounded-2xl mb-6 border border-white/10">
                <Server className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">No servers found</h3>
              <p className="text-gray-400 mb-8">
                {searchTerm ? 'Try adjusting your search' : 'Add the bot to a server to get started'}
              </p>
              {!searchTerm && (
                <button className="px-8 py-3 bg-[#7289da] hover:bg-[#5b6eae] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#7289da]/30">
                  Add to Discord
                </button>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

// Main component with Suspense wrapper
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1a1d23] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#7289da] animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
