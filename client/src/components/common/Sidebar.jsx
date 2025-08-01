// src/components/Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import EditNoteIcon from "@mui/icons-material/EditNote";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ open, onClose, drawerWidth = 250 }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <List>
        {/* Shared Links */}
        <ListItemButton onClick={() => handleNavigation("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/profile")}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => handleNavigation("/notes")}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary="My Notes" />
        </ListItemButton>

        {/* Admin-only Links */}
        {auth?.role === "admin" && (
          <>
            <ListItemButton onClick={() => handleNavigation("/admin/users")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigation("/admin/register")}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Register User" />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigation("/admin/notes")}>
              <ListItemIcon>
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Notes" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      variant="persistent"
      ModalProps={{
        keepMounted: true,
        hideBackdrop: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: "64px",
          height: "calc(100% - 64px)",
          borderRight: "none",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
