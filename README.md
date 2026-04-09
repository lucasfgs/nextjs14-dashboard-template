This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Cognito / Amplify configuration

This template includes optional Cognito-backed authentication flows. To enable them, set the following environment variables:

```bash
COGNITO_POOL_ID=
COGNITO_APP_CLIENT_ID=
```

If these variables are not set, the app will still boot and non-auth routes will continue to render. Authentication pages and guards will simply treat the user as signed out until the configuration is provided.

`AuthenticatorProvider` is mounted from the root layout so shared UI can use Amplify UI when auth is enabled. The provider is a no-op on public routes when Cognito configuration is absent, which keeps the app safe to render without auth env vars.

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Next.js Learn](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) for more information and contribute to the project.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of create-next-app.

Check out the Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
