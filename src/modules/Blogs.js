import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { db } from "../firebase";
import "./Styles/blogs.css";
export default function Blogs() {
  const [blogData, setBlogData] = useState([]);

  const getBlogData = async () => {
    const blogs = [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
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
    <div className="blogs">
      <div>Blog</div>
      <div>
        {blogData.map((blog, index) => {
          if (index < 4) {
            return (
              <Blog
                keyValue={Object.keys(blog)[0]}
                blog={Object.values(blog)[0]}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
