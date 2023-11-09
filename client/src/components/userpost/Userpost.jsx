import React from 'react'
import './Userpost.css'
import { Link } from 'react-router-dom'


const PF ="http://localhost:5000/images/"
export default function Userpost({ post }) {
  
  return (
    
    
      <Link className="Link" to={"/"+post._id}>
      <div className='userpost'>
        <div className='content'>
          
        
          {post.photo && <img className='img' src= {PF + post.photo} alt="" />}
        
          <h1 className='title'>{post.title}</h1>
          <span className='time'>{new Date(post.createdDate).toDateString()}</span>
          <p className='p'>{post.desc.substring(0,100)}....</p>
      
        </div>
        </div>
    </Link>
   
  )
}
