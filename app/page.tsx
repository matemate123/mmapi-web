'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Settings, ArrowRight, Download, MessageSquare, Shield, FileText } from 'lucide-react';

export default function LandingPage() {
  // --- ESTADOS PARA DATOS REALES ---
  const [serverCount, setServerCount] = useState(12432); // Aquí conectarás tu API luego
  const [responseTime, setResponseTime] = useState('< 5s');

  // Lógica especial: 11 -> 10+, 23 -> 20+, etc.
  const formatActiveServers = (num: number) => {
    if (num < 10) return num.toString();
    const rounded = Math.floor(num / 10) * 10;
    return `${(rounded / 1000).toFixed(0)}k+`; // Para mostrar 10k+
  };

  const handleDashboardClick = () => {
    window.location.href = 'https://corporations-hampton-export-corporate.trycloudflare.com/auth/login';
  };

  const handleAddToDiscord = () => {
    window.open('https://discord.com/api/oauth2/authorize?client_id=1471524993279070415&permissions=8&scope=bot', '_blank');
  };

  const handleSupport = () => {
    window.open('https://discord.gg/tu-invitacion', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7289da] rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#43b581] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="border-b border-white/5 backdrop-blur-xl bg-[#36393f]/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">MC</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">MC Monitor</span>
              </motion.div>

              <div className="hidden md:flex items-center gap-8">
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Home</a>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
                <button onClick={handleSupport} className="text-gray-300 hover:text-white transition-colors font-medium">Support</button>
              </div>

              <div className="flex items-center gap-3">
                {/* BOTÓN DESCARGAR (Nuevo) */}
                <button 
                  onClick={() => alert("Desktop App coming soon! Stay tuned in our Discord.")}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all text-sm font-bold"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                
                <button onClick={handleDashboardClick} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7289da] to-[#43b581] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300" />
                  <div className="relative px-5 py-2 bg-[#36393f] rounded-lg text-white font-bold text-sm">
                    Login
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white mb-6">
            The Ultimate <br />
            <span className="bg-gradient-to-r from-[#7289da] via-[#43b581] to-[#7289da] text-transparent bg-clip-text animate-gradient">Minecraft Monitor</span>
          </motion.h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
            Track your status 24/7. Get instant notifications and monitor performance—all from Discord.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button onClick={handleAddToDiscord} className="group px-8 py-4 bg-[#7289da] text-white font-bold rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-[#7289da]/20">
              Add to Discord <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleDashboardClick} className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              Go to Dashboard
            </button>
          </div>

          {/* Stats Preview DINÁMICOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#36393f]/50 p-8 rounded-3xl border border-white/10">
              <div className="text-4xl font-black text-[#43b581] mb-1">24/7</div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-widest">Uptime Monitoring</div>
            </div>
            <div className="bg-[#36393f]/50 p-8 rounded-3xl border border-white/10">
              <div className="text-4xl font-black text-blue-400 mb-1">{responseTime}</div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-widest">Response Time</div>
            </div>
            <div className="bg-[#36393f]/50 p-8 rounded-3xl border border-white/10">
              <div className="text-4xl font-black text-[#7289da] mb-1">{formatActiveServers(serverCount)}</div>
              <div className="text-gray-500 text-xs font-black uppercase tracking-widest">Active Servers</div>
            </div>
          </div>
        </section>

        {/* Features ID para el scroll */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<Activity />} title="Live Status" desc="Real-time monitoring without impacting your server performance." />
            <FeatureCard icon={<Zap />} title="Easy Setup" desc="One command, zero config. Ready for your community in seconds." />
            <FeatureCard icon={<Settings />} title="Advanced Tools" desc="From console access to detailed player analytics." />
          </div>
        </section>

        {/* Footer FUNCIONAL */}
        <footer className="border-t border-white/5 py-12 bg-[#1a1d23]">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">MC</span>
              </div>
              <span className="text-gray-500 text-sm font-bold">© 2026 MC Monitor. All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <FooterLink onClick={() => alert("Privacy: We only store basic Guild IDs for monitoring.")} icon={<Shield />} label="Privacy" />
              <FooterLink onClick={() => alert("Terms: Respect Mojang EULA and don't abuse the API.")} icon={<FileText />} label="Terms" />
              <FooterLink onClick={handleSupport} icon={<MessageSquare />} label="Support" />
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#36393f] p-8 rounded-2xl border border-white/10 hover:border-[#7289da]/40 transition-all group">
      <div className="w-12 h-12 bg-[#1a1d23] rounded-xl flex items-center justify-center mb-6 text-[#7289da] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function FooterLink({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
      <span className="opacity-50">{icon}</span> {label}
    </button>
  );
}