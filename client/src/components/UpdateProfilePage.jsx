import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const UpdateProfilePage = (props) => {
  const [headline, setheadline] = useState("");
  const [address, setaddress] = useState("");
  const [about, setabout] = useState("");
  const [token, settoken] = useState(props.usertoken);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const registrationData = {
      headline,
      address,
      about,
      token,
    };

    await fetch("http://localhost:8080/api/users/addProfileInformation", {
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
        alert("Your Profile Is Updated Successfully !");

        toast.success(" Your Profile Is Updated Successfully !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/profile");
      })
      .catch((error) => {
        alert("Network error:", error);
      });
  };
  return (
    <>
      <div className="home">
        <div className="profilePosts">
          <div className="Profilepost">
            <h1>Profile Info</h1>
            <form className="postForm">
              <div className="headline">
                <h5>Input Your Headline</h5>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setheadline(e.target.value)}
                />
              </div>
              <div className="headline">
                <h5>Input Your Location</h5>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
              <div className="headline">
                <h5>Input Something About Yourself</h5>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setabout(e.target.value)}
                />
              </div>

              <div className="btn">
                <button onClick={handleRegister}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfilePage;
