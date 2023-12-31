import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import "./Styles/shop.css";

import SectionTwo from "./SectionTwo";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Banner2 from "../Banners/2.png";
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'
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
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };


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
        <div className="filter-toggle-button" onClick={toggleFilter}>
         Sort Out:
          {isFilterOpen ? <FaAngleDown/>: <FaAngleUp/>}
        </div>
        {
          isFilterOpen && (
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
                </div>)
              )}
            <div>
              <button
                className="clear-filter-button"
                onClick={() => handleClearFilter()}
              >
                &#x2715; Clear
              </button>
            </div>
          </div>
          )}
          
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
          {bookData.length > 0 && handlecheckfilter === "All" ? (
            bookData.map((item, index) => {
              if (
                parseInt(Object.values(item)[0].price) <=
                parseInt(sliderValue)
              )
                return (
                  <Book
                    book={Object.values(item)[0]}
                    index={index}
                    keys={Object.keys(item)[0]}
                    key={index} // Add a unique key to each book
                  />
                );
              return null; // Add this line to handle the else case
            })
          ) : (
            bookData.map((item, index) => {
              if (
                Object.values(item)[0].category === handlecheckfilter &&
                Object.values(item)[0].price <= sliderValue
              )
                return (
                  <Book
                    book={Object.values(item)[0]}
                    index={index}
                    keys={Object.keys(item)[0]}
                    key={index} // Add a unique key to each book
                  />
                );
              return null; // Add this line to handle the else case
            })
          )}

  {/* <Card right={true} /> */}

  {/* Calculate how many books are needed to fill the last row */}
  {bookData.length > 0 && handlecheckfilter === "All" && (
    <div className="responsive-row" style={{ display: "flex" }}>
      {Array.from({ length: 4 - (bookData.length % 4) }).map((_, index) => (
        <div key={index} className="responsive-book"  style={{ flex: " 0 0 10rem" }}>
          {/* Repeat a book from the existing data */}
          <Book
            book={
              Object.values(
                bookData[index % bookData.length]
              )[0]
            }
            index={index}
            keys={
              Object.keys(
                bookData[index % bookData.length]
              )[0]
            }
            key={`placeholder-${index}`} // Add a unique key to each placeholder
          />
        </div>
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  );
}
