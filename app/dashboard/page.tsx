'use client';
import { supabase } from '@/lib/supabase';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Settings, LogOut, Search, Loader2, 
  ChevronLeft, Activity, Users, ShieldCheck, 
  Zap, Clock, Globe, BarChart3, Crown, 
  Terminal, Lock, RefreshCw, Bell, History,
  ExternalLink, Info, AlertCircle, Save
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

// Maneja la imagen del servidor de Discord o iniciales si falla
const ServerIcon = ({ server, size = "w-16 h-16" }: { server: any, size?: string }) => {
  const [error, setError] = useState(false);
  const iconUrl = server.icon 
    ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png` 
    : null;

  if (iconUrl && !error) {
    return (
      <img 
        src={iconUrl} 
        alt={server.name} 
        className={`${size} rounded-2xl object-cover shadow-lg`}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div className={`${size} rounded-2xl bg-gradient-to-br from-[#7289da] to-[#43b581] flex items-center justify-center text-white font-black text-xl shadow-lg uppercase`}>
      {server.name.substring(0, 2)}
    </div>
  );
};

// Overlay para funciones bloqueadas
const LockedFeature = ({ planRequired, tierColor }: { planRequired: string, tierColor: string }) => (
  <div className="absolute inset-0 bg-[#1a1d23]/80 backdrop-blur-md z-30 flex flex-col items-center justify-center rounded-[2rem] p-6 text-center border border-white/5">
    <div className={`p-4 rounded-full bg-${tierColor}/10 mb-4`}>
      <Lock className={`w-8 h-8 text-${tierColor}`} />
    </div>
    <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2">Función {planRequired}</h4>
    <p className="text-gray-500 text-xs mb-4 max-w-[200px]">Requiere la instalación del agente y el plan {planRequired}.</p>
    <button className={`px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-[10px] font-black rounded-lg hover:scale-105 transition-all`}>
      MEJORAR AHORA
    </button>
  </div>
);

