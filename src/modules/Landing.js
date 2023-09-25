import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
import { db } from "../firebase";
import Blogs from "./Blogs";
import HeroBanner from "./HeroBanner";
import HomePageBookSection from "./HomePageBookSection";
import SectionFour from "./SectionFour";
import SectionOne from "./SectionOne";
import SectionThree from "./SectionThree";
import SectionTwo from "./SectionTwo";

export default function Landing() {
  const { getBooks } = useContext(CartContext);

  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    const books = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      books.push({ [doc.id]: doc.data() });
      if (books.length === querySnapshot.size) {
        setBookData(books);
        getBooks(books);
      }
    });
  };

  return (
    <div className="allParent">
      <HeroBanner />
      <SectionOne />
      <HomePageBookSection bookData={bookData} />
      <div className="loadMoreButton">
        <button>
          <Link to="/shop">Load More</Link>
        </button>
      </div>
      <SectionTwo />
      <SectionThree bookData={bookData} />
      <SectionFour />
      {/* <Blogs /> */}
    </div>
  );
}
