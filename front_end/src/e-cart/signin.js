import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import "./signin.css"


import ip_address from "../address" 
import UserName from "./username";

export default function Signin({onemail}){
   
  const [user,setUser] = useState({

    email :"",
    password:""
  })

  const [ error , setError ] = useState("")
  const navigate = useNavigate()

  const invalid = useRef(null)




 const handleuser = (e)=>{
  
      const {name,value} = e.target
      setUser((prev)=>({
         ...prev,
         [name] : value
      }))
  } 



  const handlesubmit = async (e)=>{
    e.preventDefault()
    // console.log(user)

    await axios.get(`http://${ip_address}:8000/api/user/`)
    .then((res) => 
       res.data.map((obj)=>{
              if(obj.email === user.email){
                  localStorage.setItem("user_name",obj.username)
              }
       })
    )
   
    if(user.email && user.password){

      await axios.post(`http://${ip_address}:8000/api/login/`,user)
      .then((res)=>
          {
            if(res.data.message === "Login successful"){
                alert(res.data.message)
                onemail(user.email)
                navigate("/")
            }
            else{
              setError(`${res.data.error}!`)
               if(invalid.current){
                 invalid.current.focus()
               }
            }
          }   
      )
      .catch(()=>{
             setError("Network error!")
      })
    
  }
}


  return(
      <>

<Container className="sign_in_cont d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
<form onSubmit={handlesubmit} className="container my-auto border border-5 p-4 rounded-5">
  
  <h4 className="text-center">Sign-in</h4>  
  <p style={{color:"red"}}>{error}</p>

  <div className="form-group row">
    <div className="col-12 col-md-6 mx-auto">
      <Form.Control 
        size="lg" 
        type="email" 
        placeholder="Email" 
        className="mb-4 signininp" 
        onChange={handleuser} 
        name="email" 
      />
    </div>
  </div>


  <div className="form-group row">
    <div className="col-12 col-md-6 mx-auto">
      <Form.Control 
        size="lg" 
        type="password" 
        placeholder="Password" 
        className="mb-4 signininp" 
        onChange={handleuser} 
        name="password" 
      />
    </div>
  </div>

  <div className="mt-4 row mx-auto">
    <button type="submit" ref={invalid} className="btn btn-primary mb-4 rounded-2 mx-auto col-12 col-md-6">Submit</button>
  </div>

  <div>
  <Link to="/signup" className="mx-auto d-flex justify-content-center align-items-center">Don't have an account?</Link>
  </div>

</form>
</Container>
      </>
  )
}


