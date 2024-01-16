import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ContantPage = () => {
  const { id } = useParams();
  const [shoeSize, setshoeSize] = useState(null);
  const [post, setPost] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/posts/getPostDetailssByParamId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setPost(data.data[0]);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error("Fetch request error:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="home">
      <div className="contantPagePosts">
        <div className="contantPagepost">
          <div className="contantPageimg">
            <img
              src={post.img}
              alt=""
            />
          </div>
          <div className="contantPageContant">
            <h1>{post.title}</h1>
            <h3>{post.username}</h3>
            <h6>{post.date}</h6>
            <h4>{post.location}</h4>
            <br />
            <p>
              {post.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContantPage;
