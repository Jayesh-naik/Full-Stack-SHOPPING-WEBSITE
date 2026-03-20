# My-Store React Ecommerce

Full-stack shopping experience built with React, Tailwind CSS, and a Node.js + MongoDB backend. The app now includes secure account creation and login so shoppers can authenticate before continuing their journey.

## ✨ Features

- Product catalogue, detail pages, and shopping cart UI
- JWT-based authentication with encrypted passwords stored in MongoDB
- Combined login / registration screen with responsive Tailwind styling
- Stateless REST API with Express, Mongoose, and CORS safeguards
- Local persistence of auth state with automatic token validation on refresh

## 📁 Project structure

```
react-ecommerce/
├── server/                # Express + MongoDB backend
│   ├── src/
│   │   ├── config/        # Database connection helper
│   │   ├── middleware/    # JWT verification middleware
│   │   ├── models/        # Mongoose models
│   │   └── routes/        # Auth REST endpoints
│   ├── .env.example       # Backend environment variables
│   └── package.json
├── src/                   # React front-end
│   ├── context/           # Auth context provider + hook
│   ├── pages/
│   │   └── login.js       # Combined login/register page
│   └── services/          # API helpers for auth
├── .env.example           # Front-end environment variables
└── README.md
```

## ✅ Prerequisites

- Node.js 18+ and npm 9+
- A MongoDB connection string (Atlas or self-hosted)

## 🔐 Environment variables

### Backend (`server/.env`)

Copy the example file and fill in your secrets:

```bash
cd server
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Random string used to sign JWTs |
| `PORT` | Port for the API server (defaults to 4000) |
| `CLIENT_ORIGIN` | Optional comma-separated list of allowed front-end origins |
| `USE_IN_MEMORY_DB` | Set to `true` to skip external Mongo and use an ephemeral in-memory database |

### Front-end (`.env`)

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `REACT_APP_API_BASE_URL` | Base URL of the backend API |

## 🚀 Local development

Install dependencies once at the repo root (front-end) and inside the backend folder:

```bash
npm install
cd server && npm install
```

Then start both apps in separate terminals:

**Backend**

```bash
cd server
npm run dev
```

**Front-end**

```bash
npm start
```

The React app runs on [http://localhost:3000](http://localhost:3000) and proxies API calls to the backend at [http://localhost:4000](http://localhost:4000) (or your custom values).

## 🔌 Auth API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a new account. Body: `{ name, email, password }` |
| `POST` | `/api/auth/login` | Authenticate an existing user. Body: `{ email, password }` |
| `GET` | `/api/auth/me` | Validate the bearer token and fetch the profile |

Responses include a JWT `token` and a sanitized `user` object. Front-end stores auth state in `localStorage` and automatically revalidates on refresh.

## 🧪 Testing & quality checks

- Front-end tests: `npm test`
- Front-end build: `npm run build`
- Backend linting (optional): integrate your preferred tool (e.g. ESLint)

Before deploying, ensure both the build and backend server start cleanly with your production environment variables.

## 📚 Additional notes

- Update `CLIENT_ORIGIN` when deploying the front-end to a different domain.
- Replace the placeholder JWT secret with a long, randomly generated string.
- For production, consider using HTTPS and secure cookies for token storage.

<img width="943" height="448" alt="image" src="https://github.com/user-attachments/assets/92423195-9b82-4739-acea-2511c825650e" />
<img width="937" height="449" alt="image" src="https://github.com/user-attachments/assets/f5fb0d40-84ff-4fd9-9249-5c8244e5d010" />
<img width="922" height="439" alt="image" src="https://github.com/user-attachments/assets/163010c9-a5cc-4be0-946c-94fbdedc54e7" />
<img width="926" height="431" alt="image" src="https://github.com/user-attachments/assets/a42c427a-61cc-464a-89cf-
792275421bd4" />
<img width="531" height="422" alt="image" src="https://github.com/user-attachments/assets/c58ccd99-af7b-4683-bf01-f834eaf6763c" />


