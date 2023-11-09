import React from 'react'
import "./slider.css"
import Slider from "infinite-react-carousel";



const Slide = ({children}) => {
  return (
    <div className='slide'>
      <div className='container'>

        <Slider slidesToShow={3} autoplay={true} autoplayScroll={1} autoplaySpeed={1500} arrowsScroll={3} >
          {children}
        </Slider>
      </div>
    </div>
  )
}





export default Slide 