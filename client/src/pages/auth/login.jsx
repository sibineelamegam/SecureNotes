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

const Login = () => {
  const { login, loading, setAuth } = useAuth(); // include setAuth
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
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

    try {
      const user = await login(formData); // get user without setting auth yet
      setSuccessMsg('Login successful! Redirecting...');

      setTimeout(() => {
        setAuth(user); // delay auth update
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (err) {
      setErrMsg(err?.response?.data?.message || 'Login failed');
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
          Login
        </Typography>

        {errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <form onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!!successMsg}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
