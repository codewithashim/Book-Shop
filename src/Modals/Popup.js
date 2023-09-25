import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import PopupBg from "./50Banner.png";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    border: "none",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "transparent",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    color: "white",
    animation: "bounce 1s",
    transformOrigin: "center",
  },
};

function Popup({ isOpen, handleOpen }) {
  let subtitle;
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef();

  useEffect(() => {
    Modal.setAppElement(document.getElementById("root"));
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      setImgDimensions({
        width: imgRef.current.clientWidth,
        height: imgRef.current.clientHeight,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (imgRef.current) {
        setImgDimensions({
          width: imgRef.current.clientWidth,
          height: imgRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function afterOpenModal() {
    subtitle.style.color = "#ffffff";
  }

  function closeModal() {
    handleOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Book Sale Modal"
      >
        <div style={{ position: "relative" }}>
          <img
          className="popupBgCross"
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "117px",
              right: "41px",
              width: "30px",
              height: "30px",
              zIndex: 10,
              filter: "invert(1)",
              cursor: "pointer",
            }}
            src={"https://cdn-icons-png.flaticon.com/512/660/660252.png"}
            alt=""
          />
          <img
          className="popupBgImage"
            ref={imgRef}
            style={{
              objectFit: "contain",
              width: "400px",
            }}
            src={PopupBg}
            alt="Book Sale"
            width="50%"
          />
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
