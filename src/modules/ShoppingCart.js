import React, { useContext, useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import CartContext from "../CartContext";
import Discount from "../components/Discount";
import Subtotal from "../components/Subtotal";
import "./Styles/shoppingCart.css";

export default function ShoppingCart() {
  //   const navigation = useNavigation();
  const { items, clearCart, removeFromCart, addToWishList } =
    useContext(CartContext);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const handleRedirect = (redirect) => {
    // navigation(redirect);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleRemoveFromCart = (book) => {
    removeFromCart(book);
  };

  const handleAddToWishList = (bookData) => {
    addToWishList({
      ...bookData,
      selectedValue: "Hard",
    });
  };

  return (
    <div className="shoppingCart">
      <div className="shoppingCartHeading">
        {items.length ? "Shopping Cart" : "Cart Is Empty"}
      </div>

      {items?.length ? (
        <div className="shoppingCartContent">
          <div className="shoppingCartLeft">
            <div className="shoppingCartTable">
              <div className="shoppingCartTableHeader">
                <div className="shoppingCartTableHeaderItem">Product</div>
                <div className="shoppingCartTableHeaderItem">Price</div>
                <div className="shoppingCartTableHeaderItem">Quantity</div>
                <div className="shoppingCartTableHeaderItem">Total</div>
              </div>
              <div className="divider"></div>
              <div className="shoppingCartTableBody">
                {items.map((item) => (
                  <div className="shoppingCartTableRow" key={item.book.id}>
                    <div className="shoppingCartTableRowItem">
                      {item?.book?.name}
                      <div
                        className={
                          item?.book?.selectedValue === "Hard" ? "red" : "blue"
                        }
                      >
                        <div></div>
                      </div>
                    </div>
                    <div className="shoppingCartTableRowItem">
                      Rs.{item?.book?.price}
                    </div>
                    <div className="shoppingCartTableRowItem">
                      {item?.book?.quantity}
                    </div>
                    <div className="shoppingCartTableRowItem">
                      Rs.
                      {parseInt(item?.book?.price) *
                        parseInt(item?.book?.quantity)}
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          background: "#E6F1FA",
                          cursor: "pointer",
                          height: "20px",
                          width: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "5px",
                        }}
                        className="shoppingCartTableRowItem"
                        onClick={() => handleAddToWishList(item.book)}
                      >
                        ♡
                      </div>
                      <div
                        style={{
                          background: "#E6F1FA",
                          cursor: "pointer",
                          height: "20px",
                          width: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="shoppingCartTableRowItem"
                        onClick={() => handleRemoveFromCart(item.book)}
                      >
                        &times;
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divider"></div>
              <div className="shoppingCartTableFooter">
                <Link to="/shop">
                  <button className="shoppingCartButton1">
                    Continue Shopping
                  </button>
                </Link>
                <button
                  onClick={handleClearCart}
                  className="shoppingCartButton"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          <div className="shoppingCartRight">
            <div className="Shippingsummary subTotalSummary">
              <Discount />
            </div>
            <div className="Shippingsummary subTotalSummary">
              <Subtotal handleRedirect={handleRedirect} items={items} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
