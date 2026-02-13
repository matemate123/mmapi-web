import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MC Monitor - Minecraft Server Dashboard',
  description: 'The ultimate Minecraft monitoring solution for Discord communities. Track server status, player counts, and performance in real-time.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
