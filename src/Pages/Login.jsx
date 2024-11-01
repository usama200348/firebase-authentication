import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../config/firebase/firebaseconfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    
    setError(null); // Reset error before login attempt
    console.log("Email:", email);
    console.log("Password:", password);
     
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
        navigate('/'); 
      })
      .catch((error) => {
        console.error("Login Error:", error.code, error.message); 
        setError("Invalid email or password. Please try again."); 
      });
  };

  return (
    <>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={loginUser}>
        <input 
          type="email" 
          placeholder='Enter your email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder='Enter your password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
        <p><Link to={'register'}>Don't Have An Account? Click Here</Link></p>
      </form> 

      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </>
  );
};

export default Login;
