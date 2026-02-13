'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Settings, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const handleDashboardClick = () => {
    window.location.href = 'https://corporations-hampton-export-corporate.trycloudflare.com/auth/login';
  };

  const handleAddToDiscord = () => {
    // Discord bot invite link
    window.open('https://discord.com/api/oauth2/authorize?client_id=1471524993279070415&permissions=8&scope=bot', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7289da] rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#43b581] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7289da] rounded-full blur-[150px] opacity-10" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="border-b border-white/5 backdrop-blur-xl bg-[#36393f]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-xl flex items-center justify-center shadow-lg shadow-[#7289da]/30">
                  <span className="text-white font-black text-lg">MC</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">MC Monitor</span>
              </motion.div>

              {/* Center Nav Links */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hidden md:flex items-center gap-8"
              >
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  Home
                </a>
                <a href="#commands" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  Commands
                </a>
                <a href="#support" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  Support
                </a>
              </motion.div>

              {/* Login Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleDashboardClick}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7289da] to-[#43b581] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300" />
                <div className="relative px-6 py-2.5 bg-[#36393f] rounded-lg leading-none flex items-center gap-2">
                  <span className="text-white font-semibold">Login with Discord</span>
                </div>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                The Ultimate
                <br />
                <span className="bg-gradient-to-r from-[#7289da] via-[#43b581] to-[#7289da] text-transparent bg-clip-text animate-gradient">
                  Minecraft Monitor
                </span>
                <br />
                for Your Community
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
                Track your Minecraft server status in real-time. Get instant notifications, 
                view player counts, and monitor performance—all from Discord.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              {/* Primary Button */}
              <button
                onClick={handleAddToDiscord}
                className="group relative px-8 py-4 bg-[#7289da] text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#7289da]/50 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7289da] to-[#5b6eae] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Add to Discord
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Secondary Button */}
              <button
                onClick={handleDashboardClick}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Go to Dashboard
              </button>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              <div className="bg-[#36393f]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#7289da]/50 transition-all duration-300">
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-gray-400 font-medium">Uptime Monitoring</div>
              </div>
              <div className="bg-[#36393f]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#43b581]/50 transition-all duration-300">
                <div className="text-4xl font-black text-white mb-2">&lt;5s</div>
                <div className="text-gray-400 font-medium">Response Time</div>
              </div>
              <div className="bg-[#36393f]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#7289da]/50 transition-all duration-300">
                <div className="text-4xl font-black text-white mb-2">10k+</div>
                <div className="text-gray-400 font-medium">Active Servers</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose MC Monitor?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The most powerful Minecraft monitoring solution for Discord communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7289da] to-[#43b581] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-[#36393f] rounded-2xl p-8 h-full border border-white/10 hover:border-[#7289da]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7289da] to-[#5b6eae] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#7289da]/30">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">24/7 Status Updates</h3>
                <p className="text-gray-400 leading-relaxed">
                  Real-time monitoring of your Minecraft server. Get instant notifications when your server goes online, offline, or experiences issues.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#43b581] to-[#7289da] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-[#36393f] rounded-2xl p-8 h-full border border-white/10 hover:border-[#43b581]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#43b581] to-[#369f6b] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#43b581]/30">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Easy Setup</h3>
                <p className="text-gray-400 leading-relaxed">
                  Get started in under 2 minutes. Just add the bot, run one command, and you're monitoring your server. No technical knowledge required.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7289da] to-[#43b581] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-[#36393f] rounded-2xl p-8 h-full border border-white/10 hover:border-[#7289da]/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#7289da]/30">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Zero Lag</h3>
                <p className="text-gray-400 leading-relaxed">
                  Optimized infrastructure ensures lightning-fast updates without impacting your server performance. Monitor hundreds of servers effortlessly.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7289da] to-[#43b581] rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">MC</span>
                </div>
                <span className="text-gray-400 text-sm">© 2024 MC Monitor. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
