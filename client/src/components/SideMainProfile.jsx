import React, { useEffect, useState } from "react";
import UserPic from "./userPic.jpg";

const SideMainProfile = () => {
  const [headline, setheadline] = useState("");
  const [address, setaddress] = useState("");
  const [about, setabout] = useState("");
  const [name, setname] = useState("");
  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("token")) || null
  );
  const [isLogIn, setIsLogIn] = useState(
    () => JSON.parse(localStorage.getItem("isLogin")) || false
  );

  useEffect(() => {
  const fetchUserName = async () => {
    try {
      if (token) {
        const response = await fetch(
          "http://localhost:8080/api/users/getUserName",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setname(data.data[0].username);
        } else {
          console.error("Fetching profile info failed");
        }
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };
  fetchUserName();
}, [token]);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        if (token) {
          const response = await fetch(
            "http://localhost:8080/api/users/profileInfo",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            console.log(data.data[0]);
            setheadline(data.data[0].headline);
            setaddress(data.data[0].address);
            setabout(data.data[0].about);
            // setname(data.data[0].username);
          } else {
            console.error("Fetching profile info failed");
          }
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      }
    };

    fetchProfileInfo(); 
  }, [token]);



  return (
    <>
      <div className="profile">
        <img src={UserPic} alt="" />
        {isLogIn ? (
          <>
            {!address && !headline && !about ? (
              <>
                <div className="contant" style={{ textAlign: "center" }}>
                  <h3>{name}</h3>
                  <p>Add Your Headline</p>
                </div>
              </>
            ) : (
              <>
                <div className="contant" style={{ textAlign: "center" }}>
                  <h3>{name}</h3>
                  <p>{headline}</p>
                  <hr />
                </div>
                <div className="contant" style={{ textAlign: "center" }}>
                  <p>{about}</p>
                  <hr />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="contant" style={{ textAlign: "center" }}>
              <h3>User</h3>
              <p>Add Your Headline</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideMainProfile;
