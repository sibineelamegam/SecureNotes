# 🔐 SecureApp – Full Stack Role-Based Note-Taking Application

SecureApp is a secure, full-featured, role-based note-taking application built with modern web technologies. It provides user authentication, personal note management, and full administrative control over users and notes.

---

## 🧱 Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React, Vite, Material UI (MUI)              |
| Backend    | Node.js, Express, MongoDB (Mongoose)        |
| Auth       | JWT (Access & Refresh Tokens in HTTP-only Cookies) |
| Security   | Role-based Access, CORS, Secure Cookies     |
| API        | RESTful API                                 |

---

## 🔧 Backend Overview (`/backend`)

### 🔐 Token Strategy

- **Access Token**: Short-lived JWT used for protected API calls
- **Refresh Token**: Long-lived, stored in **HTTP-only secure cookie**
- **Auto-refresh** implemented in frontend on load

### 👥 Roles

- `User`: Manage own notes & profile
- `Admin`: Full control of users and all notes

---

## 💻 Frontend Overview (`/frontend`)

### 🔐 Features

- Secure login/logout with token refresh
- Sidebar & header that update based on auth state
- Auth context using React Context API
- Role-based protected routing
- Admin pages for managing users and notes

---

## 🌐 Route Summary

### Public Routes
| Route        | Component             |
|--------------|------------------------|
| `/login`     | LoginPage              |
| `/register`  | RegisterPage           |

### Authenticated Routes (User + Admin)
| Route        | Component             |
|--------------|------------------------|
| `/dashboard` | DashboardPage          |
| `/profile`   | ProfilePage            |
| `/notes`     | UserNotesPage          |
| `/notes/:id` | NoteDetailsPage        |

### Admin-Only Routes
| Route              | Component                    |
|--------------------|------------------------------|
| `/admin/users`     | AdminUserManagementPage      |
| `/admin/notes`     | NoteManagementPage           |
| `/admin/register`  | RegisterNewUserPage          |

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

#### ➕ Required `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### ➕ Required `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🛡️ Security Notes

- Tokens stored securely in **HTTP-only cookies** to prevent XSS
- **CORS configured** for secure cross-origin requests
- **Role checks** on both frontend (UI) and backend (API access)
- **Access tokens auto-refreshed** silently via `PersistLogin.jsx`

---

## 🧪 Dev Scripts

### Backend

| Command         | Description                 |
|------------------|-----------------------------|
| `npm run dev`    | Start server with nodemon   |
| `npm run start`  | Start server (prod mode)    |

### Frontend

| Command           | Description              |
|------------------|--------------------------|
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---



