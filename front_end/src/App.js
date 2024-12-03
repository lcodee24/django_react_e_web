import './App.css';
// import ClassProps from './classcomponent';

import {BrowserRouter,Routes,Route} from "react-router-dom"
// import Useeffect from './hooks/useeffect';
// import Search from './search';
import Navbarnav from './e-cart/navbar';
import Signup from './e-cart/signup';
import Signin from './e-cart/signin';
import Home from './e-cart/home';
import Cart from './e-cart/cart';
import Cartnav from './e-cart/cart_navbar';
import UserName from './e-cart/username';
import { useEffect, useState } from 'react';
import Carsproducts from './e-cart/cards_product';

function App() {

   const [email,setEmail] = useState("")


   const handleuseremail = ((user_email)=>{
        setEmail(user_email)
   })

   return(
    <BrowserRouter>
      <Routes>
           <Route path="/navbar" element={<Navbarnav/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/signin" element={<Signin  onemail={handleuseremail}/>}/>
           <Route path="/" element={<Home/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/cartnav" element={<Cartnav/>}/>
           <Route path="/username" element={<UserName onuseremail = {email}/>}/>
           <Route path="/carsproducts" element={<Carsproducts/>}/>

      </Routes>
   </BrowserRouter>
   )
}

export default App;

