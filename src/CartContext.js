import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [allBooksData, setAllBooksData] = useState([]);

  const getBooks = (books) => {
    setAllBooksData(books);
  };

  const addToCart = (book) => {
    setItems((prevState) => [...prevState, { book }]);
  };

  const addToWishList = (book) => {
    setWishList((prevState) => [...prevState, { book }]);
  };

  const removeFromWishList = (book) => {
    setWishList((prevState) =>
      prevState.filter((item) => {
        return item.book.name !== book.name;
      })
    );
  };

  const removeFromCart = (book) => {
    console.log(book);
    setItems((prevState) =>
      prevState.filter((item) => {
        return item.book.name !== book.name;
      })
    );
  };
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        wishList,
        allBooksData,
        addToCart,
        addToWishList,
        removeFromWishList,
        clearCart,
        getBooks,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
