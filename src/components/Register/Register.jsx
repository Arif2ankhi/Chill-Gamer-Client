import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Register = () => {
  const { createUser } = useContext(AuthContext); // Getting createUser from AuthContext
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Retrieve form values
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    // Reset error message
    setErrorMessage("");
    setSuccess(false);

    // Password validation
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must have at least one uppercase letter, one lowercase letter, and at least 6 characters long"
      );
      return;
    }

    // Attempt to create user
    createUser(email, password)
      .then((result) => {
        console.log("User created successfully:", result.user);

        // Update profile
        const profile = {
          displayName: name,
          photoURL: photo
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("User Profile Updated Successfully!");
            setSuccess(true);
            toast.success("Registration successful!");
            navigate("/"); // Redirect to home or login page
          })
          .catch((error) => {
            console.error("Profile update error:", error.message);
            setErrorMessage("Profile update failed. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        setErrorMessage(error.message);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    <div className="card bg-cyan-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-3xl ml-4 font-bold text-cyan-800 text-center">
        Register Now!
      </h2>
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Photo URL</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="photo URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-bold ">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute right-2 top-12"
          >
            {showPassword ? (
              <FaEyeSlash className="text-2xl" />
            ) : (
              <FaEye className="text-2xl" />
            )}
          </button>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-xl font-bold">Sign Up</button>
        </div>
      </form>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      {success && (
        <p className="text-green-600 font-bold">Registration successful.</p>
      )}

      <p className="ml-4 mb-4 font-bold">
        Already have an account? Please{" "}
        <Link className="m-2 text-blue-500 font-bold" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
