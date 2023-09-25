import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import { db } from "../firebase";
import "./Styles/homePageBookSection.css";
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
      {/* <div className="homePageBookSectionLeft">
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
      </div> */}

      <div className="homePageBookSectionLeft">
      <div>
        Sort Out:
        <button className="filter-toggle-button" onClick={toggleFilter}>
          {isFilterOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isFilterOpen && (
        <div>
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

      <div className="homePageBookSectionRight">
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
      </div>
    </div>
  );
}
