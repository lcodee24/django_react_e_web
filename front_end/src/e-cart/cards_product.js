import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import ip_address from '../address';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

export default function Carsproducts() {

  const [cardprod,setCardprod] = useState([])
  const [nocardprod,setNocardprod] = useState(false)
  
  useEffect(()=>{
     axios.get(`http://${ip_address}:8000/api/card_product/`)
     .then((res)=>{
      setCardprod(res.data)
     })
     .catch(()=>{
         setNocardprod(true)
     })
  },[])

    if(!nocardprod){
      return (
        <div className="container mt-4">
          <div className="row">
        {cardprod.map((obj,index)=>
  
                  <div className="col-12 col-md-4 mb-3" key={index}>
                    <Card style={{ width: '100%', height:"auto"}}>
                     <Image style={{backgroundImage:`url(${`http://${ip_address}:8000/${obj.image}`})`,backgroundSize:"contain",backgroundRepeat:"no-repeat", backgroundPosition:"center center",maxWidth:"100%",height:"100px"}}/>
                      <Card.Body>
                        <Card.Title className='text-center'>{obj.title}</Card.Title>
                        <Card.Text className='fs-5'>
                          {obj.para}
                        </Card.Text>
                        <Link className='d-flex justify-content-center align-items-center'><Button variant="primary">Try our new product</Button></Link>
                      </Card.Body>
                    </Card>
                  </div>

        )}
           </div>
        </div>
      )
    }
}






// <div className="col-12 col-md-4 mb-3">
// <Card style={{ width: '100%' }}>
//   <Card.Img variant="top" src="holder.js/100px180" />
//   <Card.Body>
//     <Card.Title>Card Title</Card.Title>
//     <Card.Text className='fs-5'>
//       Some quick example text to build on the card title and make up the bulk of the card's content.
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
// </Card>
// </div>

// <div className="col-12 col-md-4 mb-3">
// <Card style={{ width: '100%' }}>
//   <Card.Img variant="top" src="holder.js/100px180" />
//   <Card.Body>
//     <Card.Title>Card Title</Card.Title>
//     <Card.Text className='fs-5'>
//       Some quick example text to build on the card title and make up the bulk of the card's content.
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
// </Card>