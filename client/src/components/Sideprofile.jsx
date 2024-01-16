import React from "react";
import { Link } from "react-router-dom";

const Sideprofile = () => {
  return (
    <>
      <div className="profile">
        <div className="contant">
          <div className="quicklinks">
            <Link className="qklink">About</Link>
            <Link className="qklink">Privacy & Terms</Link>
            <Link className="qklink">Help Center</Link>
            <Link className="qklink">Community Guidelines</Link>
            <Link className="qklink">Contact</Link>
          </div>
        </div>
      </div>
      <div className="copyright">
      <p><span id="blue">WorldVista </span>&copy; 2024 Kolkata India, inc. All rights reserves</p>
      </div>
    </>
  );
};

export default Sideprofile;
