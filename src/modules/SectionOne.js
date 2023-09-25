import React from "react";
import "./Styles/sectionOne.css";
import One from "../MainCaraousel/1 (2).png";
import Two from "../MainCaraousel/2 (2).png";
import Three from "../MainCaraousel/image 5.png";
import { useNavigate } from "react-router-dom";

export default function SectionOne() {
  const navigation = useNavigate();

  const Card = ({ right, img, left, value }) => {
    return (
      <div
        className={`sectionOneCard ${
          right ? "sectionOneCardRight" : "sectionOneCardLeft"
        }`}
        style={{ position: "relative" }}
      >
        {right && <OverlayButton left={left} value={value} />}
        <div>
          <img src={img} alt="" />
        </div>
        {/* <div>
          <div>
            CHOOSE <br /> YOUR BOOK
          </div>
          <div>See our book collections</div>
          <button>SEE OFFERS</button>
        </div> */}
      </div>
    );
  };

  const OverlayButton = ({ left, value }) => (
    <button
      onClick={() => handleRedirect(value)}
      style={{
        fontFamily: "Oswald",
        position: "absolute",
        bottom: "10%",
        width: "130px",
        left: left ? "60%" : "5%",
        background: "transparent",
        border: "2px solid #000000",
        color: "black",
        outline: "none",
        padding: "8px 24px",
        display:"none"
      }}
    >
      Shop Now
    </button>
  );

  const handleRedirect = (value) => {
    navigation("/shop", { state: { filter: value } });
  };

  return (
    <div className="sectionOne">
      <div>
        <Card right={true} img={One} left={true} value={"PlayWay Writing"} />
        <Card
          right={true}
          img={Two}
          left={false}
          value={"Chaman Urdu Khushkhati"}
        />
      </div>
      <div>
        <Card right={false} img={Three} />
      </div>
    </div>
  );
}
