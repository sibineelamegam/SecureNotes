// 📦 SECURE NOTE APP – FULL PROJECT STRUCTURE AND FLOW

// --------------------------------------------
// 🔧 BACKEND STRUCTURE (/server)
// --------------------------------------------

/*
server/
├── config/
│   ├── db.js            // Connects to MongoDB using Mongoose.
│   └── corsOptions.js   // CORS config to allow frontend origin with credentials.

├── controllers/
│   ├── auth/
│   │   ├── register.js       // Handles user registration.
│   │   ├── login.js          // Authenticates user and sets cookies.
│   │   ├── logout.js         // Clears refresh token cookie.
│   │   └── refresh.js        // Issues new access token using refresh token.
│   ├── users/
│   │   ├── getProfile.js     // Fetches profile of currently logged-in user.
│   │   ├── updateProfile.js  // Allows users to update their own profile.
│   │   ├── getAllUsers.js    // Admin: Fetches all user accounts.
│   │   ├── updateUserById.js // Admin: Updates user info by ID.
│   │   └── deleteUserById.js // Admin: Deletes a user by ID.
│   └── notes/
│       ├── createNote.js     // Adds a new note for the logged-in user.
│       ├── getNotes.js       // Fetches all notes for the user.
│       ├── getNoteById.js    // Gets a specific note by ID.
│       ├── updateNote.js     // Updates a note (owner or admin).
│       └── deleteNote.js     // Deletes a note (owner or admin).

├── middleware/
│   ├── verifyJWT.js     // Middleware to protect private routes using JWT from cookies.
│   └── verifyRoles.js   // Middleware to restrict routes based on user roles.

├── models/
│   ├── User.js          // Mongoose schema: username, email, password, age, gender, dob, phone, address (city & country), role, status, firstName, lastName.
│   └── Note.js          // Mongoose schema: title, content, userId, timestamps.

├── routes/
│   ├── authRoutes.js    // Routes: /register, /login, /logout, /refresh
│   ├── userRoutes.js    // Routes: /profile, /admin/users
│   └── noteRoutes.js    // Routes: /notes CRUD

└── server.js
    // Entry point for backend. Connects DB, sets middleware, loads routes, starts server.
*/

// Token Strategy:
// ✅ Access & Refresh tokens stored in secure HTTP-only cookies

// Roles:
// - "User"  → Can manage own profile and notes
// - "Admin" → Full access to users and notes


// --------------------------------------------
// 💻 FRONTEND STRUCTURE (/client)
// --------------------------------------------

/*
client/
├── api/
│   └── axios.js              // Axios instance with baseURL and credentials enabled.

├── context/
│   └── AuthProvider.jsx      // Provides auth context (user, role, token status, etc.).

├── components/
│   ├── Header.jsx            // Logo + Login/Register (unauthenticated) or hamburger + avatar dropdown (authenticated).
│   └── Sidebar.jsx           // Shows links: Dashboard, Profile, Notes; Admin extras: User/Note Management, Create User.

├── pages/
│   ├── LoginPage.jsx         // Login form, sets auth state.
│   ├── RegisterPage.jsx      // Public registration or admin-create user form.
│   ├── DashboardPage.jsx     // Role-based content display.
│   ├── ProfilePage.jsx       // View/edit personal info.
│   ├── UserNotesPage.jsx     // Create + view own notes.
│   ├── NoteDetailsPage.jsx   // View/edit/delete specific note.
│   ├── AdminUserManagementPage.jsx // Admin: Full CRUD for users.
│   ├── NoteManagementPage.jsx      // Admin: View/edit/delete any notes.
│   └── RegisterNewUserPage.jsx     // Admin-only form to register users.

├── Layout.jsx or MainLayout.jsx
│   // Wraps all pages with Header, Sidebar, and <Outlet />

├── PersistLogin.jsx          // Auto-refresh token on app load.
└── RequireAuth.jsx & RequireAdmin.jsx
    // Route protection based on auth and role.
*/


// --------------------------------------------
// ✅ FINAL ROUTE STRUCTURE EXAMPLE
// --------------------------------------------

/*
Public Routes:
- /login             → LoginPage.jsx
- /register          → RegisterPage.jsx

Protected Routes (User & Admin):
- /dashboard         → DashboardPage.jsx
- /profile           → ProfilePage.jsx
- /notes             → UserNotesPage.jsx
- /notes/:id         → NoteDetailsPage.jsx

Admin-Only Routes:
- /admin/users       → AdminUserManagementPage.jsx
- /admin/notes       → NoteManagementPage.jsx
- /admin/register    → RegisterNewUserPage.jsx
*/


// ✅ All tokens managed securely via HTTP-only cookies
// ✅ Sidebar and Header render conditionally based on auth state
// ✅ Role-based UI and access enforced on both frontend and backend
