import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

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

//   UPDATE REVIEW 

// const review = result?. review;
// const reviewText = {email, review}

// fetch(`http://localhost:5000/reviews`,{
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ reviewText })
// })
// .then((res) => res.json())
//  .then((data) => {
//     console.log('Updated review in db', data);
//  })

//   const handleUpdate  (id) => {
//     navigate(`/edit-review/${id}`);
//   };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // delete from database
        fetch(`http://localhost:5000/reviews/${id}`, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              const remainingReviews = myReviews.filter(review =>review._id !== id);
              setMyReviews(remainingReviews); // Update UI
            }
          });
      }
    });
  };

  //   const handleDelete = (id) => {
  //     const confirm = window.confirm(
  //       "Are you sure you want to delete this review?"
  //     );
  //     if (confirm) {
  //       fetch(`http://localhost:5000/reviews/${id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.deletedCount > 0) {
  //             toast.success("Review deleted successfully!");
  //             setMyReviews(myReviews.filter((review) => review._id !== id)); // Update UI
  //           } else {
  //             toast.error("Failed to delete the review.");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error deleting review:", error);
  //           toast.error("Error occurred while deleting the review.");
  //         });
  //     }
  //   };

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
      <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
        My Reviews
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 font-extrabold">
              Game Title
            </th>
            <th className="border border-gray-400 px-4 py-2 font-extrabold">
              Rating
            </th>
            <th className="border border-gray-400 px-4 py-2 font-extrabold">
              Review Description
            </th>
            <th className="border border-gray-400 px-4 py-2 font-extrabold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {myReviews.map((review) => (
            <tr key={review._id}>
              <td className="border border-gray-400 px-4 py-2 text-green-900 font-bold">
                {review.gameTitle}
              </td>
              <td className="border border-gray-400 px-4 py-2 text-yellow-600 font-bold">
                {review.rating}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {review.reviewDescription}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="btn btn-warning bg-green-300 mr-2"
                  onClick={() => handleUpdate(review._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger bg-red-400 text-white mt-2"
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
