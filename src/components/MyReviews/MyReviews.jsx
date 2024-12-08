
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const { user } = useContext(AuthContext); // Access logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetch only the reviews of the logged-in user
      fetch(
        `https://chill-gamer-server-xi.vercel.app/reviews?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyReviews(data);
        })
        .catch((err) => console.error("Error fetching user reviews:", err));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete from database
        fetch(`https://chill-gamer-server-xi.vercel.app/reviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remainingReviews = myReviews.filter(
                (review) => review._id !== id
              );
              setMyReviews(remainingReviews); // Update UI
            }
          });
      }
    });
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
    <div className="container mx-auto p-4 sm:p-6 max-w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-600 mb-6">
        My Reviews
      </h1>
      {/* Add a wrapper for horizontal scrolling */}
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-2 sm:px-4 py-2 text-md text-blue-800 font-extrabold">
                Game Title
              </th>
              <th className="border border-gray-400 px-2 sm:px-4 py-2 text-md  text-blue-800 font-extrabold">
                Rating
              </th>
              <th className="border border-gray-400 px-2 sm:px-4 py-2 text-md  text-blue-800 font-extrabold">
                Review Description
              </th>
              <th className="border border-gray-400 px-2 sm:px-4 py-2 text-md  text-blue-800 font-extrabold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {myReviews.map((review) => (
              <tr key={review._id}>
                <td className="border border-green-800 px-2 sm:px-4 py-2 text-green-900 text-sm sm:text-base font-bold">
                  {review.gameTitle}
                </td>
                <td className="border border-green-900 px-2 sm:px-4 py-2 text-yellow-600 text-sm sm:text-base font-bold">
                  {review.rating}
                </td>
                <td className="border border-green-800 px-2 sm:px-4 py-2 text-sm sm:text-base">
                  {review.reviewDescription}
                </td>
                <td className="border border-gr-800 px-2 sm:px-4 py-2">
                  <button
                    className="btn btn-warning bg-green-300 text-sm sm:text-base mb-2 mr-2 px-2 sm:px-4 py-1"
                    onClick={() => handleUpdate(review._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger bg-red-400 text-white text-sm sm:text-base px-2 sm:px-4 py-1 mt-2 sm:mt-0"
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
    </div>
  );
};

export default MyReviews;

