import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box p={3} >
      <Typography variant="h4" gutterBottom>
        🚫 Unauthorized Access
      </Typography>
      <Typography variant="body1">
        You do not have permission to view this page.
      </Typography>
       <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default Unauthorized;