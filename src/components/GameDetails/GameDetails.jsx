

import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";  // Import star icons

const GameDetails = () => {
  const { _id } = useParams();

  const data = useLoaderData();
  const id = _id;

  const game = data.find((game) => game._id === id);

  const {
    _id: currentId,
    name,
    review,
    year,
    genre,
    rating,
    availability,
    photo
  } = game;

  // Function to render the star rating
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating); // full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // half star
    const emptyStars = 5 - fullStars - halfStars; // empty stars

    // Return an array of star icons based on the rating
    return (
      <div className="flex text-center justify-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-400" />
        ))}
        {halfStars === 1 && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <div className="card-base-100 shadow-xl">
      <figure>
        <div>
          <img
            className="mx-auto w-96 h-72 rounded-2xl justify-items-start"
            src={photo}
            alt=""
          />
        </div>
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-3xl font-extrabold text-orange-900 mx-auto">
          {name}
        </h2>

        <div className="mx-auto">
          <p className="text-3xl font-bold text-center text-green-900">{review}</p>
          <p className="text-3xl font-bold text-center text-blue-600">{year}</p>
          <p className="text-3xl font-bold text-center text-blue-600">{genre}</p>
          <p className="text-3xl font-bold text-center text-red-300">
            Rating: {renderRatingStars(rating)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;