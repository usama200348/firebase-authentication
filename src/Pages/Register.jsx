import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useRef } from 'react';
import { auth, db } from '../config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const Register = () => {
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const age = useRef();
  const gender = useRef();
  const navigate=useNavigate

  const registerUser = async (event) => {
    event.preventDefault();

    // Validate email and password
    if (!email.current.value || !password.current.value) {
      console.log("Please enter a valid email and password.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      const user = userCredential.user;
      console.log("User created:", user);

      // Save additional information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.current.value,
        age: age.current.value,
        gender: gender.current.value,
        email: email.current.value,
     
      });
      console.log("Checking");
      
      navigate('/login')

      console.log("User information saved to Firestore.");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <>
    <Box display='flex' alignItems='center'>
      <h1 >Register</h1>
    </Box>
      <form onSubmit={registerUser}>
        <input type="text" placeholder='Enter Your Name' ref={name} />
        <input type="number" ref={age} placeholder='Enter Your Age' />
        <select ref={gender} defaultValue="">
          <option value="" disabled>Select Your Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="email" placeholder='Enter your email' ref={email} />
        <input type="password" placeholder='Enter your password' ref={password} />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
