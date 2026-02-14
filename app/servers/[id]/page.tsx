import { supabase } from '@/lib/supabase';
import { ArrowLeft, Globe, Users, Activity, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function ServerDetails({ params }: { params: { id: string } }) {
  // Buscamos el servidor específico por ID en Supabase
  const { data: server, error } = await supabase
    .from('servers')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !server) {
    return (
      <div className="min-h-screen bg-[#1a1d23] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">404</h1>
          <p className="text-gray-500 mb-8 font-bold">Server not found in our database</p>
          <Link href="/servers" className="px-6 py-3 bg-[#7289da] rounded-xl font-black uppercase text-xs">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white selection:bg-[#7289da]/30">
      {/* Header Estético */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://wallpaperaccess.com/full/127110.jpg" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-7xl mx-auto px-10 pb-10 w-full">
          <Link href="/servers" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to List</span>
          </Link>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">{server.name}</h1>
          <p className="text-[#7289da] font-bold text-lg">{server.ip}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#2f3136]/30 border border-white/5 rounded-[2.5rem] p-10">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Server Live Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCard icon={<Users className="text-[#43b581]"/>} label="Players" value={`${server.players_online || 0}`} />
                <StatCard icon={<Activity className="text-[#7289da]"/>} label="Status" value={server.status} color={server.status === 'online' ? 'text-green-500' : 'text-red-500'} />
                <StatCard icon={<Globe className="text-yellow-500"/>} label="Version" value={server.version || '1.20.x'} />
                <StatCard icon={<Clock className="text-purple-500"/>} label="Plan" value={server.plan || 'Standard'} />
              </div>
            </div>
            
            {/* Espacio para la descripción o reglas */}
            <div className="bg-[#2f3136]/30 border border-white/5 rounded-[2.5rem] p-10">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed font-medium">
                Welcome to {server.name}. This server is part of our monitored network. 
                Enjoy a low-latency experience and join our growing community.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Sidebar de detalles */}
          <div className="space-y-6">
            <button className="w-full py-6 bg-[#7289da] hover:bg-[#5b6eae] rounded-[1.5rem] font-black uppercase tracking-widest transition-all shadow-lg shadow-[#7289da]/20">
              Copy Server IP
            </button>
            <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6">
              <h3 className="text-[10px] font-black uppercase text-gray-500 mb-4">Last Update</h3>
              <p className="text-xs font-bold">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color = "text-white" }: any) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</span>
      </div>
      <p className={`text-xl font-black uppercase italic ${color}`}>{value}</p>
    </div>
  );
}
