import React, { useContext, useEffect, useState } from "react";
import InputField from "../components/InputField";
import Book from "../components/Book";
import "./Styles/dashboard.css";
import { accountInfo, addressFields, contactInfo } from "../inputConstant";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import CartContext from "../CartContext";

export default function Dashboard({ route }) {
  const { wishList, addToCart, removeFromWishList } = useContext(CartContext);

  const location = useLocation();
  const [activeNav, setActiveNav] = useState(1);
  const [isUser, setIsUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [newValue, setNewValue] = useState({});

  const navigation = useNavigate();

  useEffect(() => {
    if (location?.state?.setNav) {
      setActiveNav(location.state.setNav);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setIsUser(true);
      } else {
        setIsUser(false);
        navigation("/");
      }
    });
  }, []);

  useEffect(() => {
    getData();
  }, [userEmail]);

  const getData = async () => {
    if (userEmail.length) {
      const docRef = doc(db, "users", userEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

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

  useEffect(() => {
    console.log(activeNav);
    setNewValue({});
  }, [activeNav]);

  const handleUpdateAccountInfo = () => {
    console.log(newValue, userEmail);
    if (newValue) {
      const userD = doc(db, "users", userEmail);
      setDoc(userD, newValue, { merge: true });
    }
  };

  const handleAddToCart = (book) => {
    addToCart({ ...book, quantity: 1, selectedValue: "Hard" });
  };

  const handleRemoveFromCart = (book) => {
    removeFromWishList({ ...book });
  };

  return isUser ? (
    <div className="dashboardContainer">
      <div className="burgerDashboardNav">
        <div class="burgerDashboardNav">
          <select
            value={activeNav}
            onChange={(e) => setActiveNav(e.target.value)}
            id="dashboardSelect"
          >
            <option value="1">Account Dashboard</option>
            <option value="2">Account Information</option>
            <option value="3">Address Book</option>
            <option value="4">My Orders</option>
            <option value="5">My Wishlist</option>
          </select>
        </div>
      </div>
      <div className="dashboardContainerHeading">
        {activeNav == 1 && "My Dashboard"}
        {activeNav == 3 && "Add New Address"}
      </div>
      <div className="dashboardContentWrapper">
        <div className="dashboardNav">
          <div>
            <div
              onClick={() => setActiveNav(1)}
              className={activeNav == 1 ? "dashboardActive" : ""}
            >
              Account Dashboard
            </div>
            <div
              onClick={() => setActiveNav(2)}
              className={activeNav == 2 ? "dashboardActive" : ""}
            >
              Account Information
            </div>
            <div
              onClick={() => setActiveNav(3)}
              className={activeNav == 3 ? "dashboardActive" : ""}
            >
              Address Book
            </div>
            <div
              onClick={() => setActiveNav(4)}
              className={activeNav == 4 ? "dashboardActive" : ""}
            >
              My Orders
            </div>
            <div
              onClick={() => setActiveNav(5)}
              className={activeNav == 5 ? "dashboardActive" : ""}
            >
              My Wishlist
            </div>
          </div>
        </div>
        {activeNav == 1 && (
          <div className="dashboardContent">
            <div className="dashboardContentContainer">
              <div className="dashboardContentContainerHeading">
                Account Information
              </div>
              <div className="dashboardCard">
                <div>Contact Information</div>
                <div>
                  {userData &&
                    `${userData?.first} ${userData?.last}, ${userData?.email}, ${userData["phone number"]}`}
                </div>
                <button onClick={() => setActiveNav(2)}>Edit</button>
              </div>
              <div className="dashboardContentContainerHeading">
                Address Book
              </div>
              <div className="dashboardCardContainer">
                <div className="dashboardCard">
                  <div>Default Billing Address</div>
                  {userData?.country?.length === 0 ? (
                    <div>You have not set a default billing address.</div>
                  ) : (
                    <div>
                      {userData &&
                        ` ${
                          userData["street address"] &&
                          userData["street address"]
                        } 
                          ${
                            userData["state/province"] &&
                            userData["state/province"]
                          }
                          ${userData["country"] && userData["country"]}
                          
                          `}
                    </div>
                  )}
                  <button onClick={() => setActiveNav(3)}>Edit</button>
                </div>
                <div style={{ marginLeft: "10px" }} className="dashboardCard">
                  <div>Default Shipping Address</div>
                  {userData?.country?.length === 0 ? (
                    <div>You have not set a default billing address.</div>
                  ) : (
                    <div>
                      {userData &&
                        ` ${
                          userData["street address"] &&
                          userData["street address"]
                        } 
                          ${
                            userData["state/province"] &&
                            userData["state/province"]
                          }
                          ${userData["country"] && userData["country"]}
                          ${userData["company"] && userData["company"]}
                          
                          `}
                    </div>
                  )}
                  <button onClick={() => setActiveNav(3)}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeNav == 2 && (
          <div className="dashboardContent">
            <div className="dashboardContentContainer">
              <div className="dashboardContentContainerHeading">
                Account Information
              </div>
              {accountInfo.map((field) => (
                <InputField
                  userData={userData}
                  updatedValue={updatedValue}
                  data={field}
                />
              ))}
              <div style={{ paddingLeft: "0px" }} className="dashboardButtons">
                <button
                  onClick={handleUpdateAccountInfo}
                  className={
                    (newValue &&
                      newValue?.first &&
                      newValue?.first?.length === 0) ||
                    (newValue && newValue?.last && newValue?.last?.length === 0)
                      ? "disabled"
                      : ""
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {activeNav == 3 && (
          <div className="dashboardContent">
            <div className="dashboardContentContainer">
              <div className="dashboardContentContainerHeading">
                Contact Information
              </div>
              {contactInfo.map((field) => (
                <InputField
                  userData={userData}
                  updatedValue={updatedValue}
                  data={field}
                />
              ))}
              <div
                className="dashboardContentContainerHeading"
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  marginTop: "32px",
                }}
              >
                Address
              </div>
              {addressFields.map((field) => (
                <InputField
                  userData={userData}
                  updatedValue={updatedValue}
                  data={field}
                />
              ))}
              <div style={{ paddingLeft: "0px" }} className="dashboardButtons">
                <button onClick={handleUpdateAccountInfo}>Save</button>
              </div>
            </div>
          </div>
        )}
        {activeNav == 5 && (
          <div className="myWishList">
            {wishList?.length ? (
              wishList.map((list) => {
                console.log(list);
                return (
                  <div>
                    <Book index={0} book={list?.book} />
                    <div
                      style={{ width: "100%" }}
                      className="myWishListButtons dashboardButtons"
                    >
                      <button
                        style={{ width: "60%" }}
                        onClick={() => handleAddToCart(list?.book)}
                        disabled={list?.quantity === "0" ? true : false}
                        className={
                          list?.quantity === "0" ? "disabledCartButton" : ""
                        }
                      >
                        {list?.quantity === "0"
                          ? "Out of stock"
                          : "Add To Cart"}
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(list?.book)}
                        style={{ marginLeft: "4px" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                There is nothing to show here
              </div>
            )}
            {/* <div>
              <Book index={1} />
              <div style={{ width: "100%" }} className="dashboardButtons">
                <button style={{ width: "60%" }}>Add To Cart</button>
                <button style={{ marginLeft: "4px" }}>Remove</button>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  ) : null;
}
