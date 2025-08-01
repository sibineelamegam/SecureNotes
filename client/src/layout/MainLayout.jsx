import { useState, useCallback, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 250;

const MainLayout = () => {
  const { auth } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // reset sidebar on login/logout
  useEffect(() => {
    if (auth) {
      setSidebarOpen(true); // Always open after login
    }
  }, [auth]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuClick={handleSidebarToggle} hamburger={!!auth} />

      {auth && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleSidebarClose}
          drawerWidth={drawerWidth}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px',
          padding: 3,
          transition: 'margin-left 0.3s ease',
          marginLeft: auth && !isMobile && sidebarOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
