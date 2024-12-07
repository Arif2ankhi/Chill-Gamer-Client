import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const { user } = useContext(AuthContext); // Access logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetch only the reviews of the logged-in user
      fetch(`http://localhost:5000/reviews?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyReviews(data);
        })
        .catch((err) => console.error("Error fetching user reviews:", err));
    }
  }, [user]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirm) {
      fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Review deleted successfully!");
            setMyReviews(myReviews.filter((review) => review._id !== id)); // Update UI
          } else {
            toast.error("Failed to delete the review.");
          }
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
          toast.error("Error occurred while deleting the review.");
        });
    }
  };

  const handleUpdate = (id) => {
    // Redirect to Update Review Page
    navigate(`/updateReview/${id}`);
  };

  if (!user) {
    return (
      <p className="text-center text-xl font-bold text-red-500">
        Please log in to see your reviews.
      </p>
    );
  }

  if (myReviews.length === 0) {
    return (
      <p className="text-center text-xl font-bold text-blue-600">
        You have not added any reviews yet.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">My Reviews</h1>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 font-extrabold">Game Title</th>
            <th className="border border-gray-400 px-4 py-2 font-extrabold">Rating</th>
            <th className="border border-gray-400 px-4 py-2 font-extrabold">Genre</th>
            <th className="border border-gray-400 px-4 py-2 font-extrabold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myReviews.map((review) => (
            <tr key={review._id}>
              <td className="border border-gray-400 px-4 py-2">
                {review.gameTitle}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {review.rating}
              </td>
              <td className="border border-gray-400 px-4 py-2">{review.genre}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleUpdate(review._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger bg-red-600 text-white"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
