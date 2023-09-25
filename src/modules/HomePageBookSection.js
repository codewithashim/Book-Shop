import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import { db } from "../firebase";
import "./Styles/homePageBookSection.css";
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'

export default function HomePageBookSection({ bookData }) {
  const [selectedCheckbox, setSelectedCheckbox] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxChange = (event) => {
    console.log(event);
    if (event.target.checked) {
      setSelectedCheckbox(event.target.value);
    }
  };

  const handleClearFilter = () => {
    setSelectedCheckbox("All");
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

  console.log(bookData);
  return (
    <div className="homePageBookSection">
      <div className="homePageBookSectionLeft">
      <div className="filter-toggle-button" onClick={toggleFilter}>
         Sort Out:
          {isFilterOpen ? <FaAngleDown/>: <FaAngleUp/>}
      </div>
      {isFilterOpen && (
        <div className="filter-main-container">
        {categories.length > 0 &&
            categories.map((c, i) => (
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`vehicle${i + 2}`}
                  name="vehicle1"
                  value={c}
                  checked={selectedCheckbox === c}
                  onChange={handleCheckboxChange}
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
      )}
    </div>

      {/* <div className="homePageBookSectionRight">
        {bookData.length > 0 && selectedCheckbox === "All"
          ? bookData.map((item, index) => {
              console.log(Object.values(item)[0].category);

              return (
                <Book
                  book={Object.values(item)[0]}
                  index={index}
                  keys={Object.keys(item)[0]}
                />
              );
            })
          : bookData.map((item, index) => {
              if (Object.values(item)[0].category === selectedCheckbox)
                //all in one
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
      </div> */}

      <div className="homePageBookSectionRight">
  {bookData.length > 0 &&
    (selectedCheckbox === "All"
      ? bookData.map((item, index) => {
          console.log(Object.values(item)[0].category);

          return (
            <Book
              book={Object.values(item)[0]}
              index={index}
              keys={Object.keys(item)[0]}
              key={index} // Add a unique key to each book
            />
          );
        })
      : bookData.map((item, index) => {
          if (Object.values(item)[0].category === selectedCheckbox)
            // All in one
            return (
              <Book
                book={Object.values(item)[0]}
                index={index}
                keys={Object.keys(item)[0]}
                key={index} // Add a unique key to each book
              />
            );
          else {
          }
        }))}

  {/* Calculate how many books are needed to fill the last row */}
  {bookData.length > 0 && selectedCheckbox === "All" && (
    <div style={{ display: "flex" }}>
      {Array.from({ length: 4 - (bookData.length % 4) }).map((_, index) => (
        <div key={index} style={{ flex: " 0 0 10rem" }}>
          {/* Render a placeholder element or repeat a book */}
          <Book
            book={bookData[index % bookData.length][Object.keys(bookData[index % bookData.length])[0]]}
            index={index}
            keys={Object.keys(bookData[index % bookData.length])[0]}
            key={`placeholder-${index}`} // Add a unique key to each placeholder
          />
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
