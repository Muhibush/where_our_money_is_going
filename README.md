# Where Our Money Is Going 💰

A monorepo-based family budget tracking application with a Go backend and a React frontend.

## Project Structure

```text
.
├── apps/
│   ├── backend/      # Go API server (Chi Router, SQLite)
│   └── dashboard/    # React Frontend (Vite, TanStack Query, Tailwind CSS)
└── README.md
```

## Tech Stack

### Backend
- **Language**: [Go](https://go.dev/)
- **Router**: [go-chi/chi](https://github.com/go-chi/chi)
- **Database**: [SQLite](https://www.sqlite.org/)
- **Auth**: JWT (JSON Web Tokens) with Bcrypt password hashing

### Frontend
- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Google Material Symbols](https://fonts.google.com/icons)

## Getting Started

### Prerequisites
- Go 1.21+
- Node.js 18+

### Setup & Running

#### 1. Start the Backend
```bash
cd apps/backend
go run cmd/api/main.go
```
The server will start at `http://localhost:8080`.

#### 2. Start the Frontend
```bash
cd apps/dashboard
npm install
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

## Features
- ✅ User Registration & Login (JWT)
- ✅ Add Income/Expenses with Category
- ✅ Transaction History view
- ✅ Real-time updates via TanStack Query
- ✅ Dark Mode support
