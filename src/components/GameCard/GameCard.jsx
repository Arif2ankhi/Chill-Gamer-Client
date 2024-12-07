


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const { _id, name, review, year, genre, rating, photo } = game;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

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
          <span className="text-yellow-500 text-xl">★</span>
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
    <div className="w-[450px] h-[520px] bg-base-100 rounded-xl shadow-md overflow-hidden">
      <figure className="w-full h-[60%]">
        <img
          className="w-full h-full object-cover"
          src={photo}
          alt="Game Thumbnail"
        />
      </figure>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-blue-900">{name}</h2>
        <p className="text-lg font-semibold text-purple-900">{genre}</p>
        <div className="flex items-center">
          {renderStars(rating)}
          <span className="ml-2 text-sm font-semibold text-gray-600">
            ({rating})
          </span>
        </div>
        <p className="text-lg font-bold text-green-900">Released: {year}</p>
        {/* <div className="mt-4 flex justify-between">
          <button className="btn bg-slate-800 text-white">
            <FaEye />
          </button>
          <Link to={`updateGame/${_id}`}>
            <button className="btn bg-green-800 text-white">
              <MdEdit />
            </button>
          </Link>
          <button
            className="btn bg-red-500 text-white"
            onClick={() => handleDelete(_id)}
          >
            X
          </button>
        </div> */}
        <div className="mt-4">
          <button
            className="btn btn-primary w-full font-bold"
            onClick={() => navigate(`/games/${_id}`)}
          >
            Explore Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;

