import React, { useEffect, useState } from "react";
import Sideprofile from "./Sideprofile";
import SideMainProfile from "./SideMainProfile";
import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { AiOutlineLogin } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [uid, setUid] = useState(2);
  const [postid, setPostid] = useState();
  const [token, settoken] = useState(props.usertoken);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const watchListSubmit = (postId) => {
    setPostid(postId);

    const registrationData = {
      userId: uid,
      postId,
      token,
    };

    fetch("http://localhost:8080/api/users/addWatchListInformation", {
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
        toast.success(" Added To Watchlist !", {
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
        toast.error("Network error!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      <div className="home">
        <div className="sidebar" id="leftsidebar">
          <SideMainProfile />
        </div>
        <div className="posts">
          {data.map((item) => (
            <div className="post" key={item.id}>
              <div className="img">
                <img src={item.img} alt="" />

                {props.login ? (
                  <div className="btn" style={{ marginTop: "30px" }}>
                    <GoHeart
                      onClick={() => watchListSubmit(item.id)}
                      color="blue"
                      cursor="pointer"
                      fontSize={30}
                    />
                  </div>
                ) : (
                  <div
                    className="btn"
                    style={{ alignItems: "center", marginTop: "30px" }}
                  >
                    <Link
                      to={"/login"}
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textAlign: "center",
                        color: "blue",
                      }}
                    >
                      {" "}
                      <AiOutlineLogin color="blue" /> Log In To Save Post In
                      WatchList
                    </Link>
                  </div>
                )}
              </div>
              <div className="content">
                <a href={`/post/${item.id}`}>
                  <h1>{item.title}</h1>
                  <h3>{item.username}</h3>
                  <h6>{item.date}</h6>
                  <p>
                    {item.description.slice(0, 500)}
                    {item.description.length > 500 ? "..." : ""}
                  </p>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar" id="rightsidebar">
          <Sideprofile />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
