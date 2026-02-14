'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Zap, Settings, ArrowRight, Download, 
  MessageSquare, Shield, FileText, LayoutGrid, Search 
} from 'lucide-react';

export default function LandingPage() {
  const [serverCount] = useState(12432);

  const formatActiveServers = (num: number) => {
    if (num < 1000) return `${Math.floor(num / 10) * 10}+`;
    return `${Math.floor(num / 1000)}k+`;
  };

  const handleDashboardClick = () => {
    window.location.href = 'https://corporations-hampton-export-corporate.trycloudflare.com/auth/login';
  };

  const handleSupport = () => window.open('https://discord.gg/tu-servidor', '_blank');

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white selection:bg-[#7289da]/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-[#7289da]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-[#43b581]/5 rounded-full blur-[100px]" />
      </div>

      <nav className="border-b border-white/5 backdrop-blur-md bg-[#1a1d23]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-xl flex items-center justify-center">
                <span className="font-black text-white italic">MCM</span>
              </div>
              <span className="font-black text-xl tracking-tighter">MC MONITOR</span>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="/servers" className="text-[#7289da] flex items-center gap-2 font-black italic">
                <LayoutGrid className="w-4 h-4" /> Servers
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => alert("Soon!")} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-black uppercase tracking-widest border border-white/5 transition-all">
              <Download className="w-4 h-4" /> Download
            </button>
            <button onClick={handleDashboardClick} className="px-6 py-2.5 bg-[#7289da] hover:bg-[#5b6eae] rounded-lg text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Login
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            DISCOVER VERIFIED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7289da] to-[#43b581]">MINECRAFT SERVERS</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search by server name..." className="w-full bg-[#36393f]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#7289da]/50 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StatBox label="Uptime" value="24/7" color="text-[#43b581]" />
            <StatBox label="Response" value="< 5s" color="text-blue-400" />
            <StatBox label="Active Servers" value={formatActiveServers(serverCount)} color="text-[#7289da]" />
          </div>
        </section>

        <section id="pricing" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Choose your plan</h2>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">Upgrade to Premium to increase visibility</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard 
              tier="Free" 
              price="0" 
              color="#43b581" 
              tag="Common Artifact"
              features={["7 Days History", "Basic Discord", "Standard Support"]}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#1a1d23] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2026 MC MONITOR</span>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <button onClick={() => alert("Privacy")}>Privacy</button>
            <button onClick={() => alert("Terms")}>Terms</button>
            <button onClick={handleSupport}>Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// COMPONENTES DE APOYO (Fuera de LandingPage)
function StatBox({ label, value, color }: any) {
  return (
    <div className="bg-[#36393f]/30 p-10 rounded-[2.5rem] border border-white/5 group transition-all hover:bg-[#36393f]/50">
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{label}</p>
      <div className={`text-5xl font-black mb-2 tracking-tighter ${color} group-hover:scale-105 transition-transform`}>
        {value}
      </div>
    </div>
  );
}

function PricingCard({ tier, price, color, tag, features }: any) {
  const imageSrc = tier === 'Free' ? '/images/free.png' : '/images/premium_placeholder.png';
  return (
    <motion.div whileHover={{ y: -12 }} className="relative group">
      <div className="absolute -inset-2 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-30 transition-all" style={{ backgroundColor: color }} />
      <div className="relative bg-[#2f3136] p-[2px] rounded-[2.5rem] overflow-hidden">
        <div className="bg-[#1a1d23] rounded-[2.4rem] p-6 flex flex-col h-full min-h-[550px]">
          <div className="flex justify-between items-center mb-6 border-b-2 border-white/5 pb-4">
            <span className="font-black text-2xl uppercase italic text-white">{tier}</span>
            <p className="font-black text-xs uppercase italic" style={{ color }}>{tag}</p>
          </div>
          <div className="relative w-full h-56 bg-black/20 rounded-2xl mb-8 flex items-center justify-center border border-white/5">
            <motion.img 
              src={imageSrc} 
              className="w-40 h-40 object-contain z-10" 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-white">${price}</span>
              <span className="text-gray-500 text-xs font-bold">/ Month</span>
            </div>
            <ul className="space-y-3">
              {features.map((f: any) => (
                <li key={f} className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-8 w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg" style={{ backgroundColor: color }}>
            Select Card
          </button>
        </div>
      </div>
    </motion.div>
  );
}