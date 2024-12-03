import { useEffect, useState } from "react"
import "./slider.css"
import axios from "axios"
import ip_address from "../address"

export default function Slider(){

  const [slider , setSlider] = useState([])

  useEffect(()=>{
    axios.get(`http://${ip_address}:8000/api/slide/`)
  .then((res)=>
    setSlider(res.data)
  )
  .catch((err)=>
   alert(err)
  )
  },[])

   return(
    <section className="box">
    
    <div className="box-2">
       
      <div className="slider">

       {
        slider.map((obj,index)=>
          <div className="slide" key={index}><img src={`http://${ip_address}:8000/${obj.image}`} alt="slider"/></div>
        )
       }
      </div>
    </div>

</section>
   ) 
}
