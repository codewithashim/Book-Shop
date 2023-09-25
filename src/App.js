import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Blogs from "./modules/Blogs";
import CartProduct from "./modules/CartProduct";
import Footer from "./modules/Footer";
import Landing from "./modules/Landing";
import Nav from "./modules/Nav";
import SignUp from "./modules/SignUp";
import Dashboard from "./modules/Dashboard";
import Shop from "./modules/Shop";
import SignIn from "./modules/SignIn";
import BookForm from "./components/BookForm/BookForm";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Shipping from "./modules/Shipping";
import { CartProvider } from "./CartContext";
import ShoppingCart from "./modules/ShoppingCart";
import Contact from "./modules/Contact";
import Popup from "./Modals/Popup";
import BlogsPage from "./modules/BlogsPage";
import IndividualBlog from "./components/IndividualBlog";
import ScrollToTop from "./Helpers/ScrollToTop";

function App() {
  const [isUser, setIsUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const hasModalBeenShown = sessionStorage.getItem("hasModalBeenShown");
    if (!hasModalBeenShown) {
      sessionStorage.setItem("hasModalBeenShown", "true");
      setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    }
  }, []);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setIsUser(true);
        // ...
      } else {
        // User is signed out
        // ...
        setIsUser(false);
      }
    });
  }, []);

  function FloatingContactButton() {
    return (
      <Link to="/contactus" className="floating-contact-button">
        <div>Contact</div>
      </Link>
    );
  }

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Nav />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            {/* <Route exact path="/book" element={<CartProduct />} /> */}
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/shop" element={<Shop />} />
            <Route exact path="/cart" element={<ShoppingCart />} />
            <Route exact path="/book/:id" element={<CartProduct />} />
            <Route exact path="/posts/:id" element={<IndividualBlog />} />
            <Route exact path="/blogs" element={<BlogsPage />} />
            <Route exact path="/contactus" element={<Contact />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            {isUser && <Route exact path="/addBook" element={<BookForm />} />}
            <Route exact path="/shipping" element={<Shipping />} />
          </Routes>
          <Footer />
          <Popup
            isOpen={isOpen}
            handleOpen={handleOpen}
            message="Thanks for visiting our website!"
          />
        </div>
        <FloatingContactButton />{" "}
        {/* Add the FloatingContactButton component */}
      </Router>
    </CartProvider>
  );
}

export default App;
