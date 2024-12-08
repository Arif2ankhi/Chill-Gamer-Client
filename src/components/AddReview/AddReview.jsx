import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [gameCover, setGameCover] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [publishingYear, setPublishingYear] = useState("");
  const [genre, setGenre] = useState("Action");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const genres = ["Action", "RPG", "Adventure", "Strategy", "Puzzle", "Sports"];

  // Update userEmail and userName when user changes
  useEffect(() => {
    if (user) {
      setUserEmail(user.email || "");
      setUserName(user.displayName || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      gameCover,
      gameTitle,
      reviewDescription,
      rating,
      publishingYear,
      genre,
      userEmail,
      userName
    };

    // Send review to backend API
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Review added successfully!");
          navigate("/myReviews"); // Navigate to "My Reviews" page
        } else {
          toast.error("Failed to add review.");
        }
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        toast.error("An error occurred while adding the review.");
      });
  };

  return (
    <div className="card bg-cyan-200 w-full mx-auto max-w-lg shrink-0 shadow-2xl">
      <div className="hero-content flex-col">
        <h1 className="text-5xl font-bold text-cyan-800 text-center">
          Add Review
        </h1>

        <form onSubmit={handleSubmit} className="card-body w-full">
          {/* Game Cover Image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Game Cover Image (URL)
              </span>
            </label>
            <input
              type="url"
              value={gameCover}
              onChange={(e) => setGameCover(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Game Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Game Title</span>
            </label>
            <input
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Review Description */}
          <div className="form-control">
            
            <label className="label">
              <span className="label-text font-bold">Review Description</span>
            </label>
            <textarea
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              className="textarea textarea-bordered"
              rows="4"
              required
            />
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Rating (1-5)</span>
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value >= 1 && value <= 5) {
                  setRating(value);
                } else {
                  toast.error("Rating must be between 1 and 5.");
                }
              }}
              className="input input-bordered"
              step="0.1"
              min="1"
              max="5"
              required
            />
          </div>

          {/* Publishing Year */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Publishing Year</span>
            </label>
            <input
              type="number"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Genre */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Genre</span>
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="select select-bordered"
              required
            >
              {genres.map((g, index) => (
                <option key={index} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* User Email (Read-Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">User Email</span>
            </label>
            <input
              type="email"
              value={userEmail}
              readOnly
              className="input input-bordered"
            />
          </div>

          {/* User Name (Read-Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">User Name</span>
            </label>
            <input
              type="text"
              value={userName}
              readOnly
              className="input input-bordered"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary text-2xl font-bold"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
