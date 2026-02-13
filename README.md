# 🎮 MC Monitor - Minecraft Server Dashboard

A professional, modern dashboard for monitoring Minecraft servers, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Inspired by Nekotina's aesthetic.

![Dashboard Preview](https://via.placeholder.com/1200x600/1a1d23/7289da?text=MC+Monitor+Dashboard)

## ✨ Features

### 🎨 Modern Design
- **Dark Mode** professional UI with Discord-inspired colors (#36393f, #7289da, #43b581)
- **Smooth Animations** powered by Framer Motion
- **Responsive Layout** works perfectly on mobile, tablet, and desktop
- **Gradient Accents** subtle gradients and glow effects
- **Grid Background** with animated blobs for depth

### 🚀 Key Components

#### Landing Page (`app/page.tsx`)
- **Navbar**: Logo, navigation links, and Discord login button
- **Hero Section**: Eye-catching title with animated gradient text
- **CTA Buttons**: "Add to Discord" and "Go to Dashboard"
- **Stats Preview**: 24/7 uptime, response time, active servers
- **Features Section**: 3 cards showcasing key benefits
- **Footer**: Copyright and links

#### Dashboard (`app/dashboard/page.tsx`)
- **Sidebar**: Navigation with icons (My Servers, Settings, Logout)
- **User Greeting**: Personalized welcome message
- **Search Bar**: Real-time server filtering
- **Server List**: Horizontal cards with server info
- **Loading States**: Elegant skeleton loaders
- **Empty States**: Helpful messages when no servers found

### 🔧 Technical Stack
- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **React 18** with hooks
- **Tailwind CSS 3** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Custom Discord color palette**

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Your tunnel URL (e.g., from Cloudflare, ngrok)

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 2: Configure Your Tunnel URL

Replace `TU_URL_DEL_TUNEL` in both files with your actual tunnel URL:

**In `app/page.tsx`:**
```typescript
// Line ~40
const handleDashboardClick = () => {
  window.location.href = 'https://your-tunnel-url.trycloudflare.com/auth/login';
};

// Line ~45
const handleAddToDiscord = () => {
  window.open('https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot', '_blank');
};
```

**In `app/dashboard/page.tsx`:**
```typescript
// Line ~40
const response = await fetch(`https://your-tunnel-url.trycloudflare.com/auth/guilds?token=${token}`);

// Line ~51
window.location.href = 'https://your-tunnel-url.trycloudflare.com/auth/login';
```

### Step 3: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🔌 API Integration

### Expected Endpoints

#### Login Redirect
```
GET /auth/login
```
Redirects to Discord OAuth and returns with token

#### Get User's Guilds
```
GET /auth/guilds?token={discord_token}
```

**Expected Response:**
```json
[
  {
    "id": "1234567890",
    "name": "Awesome Server",
    "icon": "icon_hash_or_null",
    "memberCount": 1250,
    "status": "online"
  }
]
```

**Fields:**
- `id` (string): Discord server/guild ID
- `name` (string): Server name
- `icon` (string|null): Icon hash (null for no icon)
- `memberCount` (number): Number of members
- `status` (string): "online" or "offline"

### Token Management

The dashboard automatically:
1. **Captures** the token from URL query parameter (`?token=...`)
2. **Stores** it in `localStorage` as `discord_token`
3. **Uses** it for API requests
4. **Clears** it on logout

## 🎨 Customization

### Colors

Colors are defined in `tailwind.config.js`:

```javascript
colors: {
  nekotina: {
    dark: '#1a1d23',      // Main background
    darker: '#16181d',    // Darker sections
    card: '#36393f',      // Card backgrounds
    border: 'rgba(255, 255, 255, 0.05)', // Borders
    blue: '#7289da',      // Primary actions
    blueHover: '#5b6eae', // Hover states
    green: '#43b581',     // Success/online
    greenHover: '#369f6b', // Green hover
  },
}
```

### Fonts

The project uses **Inter** font family with multiple weights (300-900). You can change this in `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;600;700&display=swap');

body {
  font-family: 'YOUR_FONT', sans-serif;
}
```

### Animations

Framer Motion animations can be customized in component files:

```typescript
// Example: Change card entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }} // Adjust duration
>
```

## 📁 Project Structure

```
minecraft-monitor-dashboard/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page with server list
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies
```

## 🚨 Important Notes

### Suspense Wrapper
The dashboard page uses `<Suspense>` to prevent pre-rendering errors in Vercel:

```typescript
export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <DashboardContent />
    </Suspense>
  );
}
```

### URL Parameter Handling
Uses Next.js 14's `useSearchParams()` hook:

```typescript
const searchParams = useSearchParams();
const token = searchParams.get('token');
```

### LocalStorage
Token is stored in browser's localStorage for persistence:

```typescript
localStorage.setItem('discord_token', token);
localStorage.getItem('discord_token');
localStorage.removeItem('discord_token');
```

## 🐛 Troubleshooting

### "useSearchParams not working"
Make sure the component using `useSearchParams()` is:
1. Marked with `'use client'`
2. Wrapped in `<Suspense>`

### "Cannot find module 'lucide-react'"
Install dependencies:
```bash
npm install lucide-react
```

### API not responding
1. Check your tunnel is running
2. Verify the URL in the code matches your tunnel
3. Check CORS settings on your backend

### Build errors in Vercel
Make sure:
1. Node version is 18+
2. All environment variables are set
3. TypeScript has no errors (`npm run build`)

## 📝 License

MIT License - feel free to use this for your Minecraft monitoring projects!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Support

For issues or questions, please create an issue on the repository.

---

**Made with ❤️ for the Minecraft community**
