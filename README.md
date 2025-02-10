# LegisLab

LegisLab is a modern web application for monitoring and analyzing activities in the Brazilian National Congress. Built with Next.js, TypeScript, and Supabase, it provides real-time updates on legislative activities, voting sessions, and parliamentary actions.
Right now, it's in development, so the data is fake and some features are not implemented yet.
In the future, it will be linked to the real data from the Brazilian National Congress.

## Features

- **Real-time Monitoring**: Track legislative activities and voting sessions as they happen
- **Personalized Alerts**: Set up custom notifications for specific topics, bills, or parliamentary actions
- **Parliamentary Analysis**: Access detailed information about congress members and their activities
- **Expense Tracking**: Monitor and analyze parliamentary expenses
- **Interactive Dashboard**: Visualize congressional data through an intuitive interface

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend and Authentication
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Recharts](https://recharts.org/) - Data visualization

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

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