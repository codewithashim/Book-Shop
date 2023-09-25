import React, { useEffect } from "react";
import "./Styles/signup.css";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigation = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSignIn = () => {
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation("/");
        setLoader(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
        setLoader(false);
      });
  };

  return (
    <div className="signupContainer">
      <div className="signupContainerHeading">Login</div>
      <div className="signUpContent">
        <div className="signUpContentContainer">
          <div>Personal Information</div>
          <div className="signupContentInput">
            <div>
              <div>Email</div>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="daisy.watson@example.com"
                type="text"
              />
            </div>
            <div>
              <div>Password</div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="signupButtons">
          <button
            className={password != "" && email != "" ? "" : "disabled"}
            disabled={password != "" && email != "" ? false : true}
            onClick={handleSignIn}
          >
            {loader ? "Loading" : "Sign In"}
          </button>

          <button>Back</button>
        </div>
      </div>
    </div>
  );
}
