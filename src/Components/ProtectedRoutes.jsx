import { onAuthStateChanged } from "firebase/auth";
import { useEffect,useState } from "react";
import { auth } from "../config/firebase/firebaseconfig";
import {useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
   
   const navigate=useNavigate()
    const [loading , SetLoading]=useState(true)
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                const uid= user.uid
                console.log(uid)
                SetLoading(false)
            }
            else{
                navigate('/login')
            }
        },[])
    })
  return (
  <>
 <div><h1>Loading....</h1>:component</div>
  </>
  )
}

export default ProtectedRoutes