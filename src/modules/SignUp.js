import React, { useEffect } from "react";
import "./Styles/signup.css";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigation = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSignUp = () => {
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoader(false);
        addData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoader(false);
      });
  };

  const addData = async () => {
    try {
      await setDoc(doc(db, "users", email), {
        first: firstname,
        last: lastname,
        email: email,
      });
      navigation("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupContainerHeading">Create New Customer Account</div>
      <div className="signUpContent">
        <div className="signUpContentContainer">
          <div>Personal Information</div>
          <div className="signupContentInput">
            <div>
              <div>First name</div>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="John"
                type="text"
              />
            </div>

            <div>
              <div>Last Name</div>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Watson"
                type="text"
              />
            </div>

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
                type="text"
              />
            </div>
            <div>
              <div>Confirm Password</div>
              <input
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
                placeholder="password"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="signupButtons">
          <button
            className={
              password === confirmpassword &&
              password != "" &&
              email != "" &&
              firstname != "" &&
              lastname != ""
                ? ""
                : "disabled"
            }
            disabled={
              password === confirmpassword &&
              password != "" &&
              email != "" &&
              firstname != "" &&
              lastname != ""
                ? false
                : true
            }
            onClick={handleSignUp}
          >
            {loader ? "Loading" : "Create Account"}
          </button>
          <button>Back</button>
        </div>
      </div>
    </div>
  );
}
