

import React from 'react';

const GameCard = ({ game }) => {
  const { name, review, year, genre, rating, availability, photo } = game;

  // Generate star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5; // Check for half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={index} className="text-yellow-500 text-xl">
              ★
            </span>
          ))}
        {halfStar && (
          <span className="text-yellow-500 text-xl">
            ★
          </span>
        )}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={index} className="text-gray-300 text-xl">
              ★
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="card card-side bg-base-100 rounded-2xl shadow-xl">
      <figure>
        <img
          className="h-64 w-96 rounded-2xl"
          src={photo}
          alt="Game Thumbnail"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold text-blue-900">{name}</h2>
        <p className="card-title text-xl font-semibold text-purple-900">
          {genre}
        </p>
        <div className="flex items-center">
          {renderStars(rating)}
          <span className="ml-2 text-lg font-semibold text-gray-600">
            ({rating})
          </span>
        </div>
        <p className="card-title text-xl font-bold text-green-900">
          Released: {year}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary font-bold">Explore Details</button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;