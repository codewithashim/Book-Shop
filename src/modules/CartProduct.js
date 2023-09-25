import React, { useContext, useEffect, useRef, useState } from "react";
import "./Styles/cartProduct.css";
import "./Styles/responsive.css"
import EnglishImage from "../Images/EnglishImage.png";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import CartContext from "../CartContext";
import Book from "../components/Book";
export default function CartProduct() {
  const { addToCart, addToWishList } = useContext(CartContext);
  const navigation = useNavigate();
  const [mainImage, setMainImage] = useState("");
  const [count, setCount] = useState(1);
  const [discount, setDiscount] = useState("");
  const [selected, setSelected] = useState(null);
  const [numOfCards, setNumOfCards] = useState(0);
  const [myprice, setmyprice] = useState(new Array(5).fill(null));
  const [bookData, setBookData] = useState({});
  const [allbookData, setAllBookData] = useState([]);
  const [coupons, setCoupon] = useState({});
  const [selectedValue, setSelectedValue] = useState("Hard");
  const [couponExist, setCouponExist] = useState(false);
  const location = useLocation();
  const sectionRef = useRef(null);
  const sectionRef1 = useRef(null);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = (index) => {};
  const handleRedirect = (redirect) => {
    navigation(redirect);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  useEffect(() => {
    getBookData();
    calculateNumOfCards();
    window.addEventListener("resize", calculateNumOfCards);

    return () => {
      window.removeEventListener("resize", calculateNumOfCards);
    };
  }, []);

  const calculateNumOfCards = () => {
    const cardHeight = 240; // Adjust this according to your card's height including margins
    const sectionHeight = sectionRef.current.offsetHeight;
    const sectionHeight1 = sectionRef1.current.offsetHeight;
    const numOfCards = Math.floor(
      (sectionHeight + sectionHeight1) / cardHeight
    );
    setNumOfCards(numOfCards - 1);
  };

  const getBookData = async () => {
    const books = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      books.push({ [doc.id]: doc.data() });
      if (books.length === querySnapshot.size) {
        setAllBookData(books);
      }
    });
  };

  const handleAddToCart = () => {
    addToCart({ ...bookData, quantity: count, selectedValue: selectedValue });
  };

  const handleBuyNow = () => {
    addToCart({ ...bookData, quantity: count, selectedValue: selectedValue });
    navigation("/shipping");
  };

  const handleAddToWishList = () => {
    addToWishList({
      ...bookData,
      selectedValue: selectedValue,
    });
  };

  useEffect(() => {
    getBook();
    getCoupon();
  }, []);

  const getCoupon = async () => {
    const docRef = doc(db, "coupon", "coupon");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", Object.values(docSnap.data())[0]);
      setCoupon(Object.values(docSnap.data())[0]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const nameExistsInAnyCategory =
      coupons &&
      coupons.length > 0 &&
      coupons.some((obj) =>
        obj.categories.some(
          (category) =>
            category?.toLowerCase() === bookData?.category?.toLowerCase()
        )
      );
    if (nameExistsInAnyCategory) {
      setCouponExist(true);
    } else {
      setCouponExist(false);
    }
  }, [coupons]);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const getBook = async () => {
    const pathname = location.pathname;

    const bookId = pathname.substring(pathname.lastIndexOf("/") + 1);

    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBookData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (bookData?.url) {
      setMainImage(bookData.url);
    }
  }, [bookData]);

  const changeMainImage = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const scrollLeft = () => {
    const wrapper = document.querySelector(".cartOffersWrapper");
    wrapper.scrollBy({ left: -260, top: 0, behavior: "smooth" });
  };

  const scrollRight = () => {
    const wrapper = document.querySelector(".cartOffersWrapper");
    wrapper.scrollBy({ left: 260, top: 0, behavior: "smooth" });
  };

  return (
    <div className="CartProduct">
      <div className="fixed-section">
        {allbookData.length &&
          allbookData
            .filter(
              (item) => Object.values(item)[0].category != bookData?.category
            )
            .map(
              (item, index) =>
                index < numOfCards && (
                  <div
                    onClick={() =>
                      handleRedirect(`/book/${Object.keys(item)[0]}`)
                    }
                    className="book-card"
                  >
                    <img loading="lazy" src={Object.values(item)[0].url} alt=''/>
                    <div>{Object.values(item)[0].name}</div>
                    <div>{Object.values(item)[0].price} RS.</div>
                  </div>
                )
            )}
      </div>
      <div className="cartProductSection1" ref={sectionRef}>
        <div>
          <div className="main-image-container">
            <img loading="lazy" className="main-image" src={mainImage} alt=""/>
            <div className="small-image-container">
              <div>
                <img
                  loading="lazy"
                  className="small-image"
                  onClick={() => changeMainImage(bookData?.url)}
                  src={bookData?.url}
                  alt=""
                />
              </div>
              {bookData?.url1 && (
                <div>
                  <img
                    loading="lazy"
                    className="small-image"
                    onClick={() => changeMainImage(bookData?.url1)}
                    src={bookData?.url1}
                    alt=""
                  />
                </div>
              )}

              {bookData?.url2 && (
                <div>
                  <img
                    loading="lazy"
                    className="small-image"
                    onClick={() => changeMainImage(bookData?.url2)}
                    src={bookData?.url2}
                      alt=""
                  />
                </div>
              )}
              {bookData?.url3 && (
                <div>
                  <img
                    loading="lazy"
                    className="small-image"
                    onClick={() => changeMainImage(bookData?.url3)}
                    src={bookData?.url3}
                      alt=""
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <h4>SHARE: </h4>
            <img
              loading="lazy"
              src="https://cdn-icons-png.flaticon.com/128/3128/3128208.png"
                alt=""
            />
            <img
              loading="lazy"
              src="https://cdn-icons-png.flaticon.com/128/3128/3128212.png"
                alt=""
            />
            <img
              loading="lazy"
              src="https://cdn-icons-png.flaticon.com/128/733/733622.png"
                alt=""
            />
            <img
              loading="lazy"
              src="https://cdn-icons-png.flaticon.com/128/2111/2111491.png"
                alt=""
            />
          </div>
        </div>
        <div>
          <h4>Home/ Book/ {bookData?.name}</h4>
          <div>{bookData?.category?.toUpperCase()}</div>
          <h1>{bookData?.name}</h1>
          <h5>Features</h5>
          <div>
            <ol>
              {bookData?.features ? (
                <ul>
                  {bookData.features.split(";").map((feature, index) => (
                    <li style={{ listStyle: "disc" }} key={index}>
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                  eligendi unde minima. Laudantium numquam ipsam, optio quam
                  modi aliquid nostrum iste odio maiores velit impedit nesciunt
                  fuga placeat. Officiis, at!
                </p>
              )}
            </ol>
          </div>
          <div style={{ color: "red" }}>
            {bookData?.quantity === "0"
              ? "Out Of Stock"
              : bookData?.quantity <= 5 && bookData?.quantity != 0
              ? `Only ${bookData?.quantity} left in stock. Hurry Up!!`
              : null}
          </div>

          <div className="priceQuantityHeadingContainer">
            <h3 style={{ width: "90px", marginRight: "10px" }}>QUANTITY</h3>
            <h3
              style={{
                width: "70px",
                marginRight: "10px",
              }}
            ></h3>
            <h3
              style={{
                width: "100px",
                textAlign: "right",
                paddingRight: "20px",
              }}
            >
              PRICE TOTAL
            </h3>
          </div>
          <div
            style={{ width: "250px" }}
            className="priceQuantityValueContainer"
          >
            {/* Quantity */}
            <div
              style={{ width: "90px", display: "flex", marginRight: "10px" }}
            >
              <h3 style={{ cursor: "pointer" }} onClick={handleDecrement}>
                -
              </h3>
              <h2 style={{ margin: "0 10px" }}>{count}</h2>
              <h3 style={{ cursor: "pointer" }} onClick={handleIncrement}>
                +
              </h3>
            </div>
            {/* Discount */}
            <div
              style={{
                marginRight: "10px",
                width: "70px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "red", fontWeight: 300 }}>
                -
                {bookData?.discountPercentage
                  ? bookData?.discountPercentage
                  : 50}
                %
              </span>
            </div>
            {/* Selling Price */}
            <div
              style={{
                width: "80px",
                fontSize: "2rem",
                textAlign: "right",
                paddingRight: "20px",
              }}
            >
              <div style={{ color: "green", fontWeight: 500 }}>
                <span
                  style={{
                    fontSize: "0.4em",
                    verticalAlign: "top",
                    position: "relative",
                    top: "-0.1em",
                  }}
                >
                  ₹
                </span>
                <span style={{ fontSize: "1em" }}>
                  {bookData?.discountPercentage
                    ? parseInt(bookData?.price) *
                      (1 - bookData?.discountPercentage / 100)
                    : bookData?.price}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                M.R.P{" "}
                <span style={{ textDecoration: "line-through" }}>
                  {bookData?.discountPercentage
                    ? bookData?.price
                    : bookData?.price * 2}
                  ₹
                </span>
              </div>
            </div>
          </div>
          <div className="buttonSection">
            <button
              className={bookData?.quantity === "0" ? "disabledCartButton" : ""}
              disabled={bookData?.quantity === "0" ? true : false}
              onClick={handleAddToCart}
            >
              Add To Bag
            </button>
            <button onClick={handleAddToWishList}>
              <img
                style={{
                  width: "14px",
                  height: "14px",
                  objectFit: "contain",
                  marginRight: "4px",
                }}
                src={"https://cdn-icons-png.flaticon.com/512/151/151910.png"}
                alt=""
              />{" "}
              Save
            </button>
            <button
              className={bookData?.quantity === "0" ? "disabledCartButton" : ""}
              disabled={bookData?.quantity === "0" ? true : false}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="descountSection">
            {couponExist && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{
                    width: "18px",
                    height: "18px",
                    objectFit: "contain",
                  }}
                  src="https://cdn-icons-png.flaticon.com/512/10176/10176394.png"
                  alt=""
                />{" "}
                Best Offers
              </div>
            )}
            {couponExist && (
              <div className="cartOffersContainer">
                <button
                  className="scrollButton scrollButtonLeft"
                  onClick={scrollLeft}
                >
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      objectFit: "contain",
                      transform: "rotateZ(90deg)",
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
                    alt=""
                  />
                </button>
                <div className="cartOffersWrapper">
                  {coupons &&
                    coupons.length > 0 &&
                    coupons.map((coupon, index) => {
                      const nameExistsInCategories = coupon.categories.some(
                        (category) =>
                          category.toLowerCase() ===
                          bookData?.category.toLowerCase()
                      );
                      if (nameExistsInCategories)
                        return (
                          <div
                            className={`${
                              index === 1 ? "secondCard" : ""
                            } cartOffers${selected === 0 ? " selected" : ""}`}
                            onClick={() => handleClick(0)}
                          >
                            <div>Offers</div>
                            <div>
                              <div>Use Code : {coupon?.name}</div>
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginRight: "16px",
                                  }}
                                >
                                  <img
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      marginRight: "4px",
                                    }}
                                    src="https://cdn-icons-png.flaticon.com/512/3334/3334338.png"
                                    alt=""
                                  />{" "}
                                  Get {coupon?.price}% off
                                </div>
                                <div
                                  style={{
                                    borderBottom: "1px solid gray",
                                    width: "180px",
                                    borderRadius: "50%",
                                  }}
                                ></div>
                                <div>{coupon?.customLine}</div>
                              </div>
                            </div>
                            <div>T&C Apply</div>
                          </div>
                        );
                      else {
                        return null;
                      }
                    })}
                </div>
                <button
                  className="scrollButton scrollButtonRight"
                  onClick={scrollRight}
                >
                  <img
                    style={{
                      width: "15px",
                      height: "15px",
                      objectFit: "contain",
                      transform: "rotateZ(-90deg)",
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png"
                    alt=""
                  />
                </button>
              </div>
            )}
      </div>
     
      <div className="cartProductSection2" ref={sectionRef1}>
        <div>
          <div>
            <h1>Details</h1>
            <img
              loading="lazy"
              src="https://img.icons8.com/ios/1x/minus-math.png"
            />
          </div>
          <div></div>
          <div className="cart-pro-detail">
            <div>
              <h1>ABOUT BOOK</h1>
              <p>
                {bookData?.description
                  ? bookData?.description
                      .split(";")
                      .map((feature, index) => (
                        <li style={{ listStyle: "disc" }}>{feature}</li>
                      ))
                  : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure eligendi unde minima. Laudantium numquam ipsam, optio quam modi aliquid nostrum iste odio maiores velit impedit nesciunt fuga placeat. Officiis, at!"}
              </p>
            </div>
            <div>
              <h1>SHIPPING</h1>
              <p>
                Please allow up to 2 business days (excluding weekends,
                holidays, and sale days) to process your order.
              </p>
              <h2>Processing Time + Shipping Time = Delivery Time</h2>
            </div>
          </div>
        </div>
        <div>
          <h1>Other information</h1>
          <img
            loading="lazy"
            src="https://img.icons8.com/ios/1x/plus-math.png"
            alt=""
          />
        </div>
      </div>
    
      <div className="mainCardSection">
        <div>
          <h3>You May Also Like</h3>
        </div>
        <div className="cartProductSection4">
        {" "}
        {allbookData.length &&
          allbookData.map((item, index) => {
            return (
              index < 5 && (
                <Book
                  book={Object.values(item)[0]}
                  index={index}
                  keys={Object.keys(item)[0]}
                />
              )
            );
          })}
      </div>
      </div>

     
    </div>
  );
}
