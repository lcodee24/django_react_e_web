import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import "../e-cart/navbar.css"
import axios from 'axios';
import ip_address from "../address"

export default function Navbarnav({onSearch,nameuser}){
  
  const [username, setUsername] = useState("");
  const [noproduct , setNoproduct] = useState("");
  const [cart_count , setCartcount ] = useState()

  useEffect(()=>{  
    axios.get(`http://${ip_address}:8000/api/user/cartproduct/?user_cart=${username}`)
      .then((res)=>{
        setCartcount(res.data.length) 
    })
   })
        

  const handleChange = async(e) => {
    const searchval = e.target.value;
    onSearch(searchval);  
   
   await axios.get(`http://${ip_address}:8000/api/product/cart`)
    .then((res)=>
        res.data.filter((obj)=>
          obj.title.toLowerCase().startsWith(searchval.toLowerCase()) ||  obj.category.toLowerCase().startsWith(searchval.toLowerCase())
        )
      )
    .then((arr)=>{
      if(arr.length === 0){
            setNoproduct("Product not available.")
      }
      else{
        setNoproduct("")
      }
    })  
  };

  useEffect(()=>{
    setUsername(
      localStorage.getItem("user_name")
    )
  },[]) 

  useEffect(()=>{
  },[username])


  const handlelogout = async ()=> {

     await axios.post(`http://${ip_address}:8000/api/logout/`,username)
      .then((res)=>{
          localStorage.setItem("user_name","")
          setUsername(localStorage.getItem("username"))
          setUsername("")
          nameuser(localStorage.getItem("user_name"))
      })

      await axios.get(`http://${ip_address}:8000/api/user/cartproduct/?user_cart=${username}`)
      .then((res)=>{
        setCartcount(res.data.length)
    })
  }
  
  return (
    <Navbar expand="lg" className="bg-black home_navbar">
  <Container fluid>
    <Navbar.Brand href="" className='text-white'>{username || 'Guest'}</Navbar.Brand>

    <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: "white", borderColor: "gray" }} />

    <Navbar.Collapse id="navbarScroll" className="justify-content-between">
      <Nav
        className="me-auto my-2 my-lg-0 d-flex flex-column flex-lg-row align-items-center"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        {username ? (
          <Link
            style={{ textDecoration: "none", alignContent: "center", color: "white" }}
            className='cart-count-link d-flex align-items-center'
            to="/cart"
          >
            <CiShoppingCart className='cart-icon me-1' />
            <span className='cart-count'>{cart_count}</span>
            <span className='text-white ms-2 cart'>Cart</span>
          </Link>
        ) : ""}
      </Nav>

      <Form className="d-flex flex-column flex-md-row justify-content-center align-items-center w-100 w-lg-50  mt-2 mt-lg-0">
        <p className='me-2 mb-2 mb-md-0 text-center' style={{ fontSize: "18px", flex: '1' }}>{noproduct}</p>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={handleChange}
        />
      </Form>

      <Nav
        className="mx-5 my-2 my-lg-0 d-flex flex-column flex-lg-row align-items-center"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        {!username ? (
          <>
            <Link style={{ textDecoration: "none", color: "white" }} className='mx-3 my-2 my-lg-0' to="/signin">SignIn</Link>
            <Link style={{ textDecoration: "none", color: "white" }} className='mx-3 my-2 my-lg-0' to="/signup">SignUp</Link>
          </>
        ) : (
          <Link style={{ textDecoration: "none", color: "white" }} onClick={handlelogout} className='mx-3 my-2 my-lg-0'>Logout</Link>
        )}
      </Nav>

    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
