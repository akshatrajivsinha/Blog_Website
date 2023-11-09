import React, { useEffect, useState } from 'react'
import Post from '../post/post.jsx'
import './posts.css'
import axios from "axios";
import Slide from "../slider/slider.jsx"
import CategoryCard from "../categoryCard/CategoryCard.jsx"



export default function Posts({posts}) {

  const [cats, setCat] = useState([""]);


  useEffect(()=>{
   const fetchpost = async ()=>{
     const res = await axios.get("/categories/");
     setCat(res.data);
     
    }
    fetchpost()
    
  },[])
  
  
  console.log(cats)
  return (
    <div className='posts'>
      
     

    <Slide >
    
       {cats.map(data=>(
         
         <CategoryCard key={data._id} item={data}/>
         ))}
     
    </Slide>
         
      
      {posts.map((post,_id)=>(
        <Post key={post._id} post={post}/>
      ))}


    </div>
    
  )
}
