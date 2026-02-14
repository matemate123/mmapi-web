'use client';

import React, { useState, useEffect } from 'react'; // Añadimos useEffect
import { motion } from 'framer-motion';
import { 
  Search, Filter, Globe, Users, 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Importamos la conexión

export default function ServersPage() {
  const [search, setSearch] = useState('');
  const [servers, setServers] = useState<any[]>([]); // Estado para los servidores reales
  const [loading, setLoading] = useState(true);

  // EFECTO PARA CARGAR DATOS REALES
  useEffect(() => {
    async function fetchServers() {
      const { data, error } = await supabase
        .from('servers')
        .select('*');
      
      if (!error && data) {
        setServers(data);
      }
      setLoading(false);
    }
    fetchServers();
  }, []);

  // Filtrar servidores según la búsqueda
  const filteredServers = servers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.ip.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white selection:bg-[#7289da]/30">
      {/* Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7289da]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header / Nav */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-[#1a1d23]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            <span className="font-black text-xs uppercase tracking-widest text-gray-500 group-hover:text-white">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#43b581] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {servers.length} Servers Monitored
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#7289da] transition-colors" />
            <input 
              type="text" 
              placeholder="Search real servers from database..."
              className="w-full bg-[#2f3136]/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#7289da]/40 transition-all text-sm font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-3 px-6 py-4 bg-[#2f3136]/50 border border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#2f3136] transition-all">
            <Filter className="w-4 h-4 text-[#7289da]" /> Filters
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
          {['All Servers', 'Survival', 'Skyblock', 'Minigames'].map((cat) => (
            <button key={cat} className="whitespace-nowrap px-6 py-2.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-[#7289da] hover:border-[#7289da] transition-all">
              {cat}
            </button>
          ))}
        </div>

        {/* Servers List */}
        <div className="space-y-4 mt-8">
          {loading ? (
            <p className="text-center text-gray-500 animate-pulse uppercase font-black text-xs tracking-widest">Connecting to Database...</p>
          ) : (
            filteredServers.map((server) => (
              <ServerRow key={server.id} server={server} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function ServerRow({ server }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005, backgroundColor: 'rgba(255,255,255,0.02)' }}
      className="bg-[#2f3136]/30 border border-white/5 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 group transition-all"
    >
      <div className="w-16 h-16 bg-[#1a1d23] rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#7289da]/40 transition-colors shrink-0">
        <Globe className="w-8 h-8 text-gray-700 group-hover:text-[#7289da] transition-colors" />
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">{server.name}</h3>
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#7289da]/20 text-[#7289da] uppercase w-fit mx-auto md:mx-0">
            {server.plan || 'Free'}
          </span>
        </div>
        <p className="text-sm font-bold text-[#7289da] tracking-tight">{server.ip}</p>
      </div>

      <div className="flex gap-8 px-8 border-x border-white/5 hidden lg:flex">
        <div className="text-center">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 text-center">Players</p>
          <div className="flex items-center gap-2 justify-center">
            <Users className="w-3 h-3 text-[#43b581]" />
            <span className="font-black text-sm">{server.players_online || 0}</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</p>
          <span className={`font-black text-sm uppercase ${server.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
            {server.status}
          </span>
        </div>
      </div>

      <button className="px-6 py-3 bg-[#7289da] hover:bg-[#5b6eae] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
        View Details
      </button>
    </motion.div>
  );
}