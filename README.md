# 🌟 Shadow Forge - AI Web Design Agency

A modern, production-ready website for Shadow Forge - an AI-powered web design and development agency.

## 📁 Project Structure

```
shadow-forge/
├── public/
│   └── assets/
│       ├── projects/          # Project portfolio images (4 files)
│       │   ├── DevlopersBlog.png
│       │   ├── Portfolio.png
│       │   ├── SmileCareDentalClinic.png
│       │   └── Spice-and-Soul.png
│       └── services/          # Service images (5 files)
│           ├── SEO.png
│           ├── ai_chatbot.png
│           ├── api_integration.png
│           ├── shadow-forge-logo.png
│           └── website_maintenance.png
├── components/                # React components
├── convex/                    # Convex backend
├── index.html                 # Main HTML file (PRODUCTION READY)
├── index.tsx                  # React entry point
├── App.tsx                    # Main App component
└── package.json
```

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Features

- ✅ **Modern Design**: Clean, professional UI with smooth animations
- ✅ **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards
- ✅ **Performance**: Lazy loading, code splitting, optimized assets
- ✅ **AI Integration**: ElevenLabs chatbot for customer engagement
- ✅ **Email Integration**: Contact form with Convex + Resend
- ✅ **Mobile Responsive**: Fully responsive across all devices
- ✅ **Production Ready**: Single index.html, optimized build config

## 📦 Assets

All images are stored in `public/assets/` and served from `/assets/` path:

### Services (5 images)

- SEO Optimization (593 KB)
- AI Chatbot Integration (525 KB)
- API Integration (610 KB)
- Website Maintenance (633 KB)
- Shadow Forge Logo (1.36 MB)

### Projects (4 images)

- Developers Blog (195 KB)
- Portfolio Website (248 KB)
- Smile Care Dental Clinic (576 KB)
- Spice and Soul Restaurant (2.50 MB)

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
VITE_CONVEX_URL=your_convex_url
```

### Vite Config

Production optimizations included:

- Terser minification
- Console.log removal in production
- Manual chunk splitting for better caching
- Asset optimization

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
netlify deploy --prod
```

### Other Platforms

1. Run `npm run build`
2. Deploy the `dist/` folder
3. Configure server to serve `index.html` for all routes

## 📊 Performance

- **Lazy Loading**: Images load on demand
- **Code Splitting**: Vendor chunks separated
- **Asset Optimization**: Preload critical resources
- **SEO**: Complete meta tags and structured data

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Build Tool**: Vite
- **Backend**: Convex
- **Email**: Resend
- **AI**: ElevenLabs

## 📝 Notes

- Single `index.html` file - no extra HTML files
- All images in `public/assets/` folder
- Logo used for favicon and navbar
- Production build removes console.logs
- Fully optimized for deployment

## 📞 Contact

- **Email**: harishmkdev@gmail.com
- **Phone**: +91 9025946625

## 📄 License

Private - All rights reserved © Shadow Forge 2026
