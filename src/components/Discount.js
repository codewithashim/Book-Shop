import React from "react";
import { Link } from "react-router-dom";

const styles = {
  subTotal: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    border: "2px solid #c4c4c4",
    marginBottom: "20px",
  },
  subTotalItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  subLabel: {
    fontSize: "16px",
    color: "#828282",
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
  fullInput: {
    width: "90%",
    padding: "12px",
    border: "1px solid #C4C4C4",
  },
  inlineInput: {
    display: "flex",
    margin: "20px 0",
    justifyContent: "space-between",
  },
  inlineInputBox: {
    width: "50%",
    padding: "12px",
    border: "1px solid #C4C4C4",
  },
};

export default function Discount() {
  return (
    <div className="subtotal" style={styles.subTotal}>
      <div style={styles.subTotalItem}>
        <div style={styles.subTotalLabel}>Apply Discount Code</div>
      </div>
      <input
        style={styles.fullInput}
        type="text"
        placeholder="Enter discount code"
      />
      <div style={styles.subTotalItem}>
        <div style={styles.subTotalLabel}>Estimated Shipping Tax</div>
      </div>
      <div style={styles.subLabel}>
        Enter your destination to get a shipping estimate.
      </div>
      <div style={styles.inlineInput}>
        <div>
          Country <span style={{ color: "red" }}>*</span>
        </div>
        <input
          style={styles.inlineInputBox}
          type="text"
          value="India"
          disabled
        />
      </div>
      <div style={styles.inlineInput}>
        <div>
          State/Province <span style={{ color: "red" }}>*</span>
        </div>
        <input style={styles.inlineInputBox} type="text" />
      </div>
      <div style={styles.inlineInput}>
        <div>Zip/Postal Code</div>
        <input style={styles.inlineInputBox} type="text" />
      </div>
    </div>
  );
}
