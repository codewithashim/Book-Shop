import React, { createContext, useContext, useEffect } from "react";
import "../modules/Styles/book.css";
import AlloneImage from "../Images/AlloneImage.png";
import Img1 from "../BookImgs/kindergarden/1.png";
import Img2 from "../BookImgs/kindergarden/2.png";
import Img3 from "../BookImgs/kindergarden/3.png";
import Img4 from "../BookImgs/kindergarden/4.png";
import Img5 from "../BookImgs/kindergarden/5.png";
import Img6 from "../BookImgs/kindergarden/6.png";
import Img7 from "../BookImgs/kindergarden/7.png";
import Img8 from "../BookImgs/kindergarden/8.png";
import CartContext from "../CartContext";
import { Link } from "react-router-dom";
export default function Book({ index, book, keys }) {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(book?.name, book?.price, book?.url);
  };

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <Link style={{ flex: " 0 0 10rem" }} to={`/book/${keys}`}>
      <div
        style={{ cursor: "pointer" }}
        // onClick={handleAddToCart}
        className="book"
      >
        <div>
          <img src={book?.url} loading="lazy" alt={book?.name} />
        </div>
        <div>{book?.name}</div>
        <div>{book?.price} Rs.</div>
      </div>
    </Link>
  );
}
