import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'


export default function Sidebar({data,user}) {

 
  const PF ="http://localhost:5000/images/"
  return (
    
    <div className='sidebar'>
      
      <div className='container1'>
        {data.map((content,id)=>(
        <Link className='Link' to={"/"+content._id}>
          <div className='recentpost' key={id}>
          <img className='img' src={PF+content.photo} alt=""  />
          <h3 className='postheading'>{content.title}</h3>
          <h5 className='time'>{new Date(content.createdDate).toDateString()}</h5>
        </div>
        </Link>
        )
        )}
      </div>

      <div className='container2'>
        <h1 className='author'>AUTHORS</h1><hr className='hr' />
        <div className="allAuthor">

      {user.map((content,id)=>(
        <Link className='Link' to={`/userpage/${content.username}`}>
        <div className='recentpost' key={id}>
          <img className='img' src={PF+content.cover} alt=""  />
          <h3 className='postheading'>{content.username}</h3>
          <h5 className='time'>{new Date(content.createdDate).toDateString()}</h5>
        </div>
        </Link>
        ))}
        </div>
        
      </div>

    </div>
  )
}

