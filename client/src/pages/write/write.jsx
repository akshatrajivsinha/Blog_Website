import { useState } from 'react';
import React from 'react';
import './write.css';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function Write() {
 const currentUser = JSON.parse(localStorage.getItem("currentUser"))
 
 const [author,setAuthor] = useState(currentUser.username)
 const [cover,setCover] = useState(currentUser.cover)
 const [title, setTitle] = useState("")
 const [desc, setDesc] = useState("")
 const [file, setFile] = useState(null)
 
 const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      author,
      cover,
      title,
      desc,
    }


    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename)
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }

    try {
      console.log(newPost)
      const data = await axios.post("/posts", newPost)
      window.location.replace("/"+data.data._id);
    } catch (err) { console.log(err) }
  };



  return (
    <div className='writeContainer'>

      {file && (

        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}


      <form className="form" onSubmit={handleSubmit}>

        <label htmlFor="fileInput">
        <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
        </label>

        <input type="file" id="fileInput" style={{display:"none"}}
        onChange={(e) => setFile(e.target.files[0])} 
        />
        
        <div >
          <input className='title' type="text" placeholder='TITLE' 
         onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className='desc'>
          <textarea className='input' type="text" placeholder='DESCRIPTION' 
         onChange={(e) => setDesc(e.target.value) } 
          />
        </div>

        
        <button className='writeSubmit' type='submit' >Submit</button>
      </form>
    </div>
  )
}
