import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users/admin/users');
        setUsers(res.data.users);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setEditedData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editedData.username.trim() || !editedData.email.trim()) {
      alert('Username and email are required');
      return;
    }

    setSaving(true);
    try {
      const existingUser = users.find((u) => u._id === editingUserId);

      const mergedData = {
        ...existingUser, // keep all existing fields
        ...editedData    // override with edited ones
      };

      await axios.patch(`/users/admin/users/${editingUserId}`, mergedData);

      setUsers((prev) =>
        prev.map((u) => (u._id === editingUserId ? { ...u, ...mergedData } : u))
      );
      setEditingUserId(null);
      setEditedData({});
    } catch (err) {
      alert('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedData({});
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    setDeleting(true);
    try {
      await axios.delete(`/users/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert('Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="1000px" mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isEditing = editingUserId === user._id;
            return (
              <TableRow key={user._id}>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      name="username"
                      value={editedData.username}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    user.username
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      name="role"
                      value={editedData.role}
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      name="status"
                      value={editedData.status}
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  ) : (
                    user.status
                  )}
                </TableCell>
                <TableCell align="center">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={saving}
                        sx={{ mr: 1 }}
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outlined"
                        color="secondary"
                        size="small"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        onClick={() => startEditing(user)}
                        variant="outlined"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="outlined"
                        color="error"
                        size="small"
                        disabled={deleting}
                      >
                        {deleting ? 'Deleting...' : 'Delete'}
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminUserManagementPage;
