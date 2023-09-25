import React, { createContext, useContext, useEffect, useState } from "react";
import "./Styles/nav.css";
import { Link, useNavigate, useHistory } from "react-router-dom";
import NDLogo from "../Images/NDLogo.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CartContext from "../CartContext";
export default function Nav() {
  const { items, wishList } = useContext(CartContext);
  const [isUser, setIsUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeBurger, setActiveBurger] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");

  const navigation = useNavigate();

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

  const totalPrice = items.reduce((acc, item) => {
    const itemPrice =
      parseInt(item?.book?.price) * parseInt(item?.book?.quantity);
    return acc + itemPrice;
  }, 0);

  const handleSignOut = () => {
    setActiveBurger(false);
    signOut(auth)
      .then(() => {
        setIsUser(false);
      })
      .catch((error) => {
        setIsUser(true);
      });
  };

  const handleSignIn = () => {
    setActiveBurger(false);
    navigation("/signin");
  };

  const handleRedirect = (redirect) => {
    setActiveNavItem(redirect);
    setActiveBurger(false);
    navigation(redirect);
  };

  return (
    <div className="nav">
      <div className="logoImg">
        <img src={NDLogo} />
      </div>
      <div
        onClick={() => {
          setActiveBurger(!activeBurger);
        }}
        className="menu-btn__burger"
      ></div>
      <div className={activeBurger ? "activeBurger burgerNav" : "burgerNav"}>
        <ul>
          <li onClick={() => handleRedirect("/")}>Home</li>

          <li onClick={() => handleRedirect("/shop")}>Shop</li>

          {/* <li onClick={() => handleRedirect("/blogs")}>Blog</li> */}
          <li>Sale</li>
          {userEmail === "test3@gmail.com" && (
            <li onClick={() => handleRedirect("/addbook")}>Add Book</li>
          )}
          {isUser && (
            <li onClick={() => handleRedirect("/dashboard")}>Dashboard</li>
          )}
          {isUser ? (
            <div style={{ cursor: "pointer" }} onClick={handleSignOut}>
              Sign Out
            </div>
          ) : (
            <div style={{ cursor: "pointer" }} onClick={handleSignIn}>
              Sign In
            </div>
          )}
          <div style={{ cursor: "pointer" }}>
            {isUser ? null : (
              <div onClick={() => handleRedirect("/signup")}>
                Create An Account
              </div>
            )}
          </div>
          <li>Contact Us</li>
          <div className="burgerIcons">
            <div
              onClick={() => {
                setActiveBurger(false);
                navigation("/dashboard", {
                  state: {
                    setNav: 5,
                  },
                });
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                alt=""
              />
            </div>
            <Link
              onClick={() => setActiveBurger(false)}
              style={{ marginLeft: "5px" }}
              to={items.length > 0 ? "/cart" : ""}
            >
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2169/2169842.png"
                  alt=""
                />
                {items.length}
              </div>
            </Link>
          </div>
        </ul>
      </div>

      <div className="navLinks">
        <ul>
          <div onClick={() => handleRedirect("/")}>
            <li className={activeNavItem === "/" ? "activeNavItem" : ""}>
              Home
            </li>
          </div>
          <div onClick={() => handleRedirect("/shop")}>
            <li className={activeNavItem === "/shop" ? "activeNavItem" : ""}>
              Shop
            </li>
          </div>
          {/* <li
            onClick={() => handleRedirect("/blogs")}
            className={activeNavItem === "/blog" ? "activeNavItem" : ""}
          >
            Blog
          </li> */}
          <li className={activeNavItem === "/sale" ? "activeNavItem" : ""}>
            Sale
          </li>
          {userEmail === "test3@gmail.com" && (
            <div onClick={() => handleRedirect("/addbook")}>
              <li
                className={activeNavItem === "/addbook" ? "activeNavItem" : ""}
              >
                Add Book
              </li>
            </div>
          )}
          {isUser && (
            <div onClick={() => handleRedirect("/dashboard")}>
              <li
                className={
                  activeNavItem === "/dashboard" ? "activeNavItem" : ""
                }
              >
                Dashboard
              </li>
            </div>
          )}
          <div onClick={() => handleRedirect("/contactus")}>
            <li
              className={activeNavItem === "/contactus" ? "activeNavItem" : ""}
            >
              Contact Us
            </li>
          </div>
        </ul>
      </div>
      <div className="navRightSide">
        {isUser ? (
          <div style={{ cursor: "pointer" }} onClick={handleSignOut}>
            Sign Out
          </div>
        ) : (
          <div style={{ cursor: "pointer" }} onClick={handleSignIn}>
            Sign In
          </div>
        )}
        <div style={{ cursor: "pointer" }}>
          {isUser ? null : <Link to="signup">Create An Account</Link>}
        </div>
        <div>
          <div
            style={{ display: "flex", alignItems: "baseline" }}
            onClick={() =>
              navigation("/dashboard", {
                state: {
                  setNav: 5,
                },
              })
            }
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              alt=""
            />
            <div>{wishList?.length}</div>
          </div>
          <Link
            style={{ marginLeft: "5px" }}
            to={items.length > 0 ? "/cart" : ""}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                style={{ margin: "0 5px" }}
                src="https://cdn-icons-png.flaticon.com/512/1656/1656850.png"
                alt=""
              />
              <div>
                <div style={{ fontWeight: "300" }}>Shopping Cart</div>
                <div style={{ fontWeight: "700" }}>{totalPrice}Rs.</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
