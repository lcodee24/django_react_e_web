import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel  from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import "./signup.css"

import ip_address from "../address" 


export default function Signup(){
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [error_username, setError_username] = useState("Username");
  const [error_email, setError_email] = useState("name@gmail.com");
  const [error_password, setError_password] = useState("Password");
  const [error_re_password, setError_re_password] = useState("Re-password");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handelchange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    let success = true;

    let pw = formdata.password;
    let rpw = formdata.re_password;
    let email = formdata.email;
    let username = formdata.username; 

    if (pw !== rpw) {
      setError_re_password("Password does not match");
      success = false;
    }

    if (pw === "") {
      setError_password("Fill password");
      setError("");
      success = false;
    } else {
      setError_password("correct");
    }

    if (rpw === "") {
      setError_re_password("Fill Re-password");
      setError("");
      success = false;
    } else if (pw !== rpw) {
      setError_re_password("Re-password does not match");
    } else {
      setError_re_password("correct");
    }

    if (email === "") {
      setError_email("Fill email");
      setError("");
      success = false;
    } else {
      setError_email("correct");
    }

    if (username === "") { 
      setError_username("Fill username"); 
      setError("");
      success = false;
    } else {
      setError_username("correct");
    }

    if (email === "" && username === "" && pw === "" && rpw === "") { 
      setError("Fill all fields.");
      setError_re_password("Re-password !");
      setError_password("Password !");
      setError_email("Email !");
      setError_username("Username !"); 
      success = false;
    }

    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email_pattern.test(email) && email !== "") {
      setError_username("Correct the email field."); 
      success = false;
    }

    if (/\s/.test(formdata.username)) {
      setError_username("Spaces are not allowed in the username.");
      success = false;
  }
  if(formdata.username.length > 7){
    setError_username("Username length should be 7")
  }
  
    await axios.get(`http://${ip_address}:8000/api/user/`)
      .then((res) => {
        res.data.map((obj) => {
          if (obj.email === formdata.email) {
            setError_email("Already you have an account.");
            success = false;
          }
        });
        if(formdata.email === ""){
          setError_email("required!");
          success = false;
        }
      });
      

    if (success) {
      await axios.post(`http://${ip_address}:8000/api/register/`,formdata)
        .then(() => {
          alert("Account created successfully");
          navigate("/signin");
        })
        .catch(() => alert("Error in saving data"));
    }
  };

  return (
    <Container style={{ width: "100vw", height: "100vh"}} className="border d-flex justify-content-center align-items-center">

      <form onSubmit={handlesubmit} className="border border-3">

        <h4 style={{ textAlign: "center" }}>Sign-up</h4>

        <p>{error}</p>

        <div className="row">
        <FloatingLabel controlId="floatingName" label={error_username} className="mb-3 mt-4 custom-floating-label col-12 col-md-8 col-lg-8 mx-auto">
          <Form.Control type="text" placeholder={error_username} className="custom-input sp_inp" name="username" onChange={handelchange} value={formdata.username} />
        </FloatingLabel>
        </div>

        <div className="row">
        <FloatingLabel controlId="floatingEmail" label={error_email} className="mb-3 mt-4 custom-floating-label col-12 col-md-8 col-lg-8 mx-auto">
          <Form.Control type="email" placeholder={error_email} className="custom-input sp_inp" name="email" onChange={handelchange} value={formdata.email} />
        </FloatingLabel>
        </div>

       <div className="row">
          <FloatingLabel controlId="floatingPassword" label={error_password} className="custom-floating-label mb-3 mt-4 col-12 col-md-8  col-lg-8 mx-auto">
          <Form.Control type="password" placeholder={error_password} className="custom-input sp_inp" name="password" onChange={handelchange} value={formdata.password} />
          </FloatingLabel>
       </div>

      <div className="row">
          <FloatingLabel controlId="floatingPassword-1" label={error_re_password} className="custom-floating-label mb-3 mt-4 col-12 col-md-8 col-lg-8 mx-auto">
          <Form.Control type="password" placeholder={error_re_password} className="custom-input sp_inp" name="re_password" onChange={handelchange} value={formdata.re_password} />
          </FloatingLabel>
      </div>

        <div style={{height: "20%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
          <button type="submit">Submit</button>

          <Link to="/signin">Already have an account</Link>
        </div>

      </form>
    </Container>
  );
}
