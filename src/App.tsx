import React, { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './components/login/login';
import {Route} from 'react-router'
import { Routes, BrowserRouter} from 'react-router-dom'
import { Home } from './components/home';
import { ListPasswords } from './components/list/list';
import Background from './assets/wepik-export-20230430205300/4940019.jpg'
import { CustomizedProgressBars } from './element';


function App() {
  
  return (
    <div className="App" style={{ backgroundImage: `url(${Background})` }}>
    
     
      <BrowserRouter    >
      <Routes >
      <Route element={<CustomizedProgressBars/>} path='/'/>
      <Route element={<LoginPage/>} path='/login'/>
      <Route  path='/home' element={<Home/>}/>
      <Route element={<ListPasswords/>} path='/password'/>
     
      </Routes>

      
    
   
     </BrowserRouter>
     

    

    </div>
  );
}

export default App;
