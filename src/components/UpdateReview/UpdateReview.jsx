// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const UpdateReview = () => {
//   const { id } = useParams();
//   const [review, setReview] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch review by ID
//     fetch(`http://localhost:5000/reviews/${id}`)
//       .then((res) => res.json())
//       .then((data) => setReview(data))
//       .catch((err) => console.error("Error fetching review:", err));
//   }, [id]);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const updatedReview = {
//       gameTitle: e.target.gameTitle.value,
//       rating: e.target.rating.value,
//       genre: e.target.genre.value,
//       reviewDescription: e.target.reviewDescription.value,
//     };

//     fetch(`http://localhost:5000/reviews/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedReview),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.modifiedCount > 0) {
//           toast.success("Review updated successfully!");
//           navigate("/myReviews"); // Redirect to My Reviews
//         } else {
//           toast.error("No changes made to the review.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error updating review:", err);
//         toast.error("Failed to update the review.");
//       });
//   };

//   if (!review) {
//     return <p className="text-center text-xl font-bold">Loading review...</p>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Update Review</h1>
//       <form onSubmit={handleUpdate}>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Game Title</label>
//           <input
//             type="text"
//             name="gameTitle"
//             defaultValue={review.gameTitle}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Rating</label>
//           <input
//             type="number"
//             step="0.1"
//             min="1"
//             max="5"
//             name="rating"
//             defaultValue={review.rating}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Genre</label>
//           <input
//             type="text"
//             name="genre"
//             defaultValue={review.genre}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block font-bold mb-2">Review Description</label>
//           <textarea
//             name="reviewDescription"
//             defaultValue={review.reviewDescription}
//             className="textarea textarea-bordered w-full"
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary w-full">
//           Update Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateReview;



import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateReview = () => {
  const { id } = useParams(); // Get review ID from route params
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    // Fetch existing review data
    fetch(`http://localhost:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviewData(data))
      .catch((err) => console.error("Error fetching review data:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedReview = {
      gameTitle: e.target.gameTitle.value,
      description: e.target.description.value,
      rating: parseFloat(e.target.rating.value),
      genre: e.target.genre.value,
    };

    // Update request to backend
    fetch(`http://localhost:5000/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Review updated successfully!");
          navigate("/myReviews"); // Redirect to My Reviews page
        } else {
          toast.error("Failed to update review. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error updating review:", err);
        toast.error("An error occurred. Please try again.");
      });
  };

  if (!reviewData) {
    return (
      <p className="text-center text-xl font-bold text-blue-600">
        Loading review details...
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Update Review</h1>
      <form onSubmit={handleUpdate} className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label htmlFor="gameTitle" className="block font-bold mb-2">
            Game Title
          </label>
          <input
            type="text"
            id="gameTitle"
            name="gameTitle"
            defaultValue={reviewData.gameTitle}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={reviewData.description}
            className="w-full border px-3 py-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block font-bold mb-2">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            defaultValue={reviewData.rating}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block font-bold mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            defaultValue={reviewData.genre}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block font-bold mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={reviewData.userEmail}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block font-bold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={reviewData.userName}
            className="w-full border px-3 py-2 rounded bg-gray-100"
            readOnly
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;

