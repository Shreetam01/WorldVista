import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAndRefresh = async () => {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("userName");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      window.location.reload();

      navigate("/");
    };

    logoutAndRefresh();
  }, [navigate]);
  return (
    <div>
      <h2>Logging Out...</h2>
    </div>
  );
};

export default Logout;
