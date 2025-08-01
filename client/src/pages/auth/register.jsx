import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrMsg('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...safeData } = formData;
      await register(safeData);
      setSuccessMsg('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrMsg(err?.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
        <Typography ml={2}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xs">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Register
        </Typography>

        {errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            fullWidth
            required
            margin="normal"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!!successMsg}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
