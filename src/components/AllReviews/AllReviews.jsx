
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Access logged-in user information

  useEffect(() => {
    // Fetch all reviews from the database
    fetch("http://localhost:5000/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-xl font-bold">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-center text-xl font-bold text-blue-600">
        No reviews found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              
              src={review.gameCover}
              alt={review.gameTitle}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-extrabold text-purple-950 mb-2">{review.gameTitle}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-pink-900">Genre:</span> {review.genre}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold text-yellow-500">Rating:</span> {review.rating} / 5
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Review:</span> {review.reviewDescription}
              </p>

              {/* Display Reviewer Info only if User is Logged In */}
              {user && (
                <>
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold">Reviewer:</span> {review.reviewerName}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold">Reviewer Email:</span>{" "}
                    {review.reviewerEmail}
                  </p>
                </>
              )}

              <Link
                to={`/review/${review._id}`}
                className="btn btn-primary mt-4 w-full text-center"
              >
                Explore Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;

