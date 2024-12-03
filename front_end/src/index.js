import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Firstname from './App_fun1';
// import Lifecycle2 from './lifecycle/lifecyle';
// import StateExample from './hooks/usestate';
// import SignupForm from './hooks/usestate';
// import Useeffect from './hooks/useeffect';
// import Usecontext from './hooks/usecontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <>
   <App />
   {/*  */}
   {/* <Firstname fn = "udhaya" /> */}
   {/* <Lifecycle2/> */}
   {/* <StateExample /> */}
   {/* <SignupForm /> */}
   {/* {/* <Useeffect/> */}
   {/* <Usecontext/> */}
   </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
