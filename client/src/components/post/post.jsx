
import './post.css'
import { Link } from 'react-router-dom'



const PF ="http://localhost:5000/images/"
export default function Post({ post }) {
 

  

  return (
    
      <div className='post'>
      <Link className="Link" to={"/"+post._id}>
        <div className='content'>
          
        
          {post.photo && <img className='img' src= {PF + post.photo} alt="" />}
        
          <h1 className='title'>{post.title}</h1>
          <div className="info">
            <div className='info1'>
             <img src={`http://localhost:5000/images/${post.cover}`} alt="" className='img' />
             <span className='username'>{post.author}</span>
             </div> 
           <span className='time'>{new Date(post.createdDate).toDateString()}</span>
          </div>
          <p className='p'>{post.desc.substring(0,300)}....</p>
      
        </div>
    </Link>
        </div>
   
  )
}
