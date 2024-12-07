// import React from 'react';

import React, { useContext, useRef, useState } from "react";
import auth from "../../firebase/firebase.config";
import {  signInWithEmailAndPassword,  } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
    const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [logInError, setLogInError] = useState("");
  const emailRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // signIn User
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log("Error", error.message);
      });

    setSuccess(false);
    setLogInError("");

    // login in user with email and password

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log("User logged in:", user);
        toast.success("Logged in successfully!");
        navigate("/"); // Navigate to Home page
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        setLogInError(error.message);
        toast.error("Login failed. Please check your credentials.");
      });
  };

//   edited google sign in 

const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In Success:", user);
        toast.success("Logged in with Google!");
        navigate("/"); // Navigate to Home
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        toast.error("Google Sign-In failed. Try again.");
      });
  };

//   edited end 

//   asol part 

//   const handleGoogleSignIn = () => {
//     signInWithGoogle()
//       .then((result) => {
//         console.log(result.user);
//         navigate("/");
//       })
//       .catch((error) => console.log("ERROR", error.message));
//   };
//  asol paprt 

  return (
    <div className="card bg-cyan-200 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl ml-4 font-bold text-cyan-800 text-center">
            Login now!
          </h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />

             
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-2xl font-bold mb-4">
                Signin
              </button>
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-primary  text-2xl font-bold mt-4"
              >
                 <FcGoogle /> Signin With Google
              </button>
              {/* </div> */}
            </div>
          </form>

          {success && <p className="text-green-600">Logged in successfully!</p>}
          {logInError && <p className="text-red-600">{logInError}</p>}

          <p className="ml-4 mb-4 font-bold">
            New to this website ? please
            <Link className="m-2 text-red-500 font-bold" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>

    );
};

export default Signin;
