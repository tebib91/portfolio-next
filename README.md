# Portfolio - Next.js

This is a [Next.js](https://nextjs.org) portfolio project showcasing my work and experience.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Run TypeScript type checking

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn UI
- **Animations**: Framer Motion
- **Database**: Vercel KV
- **Deployment**: Vercel

## 🔄 CI/CD Pipeline

This project includes comprehensive GitHub Actions workflows:

### CI Pipeline
- ✅ **Lint**: Code quality checks with ESLint
- ✅ **Type Check**: TypeScript validation
- ✅ **Build**: Production build verification
- ✅ **Security Audit**: Dependency vulnerability scanning
- ✅ **CodeQL**: Automated security analysis

### Deploy Pipeline
- 🚀 Automatic deployment to Vercel on successful CI
- 🔒 Secure deployment with environment variables

See [`.github/workflows/README.md`](.github/workflows/README.md) for detailed documentation.

## 📦 Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── data/             # Static data (CV, etc.)
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── .github/workflows/    # CI/CD pipelines
```

## 🔐 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_BASE_URL` - Base URL for the application (optional)

For Vercel KV (if using):
- `KV_REST_API_URL` - Vercel KV REST API URL
- `KV_REST_API_TOKEN` - Vercel KV REST API token

## 🚢 Deployment

The project is configured for automatic deployment to Vercel:

1. Push to `main` or `master` branch
2. CI pipeline runs automatically
3. On success, deployment pipeline triggers
4. Application deploys to Vercel

### Manual Deployment

```bash
npm run build
npm run start
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Platform](https://vercel.com/new)
