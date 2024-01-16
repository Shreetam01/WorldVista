import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserPic from "./userPic.jpg";
import { MdDeleteOutline } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Profile = (props) => {
  const [headline, setheadline] = useState("");
  const [address, setaddress] = useState("");
  const [about, setabout] = useState("");
  const [name, setname] = useState("");
  const [uid, setuid] = useState(11);
  const [userPost, setuserPost] = useState([]);
  const [token, settoken] = useState(props.usertoken);

  console.log(token);

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
            body: JSON.stringify({ userId: uid, token }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setheadline(data.data[0].headline);
          setaddress(data.data[0].address);
          setabout(data.data[0].about);
        } else {
          console.error("Fetching profile info failed");
        }
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  const fetchProfilePosts = async () => {
    try {
      if (token) {
        const response = await fetch(
          "http://localhost:8080/api/posts/getPostsByUserId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: uid, token }),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setuserPost(data.data);
        } else {
          console.error("Fetching profile info failed");
        }
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchProfileInfo();
    fetchProfilePosts();
  }, [token]);

  const deletePost = (postId) => {
    const detelePostData = {
      postId,
    };
    fetch("http://localhost:8080/api/posts/removePostDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detelePostData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        fetchProfilePosts();
        toast.success(" Your Post Is Deleted Successfully !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
    fetchProfilePosts();
  };

  return (
    <>
      <div className="home">
        <div className="profilePage">
          <div className="profilePosts">
            <div className="ProfileDetails">
              <img src={UserPic} alt="" />
              <h1>{name}</h1>
              {!address && !headline && !about ? (
                <div className="logInRedirectbtn">
                  <button>
                    <Link id="logInRedirectlink" to="/updateProfile">
                      Update Profile
                    </Link>
                  </button>
                </div>
              ) : (
                <>
                  <span>{address}</span>
                  <div className="aboutProfile">
                    <b>Headline</b>
                    <p>{headline} </p>
                  </div>
                  <div className="headlineProfile">
                    <b>About</b>
                    <p>{about} </p>
                  </div>
                </>
              )}
            </div>
            <div className="Profilepost">
              <h3>Posts</h3>
              {userPost.map((item) => (
                <>
                  <div className="smallpost">
                    <div className="smallpost-img">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="smallpost-contant">
                      <b>{item.title}</b>
                      <br />
                      <p>
                        {item.description.slice(0, 150)}
                        {item.description.length > 150 ? "..." : ""}
                      </p>
                      <span>{item.date}</span>
                      <br />
                      <button id="w20" onClick={() => deletePost(item.id)}>
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
