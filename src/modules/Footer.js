import React, { useEffect, useState } from "react";
import "./Styles/footer.css";
import NDLogo from "../Images/NDLogo.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const FooterTop = () => (
  <div className="footerTop">
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828754.png"
        alt=""
      />{" "}
      Duties and Taxes Guranteed
    </div>
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828754.png"
        alt=""
      />{" "}
      Free Express Shipping
    </div>
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828754.png"
        alt=""
      />{" "}
      Customer Love
    </div>
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828754.png"
        alt=""
      />{" "}
      Easy Returns
    </div>
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828754.png"
        alt=""
      />{" "}
      Secure Payment
    </div>
  </div>
);

export default function Footer() {
  const [categories, setCategories] = useState([]);

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
    <div className="footer">
      <FooterTop />
      <div className="footerContent">
        <div className="footerlogoImg">
          <img src={NDLogo} alt="" />
        </div>
        <div className="footerLinks">
          <div>Categories</div>
          <div>
            {categories.length > 0 &&
              categories.map((c, i) => {
                if (i < 8) {
                  return (
                    <div className="checkbox-container">
                      <div>{c === "Popular" ? "All In One" : c}</div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}

            {/* <div>Menu</div> */}
          </div>
        </div>
        <div className="footerLinks">
          <div>Menu</div>
          <div>
            <div>About Us</div>
            <div>Contact Us</div>
            <div>My Account</div>
            <div>Blog</div>
            <div>Order History</div>
          </div>
        </div>
        <div className="footerLinks">
          <div>Contact Us</div>
          <div>
            <div className="footer_highlight">Address</div>
            <div className="footer_highlightt">
              J-2/16 (BASEMENT) Padam chand Marg, Daryaganj
            </div>
            <div className="footer_highlight">Office / Mobile </div>
            <div>9310406659 / 9910365713</div>
            <div className="footer_highlight">Email</div>
            <div>support@nldr.in / outreach@nldr.in</div>
          </div>
        </div>
        <div className="footerLinks" id="footerSocialLinks">
          <div>Follow Us</div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                src="https://cdn-icons-png.flaticon.com/512/747/747374.png"
              />
              Facebook
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                src="https://cdn-icons-png.flaticon.com/512/25/25347.png"
              />
              Twitter
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              <img
                style={{ marginRight: "10px" }}
                src="https://cdn-icons-png.flaticon.com/512/1400/1400829.png"
              />
              Instagram
            </div>
          </div>
        </div>
        <div className="footerLinks">
          <div>Join Us</div>
          <div className="footer_join">
            <h4>SUBSCRIBE TO OUR NEWSLETTERS</h4>
            <input type="email" placeholder="Email Address" />
            <button>SUBSCRIBE!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
