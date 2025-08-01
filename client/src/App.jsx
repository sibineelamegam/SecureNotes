import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/general/NotFound';
import Unauthorized from './pages/general/Unauthorized';
import RequireAuth from './routes/RequireAuth';
import PersistLogin from './routes/PersistLogin';
import MainLayout from './layout/MainLayout';
import Dashboard from './components/Dashboard';

import ProfilePage from './pages/common/ProfilePage';
import RegisterNewUserPage from './pages/admin/RegisterNewUserPage';
import AdminUserManagementPage from './pages/admin/AdminUserManagementPage';

import UserNotesPage from './pages/common/UserNotesPage';                
import NoteDetailsPage from './pages/common/NoteDetailsPage';         
import NoteManagementPage from './pages/admin/NoteManagementPage';    

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public routes */}
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          {/* Accessible by both user and admin */}
          <Route element={<RequireAuth allowedRoles={['admin', 'user']} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notes" element={<UserNotesPage />} />
            <Route path="notes/:noteId" element={<NoteDetailsPage />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="admin/users" element={<AdminUserManagementPage />} />
            <Route path="admin/register" element={<RegisterNewUserPage />} />
            <Route path="admin/notes" element={<NoteManagementPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
