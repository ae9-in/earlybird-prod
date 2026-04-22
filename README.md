# Early Bird - Premium Startup Landing Page

A high-converting, ultra-premium landing page for **Early Bird**, featuring modern startup aesthetics (Stripe/Apple-style), advanced scroll animations, and interactive 3D physics.

## 🚀 Features
- **Hero Section**: High-impact partnership visuals with horizontal gradient masking for perfect text legibility.
- **Process Timeline**: Elegant vertical timeline with massive decorative watermarks and animated SVG market graphs.
- **Strategy Section**: 3D Tilt interactive cards developed with Framer Motion.
- **Micro-interactions**: Magnetic buttons and hardware-accelerated scroll effects.
- **Database Schema**: Pre-configured `earlybird_schema.sql` for PostgreSQL/Neon.

## 🛠 Tech Stack
- React 19 + TypeScript
- Vite
- Framer Motion
- Lucide React Icons
- Vanilla CSS (for maximum design control)

## 📦 Deployment

### Vercel Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables
| Variable | Description |
| :--- | :--- |
| `VITE_NEON_DATABASE_URL` | Neon Postgres Connection String |
| `VITE_SITE_URL` | Production URL |

## 🏗 Structure
- `frontend/`: React + Vite application.
- `backend/`: Express.js server.

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node index.js
```

## 📄 License
MIT

