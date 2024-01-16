import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideMainProfile from "./SideMainProfile";
import Recent from "./Recent";
import { MdDeleteOutline } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const WatchList = (props) => {
  const [data, setData] = useState([]);
  const [token, settoken] = useState(props.usertoken);
  const [uid, setUid] = useState(11);

  const fetchWatchListInfo = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:8080/api/users/fetchWatchListInformation",
          { userId: uid, token }
        );

        if (response.status === 200) {
          setData(response.data.data);
        } else {
          console.error("Fetching watch list info failed");
        }
      }
    } catch (error) {
      console.error("Fetch request error:", error);
    }
  };

  useEffect(() => {
    fetchWatchListInfo();
  }, [uid, token]);

  const removeFromWatchList = (id) => {
    const removeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/dltFrmWatchListInformation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, postId: id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert(" Removed From Watchlist Successfully !");
          toast.success(" Removed From Watchlist Successfully !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchWatchListInfo();
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      }
    };

    removeData();
  };

  return (
    <div>
      {props.login ? (
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
                    <div className="btn" style={{ marginTop: "30px" }}>
                      <MdDeleteOutline
                        onClick={() => removeFromWatchList(item.id)}
                        color="blue"
                        cursor="pointer"
                        fontSize={30}
                      />
                    </div>
                  </div>
                  <div className="content">
                    <Link to={`/post/${item.id}`}>
                      <h1>{item.title}</h1>
                      <h3>{item.username}</h3>
                      <h6>{item.date}</h6>
                      <p>
                        {item.description.slice(0, 500)}
                        {item.description.length > 500 ? "..." : ""}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="home">
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
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default WatchList;
