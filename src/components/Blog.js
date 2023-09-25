import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../modules/Styles/blog.css";
export default function Blog({ blog, keyValue, fromBlogPage }) {
  const [addedDate, setAddedDate] = useState(null);

  useEffect(() => {
    const timestamp = blog.date; // milliseconds elapsed since Jan 1, 1970
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString(); // format the date as a string
    const timeString = date.toLocaleTimeString(); // format the time as a string

    setAddedDate(`${dateString} ${timeString}`, ">>>>"); // output: "04/26/2023 6:46:02 PM"
  }, []);

  return (
    <Link to={`/posts/${keyValue}`}>
      <div
        style={
          fromBlogPage
            ? { width: "auto", minHeight: "300px", height: "auto" }
            : null
        }
        className="blog"
      >
        <div className="heading clipped-heading">{blog?.title}</div>
        <div className="subHeading clipped-subheading">{blog.subtitle}</div>
        <div className="content clipped-text">{blog?.content}</div>
        <div className="divider"></div>
        <div className="blogFooter">{addedDate && addedDate}</div>
      </div>
    </Link>
  );
}
