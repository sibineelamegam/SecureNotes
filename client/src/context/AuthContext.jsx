import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

//  hook
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);      // Stores user info
  const [loading, setLoading] = useState(true); // Initial loading spinner

  // Auto-refresh user on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get('/auth/refresh');
        setAuth(res.data.user); // { id, username, email, role }
      } catch (err) {
        console.error('❌ Refresh failed:', err?.response?.data?.message || err.message);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (formData) => {
    const res = await axios.post('/auth/login', formData);
    return res.data.user; // Return user instead of setting auth here
  };

  // Register
  const register = async (formData) => {
    const res = await axios.post('/auth/register', formData);
    return res.data;
  };

  // Logout
  const logout = async () => {
    await axios.post('/auth/logout');
    setAuth(null);
  };

  // Role check - User
  const isUser = async () => {
    try {
      const res = await axios.get('/user/user-check');
      return res.data;
    } catch (err) {
      console.error('❌ User check failed:', err?.response?.data?.message || err.message);
      throw new Error(err?.response?.data?.message || 'User check failed');
    }
  };

  // Role check - Admin
  const isAdmin = async () => {
    try {
      const res = await axios.get('/user/admin-check');
      return res.data;
    } catch (err) {
      console.error('❌ Admin check failed:', err?.response?.data?.message || err.message);
      throw new Error(err?.response?.data?.message || 'Admin check failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        register,
        isUser,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
