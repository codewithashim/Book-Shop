import React, { useContext, useEffect } from "react";
import CartContext from "../CartContext";
import "./Styles/summaryBox.css";
export default function summaryBox({ items }) {
  // useEffect(() => {
  console.log(items);
  // }, [items]);

  return (
    <div className="summaryBox">
      <div className="summaryBox_container">
        <div className="summaryBox_container_title">Order Summary</div>
        <div className="summaryBox_container_sub">
          <div>{items.length} Item in Cart</div>
          <div>
            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/1x/external-down-arrows-those-icons-lineal-those-icons-1.png" />
          </div>
        </div>
        <div className="summaryBox_line"></div>
        <div className="summaryBox_container_items">
          {items.map((item) => (
            <div>
              <div>
                <div>
                  <img src={item.book.url} alt="" />
                </div>
                <div>
                  <h2>{item.book.name}</h2>
                  <h3>QTY:{item.book.quantity}</h3>
                </div>
              </div>
              <div>{item.book.price} RS.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
