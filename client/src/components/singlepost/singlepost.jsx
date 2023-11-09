import React, { useEffect, useState } from 'react'
import "./singlepost.css"
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Singlepost() {

  const location = useLocation();
  const path = location.pathname.split("/")[1]
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  
  const [post, setpost] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  //const [file, setFile] = useState(null)
  const [updatedpost, setupdatedpost] = useState(false)
  
  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    const fetchpost = async () => {
      const res = await axios.get("/posts/" + path);
      setpost(res.data)
      setDesc(res.data.desc)
      setTitle(res.data.title)

    }
    fetchpost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path)
      window.location.replace("/")
      

    } catch (err) { }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, { title, desc });
      window.location.reload();
      setupdatedpost(false)

    } catch (err) { }
  }

  return (
    <div className='SinglepostContainer'>

      <div className='imgContainer'>
        {post.photo && <img className='img' src={PF + post.photo} alt={post.title} />}
      </div>

      <div className='textContainer'>
        {updatedpost ? <input type='text' className='title'  value={post.title} onChange={(e) => setTitle(e.target.value)}/> : (

          <h1 className='title'>{post.title}</h1>
        )}

        <div className='upperText'>

          <Link className='user Link' to={`/userpage/${post.author}`}>
            <img className='img' src={PF + post.cover} alt="" />
            <h3 className='postheading'>{post.author}</h3>
          </Link>
          {
          (currentUser && currentUser.username === post.author & !updatedpost) && 
          <div className='edit'>

            <button className='delete' onClick={handleDelete}>Delete</button>
            <button className='update' onClick={()=>setupdatedpost(true)}>Update</button>
          </div>}
        </div>

        {updatedpost ? (<textarea type='text' className='inputtextarea' value={post.desc} onChange={(e) => setDesc(e.target.value)}/>) : (

           <p className='textarea'>{post.desc}</p>
        )}

        {updatedpost &&
          <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        }
      </div>

    </div>
  )
}
