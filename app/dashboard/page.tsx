"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            // Guardamos el token para no perderlo
            localStorage.setItem('discord_token', tokenFromUrl);
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>✅ ¡Login Exitoso!</h1>
            <p>Bienvenido al panel de control de tu servidor.</p>
            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                <strong>Tu Token es:</strong> 
                <code style={{ wordBreak: 'break-all' }}> {token}</code>
            </div>
            <p>Próximo paso: Cargar tus servidores de Discord...</p>
        </div>
    );
}
