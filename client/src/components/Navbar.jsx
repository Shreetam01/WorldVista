import React, { useState } from "react";
import Logo from "./logo.png"
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";

const Navbar = (props) => {
  const [UserName, setUserName] = useState(props.name)
  return (
    <>
      <div className="nav">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/your-post">New Post</Link>
          <Link to="/watchlist">Watch List</Link>
          {props.login ? (
            <>
              <Link to="/logout">Logout</Link>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
        <div className="menubar">
          <div class="dropdown">
            <button class="dropbtn">
              <IoMenuOutline color="black" />
            </button>
            <div class="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/your-post">New Post</Link>
              <Link to="/watchlist">Watch List</Link>
              {props.login ? (
                <>
                  <Link to="/logout">Logout</Link>
                  <Link to="/profile">{props.name}</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
