import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../config/firebase/firebaseconfig';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
        navigate('/home'); 
      })
      .catch((error) => {
        console.error("Login Error:", error.code, error.message); 
        setError("Invalid email or password. Please try again."); 
      });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Stack spacing={1.5} alignItems="center">
        <Typography variant="h4" component="h1">Login</Typography> 
      </Stack>
      <Box component="form" onSubmit={loginUser} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ margin: '0.5rem 0', padding: '0.5rem', width: '200px' }}
        />
        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ margin: '0.5rem 0', padding: '0.5rem', width: '200px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>Login</button>
        <p><Link to={'/register'}>Don't Have An Account? Click Here</Link></p>
      </Box> 

      {error && <Typography color="error" mt={2}>{error}</Typography>} 
    </Box>
  );
};

export default Login;
