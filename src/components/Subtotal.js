import React from "react";
import { Link } from "react-router-dom";

const styles = {
  subTotal: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    border: "2px solid #c4c4c4",
  },
  subTotalItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  subTotalLabel: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  subTotalValue: {
    fontSize: "18px",
  },
  button: {
    background: "#000000",
    color: "white",
    border: "none",
    outline: "none",
    padding: "12px",
    width: "100%",
  },
};

export default function Subtotal({ items, handleRedirect }) {
  const totalPrice = items.reduce((acc, item) => {
    const itemPrice =
      parseInt(item?.book?.price) * parseInt(item?.book?.quantity);
    return acc + itemPrice;
  }, 0);
  return (
    <div className="subtotal" style={styles.subTotal}>
      <div style={styles.subTotalItem}>
        <div style={styles.subTotalLabel}>Subtotal</div>
        <div style={styles.subTotalValue}>Rs. {totalPrice}</div>
      </div>
      <div style={styles.subTotalItem}>
        <div style={styles.subTotalLabel}>Tax</div>
        <div style={styles.subTotalValue}>Rs. 0.00</div>
      </div>
      <div style={styles.subTotalItem}>
        <div style={styles.subTotalLabel}>Order Total</div>
        <div style={styles.subTotalValue}>Rs. {totalPrice}</div>
      </div>
      <div className="divider"></div>
      <div style={styles.subTotalItem}>
        <Link to="/shipping">
          <button style={styles.button}>Proceed to checkout</button>
        </Link>
      </div>
    </div>
  );
}
