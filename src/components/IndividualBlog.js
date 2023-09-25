import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import "./individualBlog.css";

export default function IndividualBlog() {
  const params = useParams();
  const [blogPost, setBlogPost] = useState();
  const [popularBlogs, setPopularBlogs] = useState([]);

  useEffect(() => {
    if (params?.id && params?.id?.length > 0) {
      getBlogData(params?.id);
    }
    getPopularBlogs();
  }, []);

  const getBlogData = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBlogPost(docSnap.data());
    } else {
    }
  };

  const getPopularBlogs = async () => {
    const query = collection(db, "blogs");
    const querySnapshot = await getDocs(query);
    const fetchedBlogs = querySnapshot.docs.map((doc) => doc.data());
    setPopularBlogs(fetchedBlogs);
  };

  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  return (
    blogPost && (
      <div>
        <div style={{ height: "80vh" }}>
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            src={
              blogPost?.imageUrl ||
              "https://cdn.pixabay.com/photo/2017/06/10/16/22/coffee-2390136_960_720.jpg"
            }
          />
        </div>
        <div className="individualblogContainer" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "60%", padding: "1rem" }}>
            <div
              style={{
                background: "rgb(234 234 234)",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "18px",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                Blog: Books
              </p>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "500",
                  marginTop: "8px",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {blogPost.title}
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  color: "#666666",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                Posted on {convertTimestampToDate(blogPost.date)}
              </p>
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginTop: "24px",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              {blogPost.subtitle}
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.6,
                marginBottom: "24px",
                textIndent: "30px",
              }}
            >
              <span style={{ fontSize: "32px", fontWeight: "bold" }}>
                {blogPost.content.charAt(0)}
              </span>
              {blogPost.content.slice(1)}
            </p>
          </div>
          <div style={{ width: "30%", padding: "1rem" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "400",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              Recent Blogs
            </h2>
            {popularBlogs.map(
              (popularBlog, index) =>
                index < 3 && (
                  <div
                    key={index}
                    style={{ marginBottom: "32px", display: "flex" }}
                  >
                    <img
                      src={
                        popularBlog.imageUrl ||
                        "https://cdn.pixabay.com/photo/2017/06/10/16/22/coffee-2390136_960_720.jpg"
                      }
                      alt={popularBlog.title}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "400",
                          marginBottom: "8px",
                        }}
                      >
                        {popularBlog.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                        }}
                      >
                        {popularBlog.subtitle}
                      </p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    )
  );
}
