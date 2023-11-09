import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import Userpost from '../../components/userpost/Userpost';
import "./search.css";

const Search = () => {
    const {search} = useLocation();
    const [data ,setData] = useState([])



    useEffect(()=>{
        const fetchpost = async()=>{
          const res = await axios.get(`/posts${search}`)
          setData(res.data);
          
        }
        fetchpost()
    },[])
    
    
  return (
    <div className='search'>
        {(data.length !== 0)  ? data.map((post)=><Userpost key={post._id} post={post}/>):<h1 className='h1'>NO BLOG FOUND</h1>}
    </div>
  )
}
export default Search
