import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import "./Styles/sectionThree.css";

export default function SectionThree({ bookData }) {
  const [categoriesname, setCategoriesName] = useState([]);
  useEffect(() => {
    const categories = new Set();
    bookData.map((book) => {
      categories.add(Object.values(book)[0].category);
    });
    setCategoriesName([...categories]);
  }, [bookData]);

  return (
    <div className="sectionThree">
      {categoriesname.map((name) => (
        <div>
          <div>{name === "Popular" ? "ALL IN ONE (KINDERGARTEN)" : name}</div>
          <div>
            {bookData.length > 0 &&
              bookData
                .filter((item) => Object.values(item)[0].category === name)
                .map((item, index) => (
                  <Book
                    book={Object.values(item)[0]}
                    index={index}
                    keys={Object.keys(item)[0]}
                  />
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}
