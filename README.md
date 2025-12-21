# Syrian Renewables

A modern, professional, mobile-first full-stack web application for Syrian Renewables - an energy & sustainability consultancy agency serving users in Syria.

## 🌟 Features

- **Bilingual Support**: Arabic (RTL, default) and English with seamless toggle
- **Consultation Request System**: Users can submit renewable energy inquiries
- **Admin Dashboard**: Password-protected panel for managing requests
- **Mobile-First Design**: Fully responsive across all devices
- **Secure**: Rate limiting, honeypot spam protection, basic auth for admin
- **File Uploads**: Support for attaching images to consultation requests

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (optional - can use in-memory storage for development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khaled931/my-codex-app.git
   cd my-codex-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and configure:
   - `ADMIN_PASSWORD`: Set your admin password
   - PostgreSQL connection strings (optional)

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages & Routes

- `/` - Home page with hero, services, and company information
- `/submit` - Consultation request form
- `/services` - Detailed service descriptions
- `/about` - About Syrian Renewables
- `/admin` - Admin dashboard (password-protected)

## 🔐 Admin Access

- **URL**: `/admin`
- **Default Username**: `admin`
- **Password**: Set via `ADMIN_PASSWORD` in `.env.local` (default: `admin123`)

## 🌍 Services Offered

1. **Solar PV** - Solar system design and evaluation
2. **Wind Energy** - Wind project feasibility studies  
3. **Energy Storage** - Battery and storage solutions
4. **Energy Efficiency** - Optimize consumption and reduce costs
5. **Sustainability & ESG** - Environmental and governance strategies
6. **Project Due Diligence** - Technical and financial assessment
7. **Policy & Market** - Policy analysis and market opportunities

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Database**: PostgreSQL (via @vercel/postgres)
- **Icons**: React Icons
- **Fonts**: Cairo (Arabic), Inter (English)

## 📝 Form Features

- **Optional Fields**: Full Name, Phone, Email, City, Image
- **Required Field**: Message (minimum 10 characters)
- **Image Upload**: Supports JPG, PNG, WEBP up to 10MB
- **Validation**: Email format, message length
- **Privacy Notice**: Clear data usage policy

## 🔒 Security

- Basic authentication for admin panel
- Honeypot field for spam prevention
- Rate limiting (5 requests per minute per IP)
- Input validation and sanitization
- Secure file upload handling

## 🏗️ Project Structure

```
my-codex-app/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── services/          # Services page
│   ├── submit/            # Submission form
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LanguageToggle.tsx
├── lib/                   # Utilities and helpers
│   ├── auth.ts           # Authentication
│   ├── db.ts             # Database utilities
│   ├── translations.ts   # i18n translations
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
└── public/               # Static assets
```

## 🌐 Language Support

The application supports Arabic (RTL) and English (LTR):
- Default language: Arabic
- Language preference saved in localStorage
- Full RTL layout support for Arabic
- Comprehensive translations for all content

## 📊 Database Schema

**consultation_requests** table:
- `id` - UUID primary key
- `created_at` - Timestamp
- `full_name` - Text (nullable)
- `phone` - Text (nullable)
- `email` - Text (nullable)
- `city` - Text (nullable)
- `message` - Text (required)
- `image_url` - Text (nullable)
- `status` - Enum: new, in_review, replied, closed
- `admin_notes` - Text (nullable)

## 🎨 Design System

- **Colors**: Green primary (#16a34a), Green secondary (#22c55e)
- **Typography**: Cairo for Arabic, Inter for English
- **Components**: Cards with subtle shadows, generous spacing
- **Accessibility**: Proper contrast ratios, semantic HTML

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🚢 Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

For database, set up Vercel Postgres and add the connection strings to your environment variables.

## 📄 License

All rights reserved © 2025 Syrian Renewables

## 🤝 Contributing

This is a private project for Syrian Renewables. For inquiries, contact: info@syrianrenewables.com

---

**Built with ❤️ for a sustainable future in Syria**
