import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import "../e-cart/navbar.css"
import axios from 'axios';
import ip_address from '../address';


export default function Cartnav() {

  const [username, setUsername] = useState("");
  const [count,setCount] = useState("")
  

  useEffect(()=>{

    setUsername(
      localStorage.getItem("user_name")
    )
  },[]) 

  useEffect(()=>{
    axios.get(`http://${ip_address}:8000/api/user/cartproduct/?user_cart=${username}`)
    .then((res)=>{
      setCount(res.data.length)  
  })
  })


  return (
     
<Navbar expand="lg" className="bg-black home_navbar">
  <Container fluid>
    <Navbar.Brand href="" className='text-white'>{username || 'Guest'}</Navbar.Brand>

    {/* Navbar Toggle Button */}
    <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: "white", borderColor: "gray" }} />

    <Navbar.Collapse id="navbarScroll" className="justify-content-between">
      <Nav
        className="me-auto my-2 my-lg-0 d-flex flex-row justify-content-start align-items-center"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >      

         <Link to="/" className='text-white ms-2 me-5' style={{ textDecoration: "none", alignContent: "center" }}>
            Home
          </Link>
  
          <Link
            style={{ textDecoration: "none", alignContent: "center", color: "black" }}
            className='cart-count-link'
            to="/cart"
          >
            <CiShoppingCart className='cart-icon' />
            <span className='cart-count'>{count}</span>
            <span className='text-white'>cart</span>
          </Link>

      </Nav>

    
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

