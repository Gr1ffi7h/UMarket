# UMarket - College Student Marketplace

A secure, full-stack marketplace application built exclusively for college students with .edu email verification.

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (serverless)
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── api/            # API endpoints (serverless functions)
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/          # Reusable UI components
│   └── Button.tsx      # Example button component
├── lib/                # Utility functions and helpers
│   └── env.ts          # Environment variable utilities
├── server/             # Server-side only functions
│   └── utils.ts        # Server utilities
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS and custom styles
└── types/              # TypeScript type definitions
    └── index.ts        # Shared types
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UMarket
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel Deployment

This project is optimized for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on `git push`

### Environment Variables

Required variables for production:

- `NEXTAUTH_SECRET`: Authentication secret
- `NEXTAUTH_URL`: Application URL
- `NODE_ENV`: Set to 'production'

See `.env.example` for all available variables.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Architecture Guidelines

### Server vs Client Components

- **Server Components**: Default, no client-side JavaScript
- **Client Components**: Use `'use client'` directive for interactivity

### Environment Variables

- Use `src/lib/env.ts` for safe environment variable access
- Always provide fallbacks for optional variables
- Validate required variables on startup

### API Routes

- Located in `src/app/api/`
- Use serverless-compatible patterns
- Implement proper error handling and validation

## 🔒 Security Features

- Security headers configured in `next.config.ts`
- Environment variable validation
- Input sanitization utilities
- CSRF protection via Next.js

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Optimized for all screen sizes
- Touch-friendly interface

## 🧪 Testing

Before deployment:

```bash
# Build check
npm run build

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📈 Performance Optimization

- Next.js Image optimization
- Font optimization with `next/font`
- Component-level code splitting
- Serverless function optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ for college students**