function DashboardContent() {
  const searchParams = useSearchParams();
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

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
      // Simulamos planes para demo si no vienen de la API
      const mapped = (data.guilds || []).map((s: any, i: number) => ({
        ...s,
        plan: i === 0 ? 'premium_plus' : i === 1 ? 'premium' : 'free',
        status: 'online',
        ip: 'mc.mineplex.com'
      }));
      setServers(mapped);
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

  const isPremium = (plan: string) => plan === 'premium' || plan === 'premium_plus';
  const isPremiumPlus = (plan: string) => plan === 'premium_plus';

  // --- VISTA 1: LISTA DE SERVIDORES ---
  const ServerList = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter">
            Mis <span className="text-[#7289da]">Servidores</span>
          </h1>
          <p className="text-gray-500 text-lg mt-2">Gestiona tu red de Minecraft desde un solo lugar.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#36393f] p-2 rounded-2xl border border-white/5">
          <div className="px-4 py-2 text-center">
            <div className="text-white font-black text-xl">{servers.length}</div>
            <div className="text-[10px] text-gray-500 uppercase font-black">Totales</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black rounded-xl text-sm hover:scale-105 transition-all">
            SUBIR A PRO
          </button>
        </div>
      </header>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-[#7289da] transition-colors" />
        <input 
          type="text" 
          placeholder="Buscar por nombre de servidor..." 
          className="w-full bg-[#36393f]/50 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#7289da] focus:bg-[#36393f] transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {servers.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((server) => (
          <motion.div 
            key={server.id}
            whileHover={{ x: 10, backgroundColor: 'rgba(54, 57, 63, 0.8)' }}
            onClick={() => setSelectedServer(server)}
            className="bg-[#36393f]/40 p-6 rounded-[2rem] border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-6">
              <ServerIcon server={server} />
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{server.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${server.status === 'online' ? 'text-[#43b581]' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-[#43b581] animate-pulse' : 'bg-gray-500'}`} />
                    {server.status === 'online' ? 'CONECTADO' : 'DESCONECTADO'}
                  </span>
                  <span className="text-white/10">|</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                    server.plan === 'premium_plus' ? 'text-purple-400 border-purple-500/30 bg-purple-500/5' :
                    server.plan === 'premium' ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' :
                    'text-gray-500 border-white/10'
                  }`}>
                    Plan {server.plan?.replace('_', '+') || 'Free'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-white font-bold">12 / 50</div>
                <div className="text-[10px] text-gray-500 font-black uppercase">Jugadores</div>
              </div>
              <button className="px-8 py-3 bg-[#7289da] hover:bg-[#5b6eae] text-white font-black rounded-xl transition-all shadow-lg shadow-[#7289da]/10 flex items-center gap-2">
                Gestionar <ChevronRightIcon />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // --- VISTA 2: PANEL DE GESTIÓN (MANAGE) ---
  const ServerManagePanel = () => {
    const plan = selectedServer.plan || 'free';

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Navigation Bar Interior */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setSelectedServer(null); setActiveTab('overview'); }}
              className="p-3 bg-[#36393f] text-gray-400 hover:text-white rounded-2xl border border-white/5 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter">{selectedServer.name}</h2>
              <p className="text-gray-500 text-sm font-medium">Panel de Control de Minecraft</p>
            </div>
          </div>
          
          <div className="flex bg-[#36393f] p-1.5 rounded-2xl border border-white/5">
            {['overview', 'console', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-[#7289da] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA: CONTENIDO SEGÚN PESTAÑA */}
          <div className="lg:col-span-2 space-y-8">
            
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon={<Users className="text-blue-400" />} label="Jugadores" value="14 / 50" sub="Online ahora" />
                  <StatCard 
                    icon={<Activity className="text-green-400" />} 
                    label="TPS" value="20.0" sub="Estable" 
                    locked={!isPremium(plan)} tier="Premium" color="green-400"
                  />
                  <StatCard 
                    icon={<Zap className="text-yellow-400" />} 
                    label="RAM" value="4.2 GB" sub="de 8 GB" 
                    locked={!isPremium(plan)} tier="Premium" color="yellow-400"
                  />
                  <StatCard 
                    icon={<ShieldCheck className="text-purple-400" />} 
                    label="CPU" value="12%" sub="Carga baja" 
                    locked={!isPremium(plan)} tier="Premium" color="purple-400"
                  />
                </div>

                {/* Graph Section (Premium+) */}
                <div className="bg-[#36393f] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
                  {!isPremiumPlus(plan) && <LockedFeature planRequired="Premium+" tierColor="purple-500" />}
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-white flex items-center gap-3">
                      <BarChart3 className="text-purple-500 w-6 h-6" /> Actividad de Jugadores (24h)
                    </h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      <span className="text-[10px] text-gray-500 font-black uppercase">Datos en tiempo real</span>
                    </div>
                  </div>
                  <div className="h-56 flex items-end gap-3 px-2">
                    {[35, 60, 40, 85, 55, 100, 30, 45, 90, 70, 50, 80, 40, 65].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }} 
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, type: 'spring' }}
                        className="flex-1 bg-gradient-to-t from-purple-500/5 via-purple-500/40 to-purple-500 rounded-t-xl group relative"
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                          {Math.floor(h/2)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                    <span>00:00</span><span>08:00</span><span>16:00</span><span>24:00</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'console' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1a1d23] rounded-[2.5rem] p-8 border border-white/5 h-[600px] flex flex-col relative overflow-hidden">
                {!isPremium(plan) && <LockedFeature planRequired="Premium" tierColor="blue-500" />}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-gray-500 font-mono text-xs">agente@servidor-mc ~ console</span>
                </div>
                <div className="flex-1 font-mono text-xs text-green-400 space-y-2 overflow-y-auto mb-6 custom-scrollbar">
                  <p className="text-gray-500">[14:02:31 INFO]: Starting minecraft server version 1.20.4</p>
                  <p className="text-gray-500">[14:02:35 INFO]: Loading properties...</p>
                  <p className="text-blue-400">[14:02:40 INFO]: Agent connected successfully (v1.0.2)</p>
                  <p>[14:03:01 INFO]: Player 'Steve' joined the game</p>
                  <p>[14:03:15 INFO]: TPS stable at 20.0</p>
                  <p className="animate-pulse">_</p>
                </div>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Escribe un comando... (ej: /say Hello)" 
                    className="flex-1 bg-[#36393f] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-xs outline-none focus:border-[#7289da]"
                  />
                  <button className="px-6 py-3 bg-[#7289da] text-white font-black rounded-xl text-xs hover:bg-[#5b6eae] transition-all">
                    EJECUTAR
                  </button>
                </div>
              </motion.div>
            )}

{activeTab === 'settings' && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#36393f] rounded-[2.5rem] p-10 border border-white/5 space-y-10">
    <div>
      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
        <Globe className="text-[#7289da]" /> Publicar en la Web Pública
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Campo IP */}
        <div className="space-y-3">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">IP del Servidor</label>
          <input 
            id="server-ip"
            type="text" 
            placeholder="mc.tuservidor.com"
            className="w-full bg-[#1a1d23] border border-white/5 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#7289da] transition-all"
          />
        </div>

        {/* Campo Categoría */}
        <div className="space-y-3">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Categoría</label>
          <select 
            id="server-type"
            className="w-full bg-[#1a1d23] border border-white/5 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#7289da] transition-all"
          >
            <option value="Survival">Survival</option>
            <option value="Skyblock">Skyblock</option>
            <option value="Minigames">Minigames</option>
            <option value="Factions">Factions</option>
          </select>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="text-sm text-gray-500 font-medium">
          <p>Al hacer clic en publicar, el servidor aparecerá en la lista de <span className="text-[#7289da]">mc-sm.vercel.app/servers</span></p>
        </div>
        
        <button 
          onClick={async () => {
            const ipValue = (document.getElementById('server-ip') as HTMLInputElement).value;
            const typeValue = (document.getElementById('server-type') as HTMLSelectElement).value;

            if(!ipValue) return alert("Por favor pon una IP");

            const { error } = await supabase
              .from('servers')
              .insert([
                { 
                  name: selectedServer.name, 
                  ip: ipValue, 
                  status: 'online', // Por defecto online al publicar
                  players_online: 0,
                  plan: 'premium', // Puedes cambiarlo segun necesites
                  type: typeValue
                }
              ]);

            if (error) {
              console.error(error);
              alert("Error al publicar: " + error.message);
            } else {
              alert("🚀 ¡Servidor publicado con éxito!");
            }
          }}
          className="px-10 py-5 bg-[#7289da] text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#7289da]/20 flex items-center gap-3 uppercase italic tracking-tighter"
        >
          <Save className="w-5 h-5" /> Publicar ahora
        </button>
      </div>
    </div>
  </motion.div>
)}
          </div>

          {/* COLUMNA DERECHA: ACCIONES RÁPIDAS Y PROMO */}
          <div className="space-y-6">
            {/* Server Health Card */}
            <div className="bg-[#36393f] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
              <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-gray-500" /> Acciones Rápidas
              </h3>
              <div className="space-y-3 relative z-10">
                <button className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" /> REINICIAR SERVIDOR
                </button>
                <button className="w-full py-4 bg-[#2f3136] hover:bg-[#43b581]/10 text-gray-400 hover:text-[#43b581] border border-white/5 rounded-2xl font-black text-xs transition-all">
                  ACTUALIZAR BOT
                </button>
              </div>
              {!isPremium(plan) && <div className="absolute inset-0 bg-[#1a1d23]/40 backdrop-blur-[2px] z-20" />}
            </div>

            {/* Premium Upsell Card */}
            {plan !== 'premium_plus' && (
              <div className="bg-gradient-to-br from-[#7289da] to-[#43b581] p-1 rounded-[2.5rem] shadow-2xl shadow-[#7289da]/20">
                <div className="bg-[#1a1d23] rounded-[2.3rem] p-8 text-center">
                  <div className="inline-flex p-4 bg-yellow-500/10 rounded-3xl mb-6">
                    <Crown className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-2 tracking-tight">Desbloquea el Agente</h4>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">Instala nuestro plugin en Spigot o Forge para obtener métricas en tiempo real y consola remota.</p>
                  <ul className="text-left space-y-3 mb-8">
                    {['TPS & RAM en vivo', 'Historial de Jugadores', 'Consola Web', 'Alertas de Crash'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-300">
                        <ShieldCheck className="w-4 h-4 text-[#43b581]" /> {item}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-5 bg-gradient-to-r from-[#7289da] to-[#43b581] text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
                    OBTENER PREMIUM
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const StatCard = ({ icon, label, value, sub, locked, tier, color }: any) => (
    <div className={`bg-[#36393f] p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-${color}/30 transition-all`}>
      {locked && (
        <div className="absolute inset-0 bg-[#1a1d23]/60 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 text-center">
          <Lock className="w-5 h-5 text-yellow-500 mb-1" />
          <span className="text-[8px] text-white font-black uppercase tracking-tighter">Requiere {tier}</span>
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        {React.cloneElement(icon, { size: 18 })}
        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-black text-white mb-1 group-hover:scale-110 transition-transform origin-left">{value}</div>
      <div className="text-[10px] text-gray-600 font-bold">{sub}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1d23] flex text-slate-200 selection:bg-[#7289da]/30">
      {/* Sidebar de Iconos (Discord Style) */}
      <aside className="w-24 bg-[#1a1d23] border-r border-white/5 flex flex-col items-center py-8 gap-6 shrink-0 sticky top-0 h-screen">
        <div 
          onClick={() => { setSelectedServer(null); setActiveTab('overview'); }}
          className="w-14 h-14 bg-[#36393f] rounded-[1.2rem] flex items-center justify-center cursor-pointer hover:rounded-2xl hover:bg-[#7289da] transition-all group"
        >
          <Server className="w-7 h-7 text-gray-400 group-hover:text-white" />
        </div>
        <div className="w-10 h-[2px] bg-white/5 rounded-full" />
        <div className="flex-1 flex flex-col gap-4">
          {servers.slice(0, 5).map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelectedServer(s)}
              className="w-14 h-14 cursor-pointer hover:scale-110 transition-transform"
            >
              <ServerIcon server={s} size="w-14 h-14" />
            </div>
          ))}
        </div>
        <button onClick={handleLogout} className="w-14 h-14 bg-[#36393f] text-gray-500 hover:text-red-400 rounded-full flex items-center justify-center transition-all">
          <LogOut className="w-6 h-6" />
        </button>
      </aside>

      {/* Area Principal */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-10 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-[#7289da] animate-spin" />
                <div className="absolute inset-0 blur-xl bg-[#7289da]/20 rounded-full" />
              </div>
              <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Sincronizando con Discord...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {selectedServer ? <ServerManagePanel key="manage" /> : <ServerList key="list" />}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="bg-[#1a1d23] h-screen" />}>
      <DashboardContent />
    </Suspense>
  );
}