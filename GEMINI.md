# Project Overview

This is a personal portfolio website built with [Next.js](https://nextjs.org/) and styled with [Tailwind CSS](https://tailwindcss.com/). The purpose of the project is to showcase the owner's work experience, skills, and education. The data is stored in a structured format in `src/data/cv.ts` and dynamically rendered by the components.

The project uses a modern tech stack, including:
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn UI
- **Animations**: Framer Motion
- **Database**: Vercel KV
- **Deployment**: Vercel

# Building and Running

To get started with the project, you need to have Node.js and npm (or yarn/pnpm/bun) installed.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the development server on [http://localhost:3000](http://localhost:3000).

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create an optimized production build of the application.

4.  **Start the production server:**
    ```bash
    npm run start
    ```
    This will start the production server.

# Development Conventions

- **Linting:** The project uses ESLint for code quality. You can run the linter with `npm run lint` and fix issues with `npm run lint:fix`.
- **Type Checking:** TypeScript is used for static type checking. You can run the type checker with `npm run type-check`.
- **Component Structure:** Components are organized in the `src/components` directory, with UI components in `src/components/ui`.
- **Data Separation:** The portfolio data is kept separate from the UI components in `src/data/cv.ts`.
- **CI/CD:** The project is set up with a CI/CD pipeline using GitHub Actions. The pipeline lints, type-checks, builds, and runs security audits before deploying to Vercel.
