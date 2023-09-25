import React, { useContext, useEffect } from "react";
import "../modules/Styles/book.css";
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
          <img src={book?.url} loading="lazy" alt={book?.name} className="bookImg"/>
        </div>
        <div>{book?.name}</div>
        <div>{book?.price} Rs.</div>
      </div>
    </Link>
  );
}
