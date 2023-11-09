import React, { useEffect, useState } from 'react'
import "./topbar.css"
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function Topbar() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()
  //scrolling
  const [active, setActive] = useState(false)
  const {pathname} = useLocation()
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }
  
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    
    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, [])

 const handleLogout= async()=>{
  try{
    await axios.post("/auth/logout")
    localStorage.setItem("currentUser",null);
    navigate("/login")
  }catch(err){
    console.log("error in logout")
  }
 }

  return (
    <div className={active || pathname !=="/"?'topbar scroll':'topbar'}>
      <div className='container'>
        <div className='left'>
          
          <Link className='Link' to={"/"}>
          <h1 className='lefth1'>AK Blogs</h1>
          </Link>
        </div>
        <div className='right'>
          {currentUser && <Link className='righth3 Link' to={"/write"}>Write</Link>}
          {currentUser && <Link className='righth3 Link' to={`/userpage/${currentUser.username}`}>{currentUser.username}</Link>}
          {currentUser && <Link className='righth3 Link' onClick={handleLogout}>Logout</Link>}
          {!currentUser && <Link className='righth3 Link' to={"/register"}>Register</Link>}
          {!currentUser && <Link className='righth3 Link' to={"/login"}>Login</Link>}
          
          {console.log(currentUser)}
         
        </div>

      </div>

    </div>
  )
}

export default Topbar

