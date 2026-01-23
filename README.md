# UniLocker - Universal Authentication System

A full-stack authentication application with Express backend and React frontend.

## Project Structure

```
.
├── server.js                 # Backend Express server
├── src/                      # Frontend React application
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   ├── components/          # React components
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProfileForm.jsx
│   │   └── UsersList.jsx
│   ├── context/             # React context for state
│   │   └── AuthContext.jsx
│   └── services/            # API communication
│       └── api.js
├── supabase/               # Database migrations
│   └── migrations/
└── package.json            # Project dependencies
```

## Features

- **User Authentication**: Register, login, and manage accounts
- **Profile Management**: Update your profile information
- **User Directory**: View all registered users
- **Secure Sessions**: Token-based authentication
- **Responsive Design**: Works on all device sizes

## Backend API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/profile` - Get current user's profile
- `PUT /api/auth/profile` - Update user's profile
- `DELETE /api/auth/profile` - Delete user account
- `POST /api/auth/logout` - Logout user
- `GET /api/users` - Get all users
- `GET /api/health` - Health check

## Running the Application

### Backend (Express Server)
```bash
npm run dev
# Server will start on http://localhost:3001
```

### Frontend (Vite Development Server)
```bash
npm run preview
# Frontend will be available at http://localhost:4173
```

### Production Build
```bash
npm run build
# Creates optimized build in the dist/ folder
```

## Environment Variables

Required environment variables (in `.env`):
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `PORT` - Backend server port (default: 3001)

## Technologies

- **Backend**: Express.js, Supabase
- **Frontend**: React, Vite
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth

## Database

The application uses Supabase PostgreSQL database with the following schema:

### users_profile Table
- `id` (uuid) - User ID from auth.users
- `email` (text) - User email
- `full_name` (text) - User's full name
- `created_at` (timestamp) - Account creation date
- `updated_at` (timestamp) - Last update date

Row Level Security (RLS) is enabled to ensure users can only access their own data.
