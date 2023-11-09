
import "./footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Footer = () => {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(navigate(`/search?search=${input}`))
   // navigate(`/gigs?search=${input}`);
  };
  return (
    <div className='footer'>
      <div className='searchBar'>
        <input className='input' type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)} />
        <button className='button' onClick={handleSubmit}>Search</button>
      </div>
      <div className='socialmedia'>
        <div className='left'>AKSHAT_SINHA</div>
        <div className='right'>
            <FacebookIcon/>
            <InstagramIcon/>
            <TwitterIcon/>
            <PinterestIcon/>
        </div>
      </div>
    </div>
  )
}

export default Footer
