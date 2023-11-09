import React, { useEffect, useState } from 'react'
import './home.css'
import Posts from "../../components/posts/posts"
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'
import Footer from '../../components/footer/footer'




export default function Home() {

  const [posts,setpost] = useState([]);
  const [users , setUser] = useState([])

  useEffect(()=>{
    const fetchpost = async()=>{
      const res = await axios.get("/posts");
      setpost(res.data);
    }
    fetchpost()
    const user = async()=>{
      const res = await axios.get("/auth");
      setUser(res.data)
    }
    user()
  },[])
  return (
    <div className='home'> 
    <div className='top'>

      <Sidebar  user={users} data={posts}/>
              
      <Posts posts={posts}/>
    </div>
      <div className='bottom'>
      <Footer/>                                               

      </div>
    </div>
  )
}
