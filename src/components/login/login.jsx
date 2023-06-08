import React, { useState } from 'react';
import {Login} from '../../helphers/api'
import { useNavigate } from 'react-router';
import './index.css';
import Background from '../../assets/wepik-export-20230430205300.png'

const LoginPage = () => {
    const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    try {
        const response = await Login({email:username,password:password})
    console.log(response)
    localStorage.setItem('accessToken',response.data.accessToken)
    navigate('/home')

    } catch (error) {
        
    }
    
  };

  return (
    <div className='login_component'  >
      <div className='login_section' style={{background:`url(${Background})`}}>
      <div className='login_header'>
        <h1>Login Page</h1>
        </div>

     <form onSubmit={handleSubmit}>
        <div className='login_label '>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        
<div className='login_label'>
<label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
</div>
        
<div className='login_label'>
<button type="submit">Log In</button>
</div>
        
      </form>
      </div>
       
      
    </div>
  );
};

export default LoginPage;
