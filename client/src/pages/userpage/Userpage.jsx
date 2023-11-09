import React, { useEffect, useState } from 'react'
import "./Userpage.css"
import axios from 'axios';
import Userpost from '../../components/userpost/Userpost.jsx'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';

const Userpage = () => {
    const pathname = useLocation().pathname.split('/')[2]
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [userpost,setuserpost]=useState([])
    const [post,setpost]=useState([])
    const [user,setUser]=useState([])

    const [desc,setDesc]=useState("write your desc")
    const [file,setFile]=useState(null)
    const [edit,setEdit] = useState(false);

    useEffect(()=>{
        // const userupdate = async()=>{
        //     const sder = await axios.put("/auth/"+currentUser.username,{desc:desc,cover:file});
        //   }
        //   userupdate()
        const userpost = async()=>{
          const res = await axios.get("/posts/userpost/"+pathname);
          setuserpost(res.data);
          
        }
        userpost()
        const fetchpost = async()=>{
          const res = await axios.get("/posts");
          setpost(res.data);
        }
        fetchpost()
        
        const users = async()=>{
            const res = await axios.get("/auth/"+pathname);
            setUser(res.data);
            setDesc(res.data.desc)
          }
          users()
        },[])
        
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          desc,
        }
    
    
        if (file) {
          const data = new FormData();
          const filename = file.name;
          data.append("name", filename)
          data.append("file", file);
          newPost.cover = filename;
          try {
            await axios.post("/upload", data);
          } catch(err){ console.log("error")}
        }


        try{
          const sder = await axios.put("/auth/"+currentUser.username,{desc:newPost.desc,cover:newPost.cover});
          localStorage.setItem("currentUser", JSON.stringify(sder.data));
          setDesc(newPost.desc)
          setUser(sder.data)
          try{

            await axios.put("/posts/manyupdate/"+currentUser.username,{cover:newPost.cover});
            setEdit(false)
            
          }catch(err){}
          } catch (err) { console.log(err) }
        };

        const navigate = useNavigate()
       const handleDelete = async(e) =>{
        try{
          await axios.delete("/auth/"+currentUser.username)
          localStorage.setItem("currentUser",null);
          navigate('/login')
        }catch(err){console.log("error in deleting")}
       }


  return (
    <div className='userpage'>
        <div className='container'>
            <div className='topcontainer'>
                <div className="left">
                {edit ? (file && (

                <img
                  className="cover"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                )): null}
                
                    {edit ? <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>: 
                    <img src={!(user.cover) ? `http://localhost:5000/images/p1.jpg`:`http://localhost:5000/images/${user.cover}`} alt="" className='cover'/>}
                    <h1 className='h1'>{user.username}</h1>
                   {(currentUser && currentUser.username === pathname && !edit) && <button className='edit' onClick={()=>setEdit(true)}>Edit</button>}
                   {edit && <div className='update'>
                     {<button className='edit' onClick={handleSubmit}>Edit</button>}
                     {<button className='delete' onClick={handleDelete}>Delete</button>}
                    </div>}
                   
                        
                    
                </div>
                <div className="right">
                    <h1 className='h1'>ABOUT</h1>
                    {edit ? (<textarea value={user.desc} className='desc' onChange={(e)=>setDesc(e.target.value)}></textarea>) :(<p className='desc'>{desc}</p>)}

                </div>
            </div>


                
            <div className="downcontainer">
                {userpost.map((post,id)=>(
                    <Userpost post={post} key={id}/>)
                    )}
            </div>
      <Footer/>
                

                

        </div>
    </div>
  )
}

export default Userpage
