import React, { useState } from "react";
import SideMainProfile from "./SideMainProfile";
import Recent from "./Recent";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Write = (props) => {
  const [file, setfile] = useState();
  const [title, settitle] = useState();
  const [desc, setdesc] = useState();
  const [location, setlocation] = useState();
  const [tag, settag] = useState();
  const [img, setimg] = useState();
  const [token, settoken] = useState(props.usertoken);
  const [uid, setuid] = useState(3);
  const navigate = useNavigate();

  const handleFile = (e) => {
    setfile(e.target.files[0]);
  };
  const handleUpload = (e) => {
    e.preventDefault();

    const registrationData = {
      title,
      desc,
      location,
      tag,
      img,
      uid,
      token,
    };

    fetch(`http://localhost:8080/api/posts/newpost`, {
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
        alert(" New Post Is Submited Succesfully !");
        toast.success(" New Post Is Submited Succesfully !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/");
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };
  return (
    <>
      <div className="home">
        {props.login ? (
          <>
            <div className="sidebar" id="leftsidebar">
              <SideMainProfile />
            </div>
            <div className="profilePosts">
              <div className="Profilepost">
                <h1>Post Your Post</h1>
                <form className="postForm">
                  <div className="headline">
                    <h5>Headline</h5>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                    />
                  </div>
                  <div className="headline">
                    <h5>Post Contant</h5>

                    <textarea
                      id="w3review"
                      name="post-contant"
                      value={desc}
                      onChange={(e) => setdesc(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="headline">
                    <h5>Location</h5>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setlocation(e.target.value)}
                    />
                  </div>
                  <div className="headline">
                    <h5>Tags</h5>
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => settag(e.target.value)}
                    />
                  </div>
                  <div className="headline">
                    <h5>Image</h5>
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => setimg(e.target.value)}
                    />
                  </div>
                  <div className="btn">
                    <button onClick={handleUpload}>Submit Post</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="logInRedirect">
              <h1>Please Log In First</h1>
              <div className="logInRedirectbtn">
                <button>
                  <Link id="logInRedirectlink" to="/login">
                    Go To Log In Page
                  </Link>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Write;
