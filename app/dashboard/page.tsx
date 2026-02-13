"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

// 1. Creamos un componente pequeño para el contenido del Dashboard
function DashboardContent() {
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            localStorage.setItem('discord_token', tokenFromUrl);
            setToken(tokenFromUrl);
        } else {
            // Si no hay token en la URL, buscamos en el almacenamiento local
            const savedToken = localStorage.getItem('discord_token');
            setToken(savedToken);
        }
    }, [searchParams]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
            <h1>✅ ¡Dashboard Conectado!</h1>
            <p>Bienvenido al panel de control de tu servidor.</p>
            <div style={{ background: '#eef2ff', border: '1px solid #6366f1', padding: '15px', borderRadius: '8px' }}>
                <strong>Tu Token de Acceso:</strong> 
                <p style={{ wordBreak: 'break-all', fontSize: '12px', color: '#444' }}>
                    {token ? token : "Cargando..."}
                </p>
            </div>
            <p style={{ marginTop: '20px' }}>🚀 Próximo paso: Obtener la lista de servidores.</p>
        </div>
    );
}

// 2. La página principal envuelve el contenido en un Suspense
export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Cargando dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
