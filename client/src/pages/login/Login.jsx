import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 

const Login = () => {

  const[username,setuser] = useState("")
  const[password,setpassword] = useState("")
  const navigate = useNavigate();

 const handleLogin = async(e)=>{
  e.preventDefault();
  try{
    const res = await axios.post("/auth/login",{
      username,
      password
    })
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    navigate("/")

  }catch(err){
    console.log("erroe")
  }
 }

  return (
    <div className='login'>
    <div className="container">
        <h1 className='h1'>Login</h1>
      
            <form action="" className='form' onSubmit={handleLogin}> 
                <label className='label'>Username</label>
                <input className="input" type="text" placeholder='Enter you username' onChange={e=>setuser(e.target.value)}/>
                <label className='label'>Password</label>
                <input className="input" type="password" placeholder='Enter your password' onChange={e=>setpassword(e.target.value)} />
                <button className='button'>Login Me</button>
            </form>
    
    </div>
  
</div>
  )
}

export default Login
