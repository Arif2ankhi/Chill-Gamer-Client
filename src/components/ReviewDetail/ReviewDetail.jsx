import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ReviewDetail = () => {
  const review = useLoaderData(); // Data fetched from the loader in the route
  const { user } = useContext(AuthContext); // Current logged-in user
  const [isAddedToWatchList, setIsAddedToWatchList] = useState(false);

  const {
    gameCover,
    gameTitle,
    reviewDescription,
    rating,
    genre,
    reviewerName,
    reviewerEmail,
  } = review;

  // Handler for adding the review to the WatchList
  const handleAddToWatchList = () => {
    if (!user) {
      toast.error("You need to be logged in to add to WatchList!");
      return;
    }

    const watchListItem = {
      gameCover,
      gameTitle,
      reviewDescription,
      rating,
      genre,
      reviewerName,
      reviewerEmail,
      userEmail: user.email,
      userName: user.displayName,
    };

    fetch("http://localhost:5000/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watchListItem),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Review added to WatchList successfully!");
          setIsAddedToWatchList(true);
        } else {
          toast.error("Failed to add to WatchList. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error adding to WatchList:", error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="card w-full max-w-3xl mx-auto bg-base-100 shadow-lg p-6">
        <img src={gameCover} alt={gameTitle} className="rounded-lg mb-4" />
        <h1 className="text-3xl font-bold text-cyan-800">{gameTitle}</h1>
        <p className="mt-2 text-lg">
          <strong>Genre:</strong> {genre}
        </p>
        <p className="mt-2 text-lg">
          <strong>Rating:</strong> {rating} / 5
        </p>
        <p className="mt-4 text-base">
          <strong>Review Description:</strong> {reviewDescription}
        </p>
        <div className="mt-4">
          <p className="text-sm">
            <strong>Reviewer Name:</strong> {reviewerName}
          </p>
          <p className="text-sm">
            <strong>Reviewer Email:</strong> {reviewerEmail}
          </p>
        </div>
        <div className="mt-6">
          <button
            className={`btn ${isAddedToWatchList ? "btn-disabled" : "btn-primary"} font-bold`}
            onClick={handleAddToWatchList}
            disabled={isAddedToWatchList}
          >
            {isAddedToWatchList ? "Added to WatchList" : "Add to WatchList"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;

