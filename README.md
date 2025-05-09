# Food Search App

A **SvelteKit** application that lets users search foods from the FDA API, save favorites, and import/export data in CSV/JSON formats.
Includes user authentication with role-based (normal user vs. admin) access and a minimal admin dashboard for metrics and CRUD operations.

## Features

- **Food Search:** Query the FDA FoodData Central API with pagination (AJAX).
- **User Authentication:** Sign up, log in/out, session cookies (JWT) secured with `httpOnly`.
- **Role-Based Access:** Normal users can manage their favorites; admins have full CRUD over users & foods.
- **Favorites:** Add or delete foods from a personal favorites list.
- **Import/Export:** Bulk import and export favorites or foods in CSV and JSON (with PapaParse).
- **Admin Module:** Dashboard with summary cards (total users, foods, favorites), tables for managing users & foods with delete actions.

## Tech Stack

- **Framework:** SvelteKit (TypeScript)
- **Styling:** Tailwind CSS
- **Database:** SQLite via Prisma
- **API:** FDA FoodData Central API
- **Authentication:** JWT (JSON Web Tokens), `httpOnly` cookies, bcrypt for password hashing
- **CSV/JSON Parsing:** PapaParse for CSV, JSON.stringify for JSON
- **Input Validation:** Zod for schema validation
- **Code Formatting/Style:** Prettier, eslint for code formatting

## Getting Started

### Prerequisites

- Node.js (v18.13 or later)
- npm

### Installation

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy the `.env.example` file to `.env` and fill in the required environment variables.
   `FDC_API_KEY` is required for the FDA API and can be obtained from the [FDA FoodData Central API](https://fdc.nal.usda.gov/api-key-signup.html).
   `DATABASE_URL` is for SQLite, and `JWT_SECRET` is for signing JWT tokens and `COOKIE_SECRET` is for signing cookies.
   ```bash
   cp .env.example .env
   ```
3. Run the Prisma migration to set up the database & seed it with initial data.
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` to view the app.

## Admin Credentials

- **Email:** admin@example.com
- **Password:** AdminPass123
