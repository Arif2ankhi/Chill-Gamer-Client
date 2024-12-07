import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch review by ID
    fetch(`http://localhost:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => console.error("Error fetching review:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedReview = {
      gameTitle: e.target.gameTitle.value,
      rating: e.target.rating.value,
      genre: e.target.genre.value,
      reviewDescription: e.target.reviewDescription.value,
    };

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
          navigate("/myReviews"); // Redirect to My Reviews
        } else {
          toast.error("No changes made to the review.");
        }
      })
      .catch((err) => {
        console.error("Error updating review:", err);
        toast.error("Failed to update the review.");
      });
  };

  if (!review) {
    return <p className="text-center text-xl font-bold">Loading review...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Update Review</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block font-bold mb-2">Game Title</label>
          <input
            type="text"
            name="gameTitle"
            defaultValue={review.gameTitle}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Rating</label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            name="rating"
            defaultValue={review.rating}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            defaultValue={review.genre}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Review Description</label>
          <textarea
            name="reviewDescription"
            defaultValue={review.reviewDescription}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Review
        </button>
      </form>
    </div>
  );
};

export default UpdateReview;
