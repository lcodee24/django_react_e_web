import axios from "axios";
import { useEffect, useState } from "react";
import ip_address from "../address";

export default function UserName({onuseremail}){
    
     const [email,setEmail] = useState("")

     useEffect(()=>{

      console.log(onuseremail)
      
      axios.get(`http://${ip_address}:8000/api/user/`)
      .then((res) => 
         res.data.map((obj)=>{
          if (obj.email === onuseremail) {
            localStorage.setItem(onuseremail, obj.username);
            setEmail(obj.username); 
          }  
         })
      )
     setEmail(localStorage.getItem(onuseremail))
     },[onuseremail])

     console.log(email)
}






