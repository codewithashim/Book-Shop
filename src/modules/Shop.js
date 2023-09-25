import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import "./Styles/shop.css";

import SectionTwo from "./SectionTwo";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Banner2 from "../Banners/2.png";
import { useLocation } from "react-router-dom";

const Card = ({ right }) => {
  return (
    <div
      style={{ flex: "auto", width: "-webkit-fill-available", height: "40vh" }}
      className={`sectionOneCard ${
        right ? "sectionOneCardRight" : "sectionOneCardLeft"
      }`}
    >
      <div>
        <img src={Banner2} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default function Shop() {
  const [bookData, setBookData] = useState([]);
  const [handlecheckfilter, sethandlecheckfilter] = useState("All");
  const [sliderValue, setslidervalue] = useState(1000);
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const handleBookFilter = (e) => {
    if (e.target.checked) {
      sethandlecheckfilter(e.target.value);
    }
  };
  useEffect(() => {
    if (location?.state?.filter) {
      sethandlecheckfilter(location.state.filter);
    }
    getBookData();
  }, []);

  const getBookData = async () => {
    const books = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      books.push({ [doc.id]: doc.data() });
      if (books.length === querySnapshot.size) {
        setBookData(books);
      }
    });
  };

  const handleClearFilter = () => {
    sethandlecheckfilter("All");
  };

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const docRef = doc(db, "categories", "category");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCategories(docSnap.data().categories);
    } else {
    }
  };

  return (
    <div>
      <SectionTwo />
      <div className="shopContent">
        <div className="homePageBookSectionLeft">
          <div>Sort Out:</div>
          <div>
            {categories.length > 0 &&
              categories.map((c, i) => (
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id={`vehicle${i + 2}`}
                    name="vehicle1"
                    value={c}
                    checked={handlecheckfilter === c}
                    onChange={handleBookFilter}
                  />
                  <label htmlFor={`vehicle${i + 2}`}>
                    {c === "Popular" ? "All In One" : c}
                  </label>
                </div>
              ))}
            <div>
              <button
                className="clear-filter-button"
                onClick={() => handleClearFilter()}
              >
                &#x2715; Clear
              </button>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            Price Range: {sliderValue}Rs.
            <input
              type="range"
              max={1000}
              min={50}
              value={sliderValue}
              step={50}
              onChange={(e) => {
                setslidervalue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="homePageBookSectionRight">
          {bookData.length > 0 && handlecheckfilter === "All"
            ? bookData.map((item, index) => {
                if (
                  parseInt(Object.values(item)[0].price) <=
                  parseInt(sliderValue)
                )
                  return (
                    <Book
                      book={Object.values(item)[0]}
                      index={index}
                      keys={Object.keys(item)[0]}
                    />
                  );
              })
            : bookData.map((item, index) => {
                if (Object.values(item)[0].category === handlecheckfilter)
                  if (Object.values(item)[0].price <= sliderValue)
                    return (
                      <Book
                        book={Object.values(item)[0]}
                        index={index}
                        keys={Object.keys(item)[0]}
                      />
                    );
                  else {
                  }
              })}
          <Card right={true} />
          {bookData.length > 0 &&
            bookData.map((item, index) => (
              <Book
                book={Object.values(item)[0]}
                index={index}
                keys={Object.keys(item)[0]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
