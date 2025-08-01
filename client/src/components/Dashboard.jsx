import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import { Typography, Box } from '@mui/material';

const Dashboard = () => {
  const { auth } = useAuth();

  console.log("👤 Dashboard loaded with auth:", auth);

  if (!auth) {
    return (
      <Box mt={5}>
        <Typography variant="h6" color="error">
          Not authorized. Please log in.
        </Typography>
      </Box>
    );
  }

  if (!auth?.role) {
    return (
      <Box mt={5}>
        <Typography variant="h6" color="error">
          Role missing from authentication. Please try logging in again.
        </Typography>
      </Box>
    );
  }

  if (auth.role === 'admin') return <AdminDashboard />;
  if (auth.role === 'user') return <UserDashboard />;

  return (
    <Box mt={5}>
      <Typography variant="h6" color="error">
        Unknown role: <strong>{auth.role}</strong>
      </Typography>
    </Box>
  );
};

export default Dashboard;
