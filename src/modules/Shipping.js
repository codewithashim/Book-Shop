import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/InputField";
import { shippingAddress } from "../inputConstant";
import SummaryBox from "./summaryBox";
import "../modules/Styles/shipping.css";
import CartContext from "../CartContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Shipping() {
  const [newValue, setNewValue] = useState({});
  const { items } = useContext(CartContext);

  const [isUser, setIsUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUserEmail(user.email);
        setIsUser(true);
        // ...
      } else {
        // User is signed out
        // ...
        setIsUser(false);
      }
    });
  }, []);

  const updatedValue = (input, value) => {
    const name = input.toLowerCase();
    if (name.includes("first")) {
      setNewValue({ ...newValue, first: value });
    } else if (name.includes("last")) {
      setNewValue({ ...newValue, last: value });
    } else {
      setNewValue({ ...newValue, [name]: value });
    }
  };

  return (
    <div className="ShippingContainer">
      <div className="ShippingContentWrapper">
        <div className="ShippingContentContainer">
          <div className="ShippingContentContainerHeading">
            Shipping Address
          </div>
          {shippingAddress.map((field) => (
            <InputField updatedValue={updatedValue} data={field} />
          ))}
          <div
            className="ShippingContentContainerHeading"
            style={{
              fontSize: "22px",
              fontWeight: "500",
              marginTop: "32px",
            }}
          ></div>
          {!isUser && (
            <div style={{ paddingLeft: "0px" }} className="ShippingButtons">
              <button>Login</button>
            </div>
          )}
          <div className="ShippingContentContainerHeading">Shipping Method</div>
          <div className="shippingMethod">
            <div></div>
            <div>
              <div>Rs. 5.00</div>
              <div>Fixed</div>
              <div>Flat Rate</div>
            </div>
            <div></div>
            <div>
              <div>Rs. 10.00</div>
              <div>Table Rate</div>
              <div>Best Way</div>
            </div>
          </div>

          <div style={{ paddingLeft: "0px" }} className="ShippingButtons">
            <button>Next</button>
          </div>
        </div>
        <div className="Shippingsummary">
          <SummaryBox items={items} />
        </div>
      </div>
    </div>
  );
}
