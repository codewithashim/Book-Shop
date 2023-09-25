import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Styles/heroBanner.css";
import Two from "../MainCaraousel/1 (1).png";
import One from "../MainCaraousel/2 (1).png";
import Three from "../MainCaraousel/final.png";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigation = useNavigate();
  const handleRedirect = (value) => {
    navigation("/shop", { state: { filter: value } });
  };

  const OverlayButton = ({ last, first }) => (
    <button
      style={{
        fontFamily: "Oswald",
        position: "absolute",
        fontWeight: "500",
        bottom: first ? "30%" : "15%",
        left: last ? "4%" : "5%",
        background: "transparent",
        border: "2px solid #000000",
        color: "black",
        outline: "none",
        padding: "8px 50px",
      }}
    >
      Shop Now
    </button>
  );

  return (
    <div className="heroBanner">
      <Splide
        options={{
          type: "loop",
          gap: "2rem",
          perPage: 1,
          arrows: true,
          autoplay: true,
          pagination: true,
          classes: {
            pagination: "splide__pagination--bottom-left",
            page: "splide__pagination__page--black-square",
          },
        }}
      >
        <SplideSlide onClick={() => handleRedirect("PlayWay Writing")}>
          <OverlayButton last={true} />
          <img className="heroBannerBGImage" src={Three} />
        </SplideSlide>
        <SplideSlide
          style={{ position: "relative" }}
          onClick={() => handleRedirect("Popular")}
        >
          <OverlayButton first={true} />
          <img className="heroBannerBGImage" src={Two} />
        </SplideSlide>
        <SplideSlide onClick={() => handleRedirect("Chaman Urdu Khushkhati")}>
          <OverlayButton />
          <img className="heroBannerBGImage" src={One} />
        </SplideSlide>
      </Splide>

      {/* Add your other components here */}
    </div>
  );
}
