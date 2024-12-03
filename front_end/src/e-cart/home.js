import { useEffect, useState } from "react";
import Navbarnav from "./navbar";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'react-bootstrap/Image';
import ip_address from "../address" 


import "./home.css"
import Slider from "./slider";
import Carsproducts from "./cards_product";

export default function Home(){
  const [product, setProduct] = useState([]);
  const [searchproduct, setSearchproduct] = useState("");  
  const [cart_count , setCartcount ] = useState("")
  const [user_cart,setUser_cart] = useState("")

  
 useEffect(()=>{

  axios.get(`http://${ip_address}:8000/api/user/cartproduct/?user_cart=${user_cart}`)
    .then((res)=>{
      setCartcount(res.data.length)
  })
 })

  useEffect(()=>{
    setUser_cart(localStorage.getItem("user_name"))  
  },[user_cart])

  useEffect(() => {
    setTimeout(() => {

      axios.get(`http://${ip_address}:8000/api/product/cart`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((error)=>{
          alert("OOPS! Error in fetching products!" , error)
        })

    }, 500);

    setUser_cart(localStorage.getItem("user_name"))  
  });

 
  const handleSearch = (searchVal) => {
    setSearchproduct(searchVal);    
  };

  const handlecount = async (add_cart_obj) =>{
        
    await axios.get(`http://${ip_address}:8000/api/user/cartproduct/?user_cart=${user_cart}`)
    .then((res)=>{
      setCartcount(res.data.length)
  })

    await axios.post(`http://${ip_address}:8000/api/user/cartproduct/`,add_cart_obj) 
    // console.log(add_cart_obj)
  }


  const handlelink = (name) => {
    setUser_cart(name)
  }

  const filteredProducts = searchproduct
    ? product.filter((obj) =>
      obj.title.toLowerCase().startsWith(searchproduct.toLowerCase()) ||  obj.category.toLowerCase().startsWith(searchproduct.toLowerCase())
      )
    : product;

  return (

<div className="App">
  <Navbarnav onSearch={handleSearch} nameuser={handlelink} />

  

   {
     searchproduct !== "" ? 

       ""
     :
     <>
     <Slider/>
     <Carsproducts/>
   </>
   }

  <Container fluid className="my-4 home">
    <Row className="g-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((obj, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="home_product">
            <Card className="h-100" style={{ marginBottom: "20px" }}>
            <Image style={{backgroundImage:`url(${`http://${ip_address}:8000/${obj.image}`})`,backgroundSize:"contain",backgroundRepeat:"no-repeat", backgroundPosition:"center center",maxWidth:"100%",height:"100px"}}/>
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontStyle: "italic", textAlign: "center" }}>
                  {obj.title}
                </Card.Title>
                <Card.Text className="fs-5 text-bg-info rating">
                  Ratings: {obj.ratings}
                </Card.Text>
                <Card.Text className="fs-5 text-danger">
                  {`Offer Price : ${obj.offerprice}`} Rs <sub><del>{obj.orginalPrize} Rs</del></sub>
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button variant="primary" className="mx-2">Buy</Button>
                  {user_cart && (
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => handlecount({
                        user_cart,
                        img: obj.image,
                        title: obj.title,
                        rating: obj.ratings,
                        offer: obj.offerprice,
                        Originalprice: obj.orginalPrize
                      })}
                    >
                      <AiOutlineShoppingCart className="cart-icon-add" /> Add
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        product.map((obj, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="home_product g-2">
            <Card className="h-100" style={{ marginBottom: "20px" }}>
            <Image style={{backgroundImage:`url(${`http://${ip_address}:8000/${obj.image}`})`,backgroundSize:"contain",backgroundRepeat:"no-repeat", backgroundPosition:"center center",maxWidth:"100%",height:"100px"}}/>
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontStyle: "italic", textAlign: "center" }}>
                  {obj.title}
                </Card.Title>
                <Card.Text className="fs-5 text-bg-info rating">
                  Ratings: {obj.ratings}
                </Card.Text>
                <Card.Text className="fs-5 text-danger">
                  Offer Price: {obj.offerprice}
                </Card.Text>
                <Card.Text className="fs-5 text-warning">
                  Original Price: {obj.orginalPrize}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button variant="primary" className="mx-2">Buy</Button>
                  {user_cart && (
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => handlecount({
                        user_cart,
                        img: obj.image,
                        title: obj.title,
                        rating: obj.ratings,
                        offer: obj.offerprice,
                        Originalprice: obj.orginalPrize
                      })}
                    >
                      <AiOutlineShoppingCart className="cart-icon-add" /> Add
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  </Container>

</div>
  );
}
