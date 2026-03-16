# Gray Solutions

Agency website for Gray Solutions — a product design and technology studio based in Coimbatore.

## Tech Stack

- Frontend: React 18 + TypeScript + Vite + Tailwind CSS v4
- Backend: Express.js + TypeScript
- Database: Neon Postgres + Drizzle ORM
- Routing: Wouter
- Animations: Framer Motion

## Project Structure

```
client/       React frontend (Vite)
server/       Express backend
shared/       Shared TypeScript types & Drizzle schema
```

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/Praveen1718123/graysolutions.git
cd graysolutions
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

### 3. Push database schema

```bash
npm run db:push
```

### 4. Run in development

```bash
npm run dev
```

Runs at http://localhost:5000
