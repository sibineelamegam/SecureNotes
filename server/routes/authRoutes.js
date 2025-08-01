import express from 'express';
import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import refresh from '../controllers/auth/refresh.js';
import logout from '../controllers/auth/logout.js';

const router = express.Router();

// 📝 Register new user (public)
router.post('/register', register);

// 🔑 Login and issue tokens
router.post('/login', login);

// 🔄 Refresh access token using refresh token
router.get('/refresh', refresh);

// 🚪 Logout user and clear cookies
router.post('/logout', logout);

export default router;
