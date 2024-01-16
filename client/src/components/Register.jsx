import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    const registrationData = {
      username,
      email,
      password,
    };

    await fetch("http://localhost:8080/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Registration successful");
        navigate("/login");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("Network error:", error);
        alert("Registration failed : EmailID alredy Taken");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      });
  };

  return (
    <div className="home">
      <div className="profilePosts">
        <div className="Profilepost">
          <h1>Registration</h1>
          <form className="postForm">
            <div className="headline">
              <h5>User Name</h5>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="headline">
              <h5>Email Id</h5>
              <input
                type="email"
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
            <div className="headline">
              <h5>Confirm Your Password</h5>
              <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="btn">
              <button onClick={handleRegister}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
