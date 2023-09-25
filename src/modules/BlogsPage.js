import { collection, getDocs, query, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import { db } from "../firebase";
import "./Styles/blogpage.css";

function BlogsPage() {
  const [blogData, setBlogData] = useState([]);

  const getBlogData = async () => {
    const blogs = [];
    const querySnapshot = await getDocs(
      query(collection(db, "blogs"), orderBy("date", "desc"))
    );
    querySnapshot.forEach((doc) => {
      blogs.push({ [doc.id]: doc.data() });
      if (blogs.length === querySnapshot.size) {
        setBlogData(blogs);
      }
    });
  };
  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div className="blogs-page">
      <div className="blogs-page-container">
        <h2 className="blogs-page-title">Recent Blog Posts</h2>
        <ul className="blogs-page-list">
          {blogData.length > 0 &&
            blogData.map((post) => {
              const keyValue = Object.keys(post)[0];
              const data = Object.values(post)[0];
              return (
                <li key={Object.keys(post)[0]} className="blogs-page-item">
                  <Blog fromBlogPage={true} keyValue={keyValue} blog={data} />
                  <img
                    style={{
                      width: "280px",
                      height: "280px",
                      marginLeft: "auto",
                    }}
                    src={
                      data?.imageUrl?.length > 0
                        ? data?.imageUrl
                        : "https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_960_720.jpg"
                    }
                    alt=""
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default BlogsPage;
