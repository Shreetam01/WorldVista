import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("id", JSON.stringify(data.user));
        localStorage.setItem("userName", JSON.stringify(data.userName));
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("isLogin", true);
        navigate('/');
        window.location.reload();
      } else {
        console.error('Login failed');
        alert(" Email Or Password Is Incorrect")
        setEmail("")
        setPassword("")

      }
    } catch (error) {
      console.error('Fetch request error:', error);
    }
  };


  return (
    <div className="home">
      <div className="profilePosts">
        <div className="Profilepost">
          <h1>Login Form</h1>
          <form className='postForm' onSubmit={handleSubmit}>
            <div className="headline">
              <h5>Enter Email Id</h5>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="headline">
              <h5>Enter Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn">
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
