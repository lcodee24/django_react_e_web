import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cartnav from "./cart_navbar";
import axios from "axios";
import ip_address from "../address";
import { Col, Row } from "react-bootstrap";

export default function Cart() {

   const [cart,setCart] = useState([])
   const [username,setUsername] = useState("")

   useEffect(()=>{
    setUsername(localStorage.getItem("user_name"))
   },[])
  
  useEffect(()=>{
      axios.get(`http://${ip_address}:8000/api/user/cartproduct/?user_cart=${username}`)
      .then((res)=> 
          setCart(res.data)
      )
      .catch(()=>{
        alert("error ...")
      })
  }) 


  const handleremove = async (obj)=>{
     console.log(obj.id)
      await axios.delete(`http://${ip_address}:8000/api/user/cartremove/?user_cart=${obj.id}`)
      // .then((res)=>{
      //   //  alert(res.data.message)


      // })
      // .catch((err)=>{
      //   // alert(err.data.error)
      // })
  }

  if(cart.length === 0){
    return(
     <>
        <Cartnav/>
        <div className="container mt-5 p-5 bg-light border rounded-3">
          <h1 className="display-4">Your cart is empty</h1>
          <br />
          <Link to="/" className="btn btn-primary btn-lg" href="#" role="button">
          Add anything to cart...
          </Link>
        </div>
     </>
    )
  }


  return(
    <>
        <Cartnav/>
        <div style={{ width: "95vw", height: "auto", marginTop: "20px", marginLeft:"10px"}}>
      <Row className="g-4" style={{margin:"0 auto"}}> 
        {cart.map((obj, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center"> 
            <Card style={{ width: "100%", height: "auto", marginBottom: "20px" }}>
              <Card.Img variant="top"  src={`http://${ip_address}:8000/${obj.img}`} style={{ width: "100%", height: "200px" }} />
              <Card.Body>
                <Card.Title style={{ fontStyle: "italic", textAlign: "center" }}>
                  {obj.title}
                </Card.Title>
                <Card.Text className="fs-5 text-bg-info ">
                  Ratings : {obj.ratings}
                </Card.Text>
                <Card.Text className="fs-5 text-danger">
                  {`Offer Price : ${obj.offer}`} Rs <sub><del>{obj.Originalprice} Rs</del></sub>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" className="mx-2">Buy</Button>
                  <Button variant="primary" className="mx-2" onClick={() => {
                    handleremove({
                      id: obj.id,
                      user_cart: obj.user_cart
                    });
                  }}>Remove</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
  )
}

