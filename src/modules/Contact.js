import React, { useEffect, useState } from "react";
import { inputName } from "../Constant/input";
import { useForm } from "@formspree/react";
import c from "../Images/c.jpg";
import "../modules/Styles/contact.css";
import testimg from "../Images/testimg.jpg";
export default function Contact() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [state, handleSubmit] = useForm("xbjekeab");
  if (state.succeeded && !isFormSubmitted) {
    window.alert("Form sumitted successfully");
    setIsFormSubmitted(true);
  }

  return (
    <div className="contactform" id="contact">
      <img className="contactformBG2" src={testimg} />
      <div className="contactform-container">
        <div className="contactform-left">
          <h3>Get In Touch</h3>
          <h4>We are here for you. How can i help?</h4>
          <form onSubmit={handleSubmit}>
            {inputName.map((input) => (
              <div>
                <div>{input}</div>
                <input name={input}></input>
              </div>
            ))}
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </div>
        <div className="contactform-right">
          <div>
            <img src={c} />
          </div>
          <div>
            <div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149060.png"
                  alt=""
                />
              </div>
              <div>J-2/16 (BASEMENT) Padam chand Marg, Daryaganj</div>
            </div>
            <div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3687/3687004.png"
                  alt=""
                />
              </div>
              <div>+91 9310406659</div>
            </div>
            <div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/893/893257.png"
                  alt=""
                />
              </div>
              <div>support@nldr.in / outreach@nldr.in</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
