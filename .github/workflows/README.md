# GitHub Actions Workflows

This repository includes comprehensive CI/CD pipelines for automated testing, building, and deployment.

## Workflows

### 1. CI Pipeline (`ci.yml`)

Runs on every push and pull request to `main`, `master`, or `develop` branches.

**Jobs:**
- **Lint**: Runs ESLint to check code quality
- **Type Check**: Validates TypeScript types
- **Build**: Builds the Next.js application to ensure it compiles
- **Security Audit**: Runs `npm audit` to check for known vulnerabilities
- **All Checks Status**: Aggregates results from all jobs

**Features:**
- Parallel job execution for faster CI
- Caching for faster builds
- Timeout protection (10-15 minutes per job)
- Concurrency control to cancel duplicate runs

### 2. Deploy Pipeline (`deploy.yml`)

Automatically deploys to Vercel after successful CI runs on `main` or `master` branches.

**Requirements:**
- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

**Setup:**
1. Go to Vercel Dashboard → Settings → Tokens
2. Create a new token
3. Add it as `VERCEL_TOKEN` in GitHub Secrets
4. Get your Org ID and Project ID from Vercel project settings
5. Add them as secrets in GitHub

### 3. CodeQL Analysis (`codeql.yml`)

Automated security scanning using GitHub's CodeQL engine.

**Features:**
- Runs on push, PR, and weekly schedule
- Analyzes JavaScript/TypeScript code
- Detects security vulnerabilities

## Local Development

Before pushing, you can run the same checks locally:

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Build
npm run build
```

## Secrets Configuration

Required GitHub Secrets (if using Vercel deployment):

- `VERCEL_TOKEN`: Vercel authentication token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `NEXT_PUBLIC_BASE_URL`: (Optional) Base URL for your application

## Workflow Status

You can view workflow status:
- In the "Actions" tab of your GitHub repository
- As status badges in your README
- In pull request checks

## Troubleshooting

### Build fails
- Check if all dependencies are properly installed
- Verify environment variables are set correctly
- Check Next.js build logs for specific errors

### Type check fails
- Run `npm run type-check` locally to see errors
- Fix TypeScript errors before pushing

### Lint fails
- Run `npm run lint:fix` to auto-fix some issues
- Manually fix remaining linting errors

