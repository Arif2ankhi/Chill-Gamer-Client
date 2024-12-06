


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaEye } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";


// const GameCard = ({ game }) => {
//   const navigate = useNavigate(); // Initialize navigate function

//   const { _id, name, review, year, genre, rating, availability, photo } = game;

//   // Generate star ratings
//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5;
//     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//     return (
//       <div className="flex items-center">
//         {Array(fullStars)
//           .fill()
//           .map((_, index) => (
//             <span key={index} className="text-yellow-500 text-xl">
//               ★
//             </span>
//           ))}
//         {halfStar && (
//           <span className="text-yellow-500 text-xl">
//             ★
//           </span>
//         )}
//         {Array(emptyStars)
//           .fill()
//           .map((_, index) => (
//             <span key={index} className="text-gray-300 text-xl">
//               ★
//             </span>
//           ))}
//       </div>
//     );
//   };

//   return (
//     <Link to={`/games/${_id}`}>
//     <div className="card card-side bg-base-100 rounded-3xl px-4 shadow-xl">
//       <figure>
//         <img
//           className="h-64 w-96 rounded-2xl"
//           src={photo}
//           alt="Game Thumbnail"
//         />
        
        
//       </figure>
      
//       <div className="card-body">
//         <h2 className="card-title text-3xl font-bold text-blue-900">{name}</h2>
//         <p className="card-title text-xl font-semibold text-purple-900">
//           {genre}
//         </p>
//         <div className="flex items-center">
//           {renderStars(rating)}
//           <span className="ml-2 text-lg font-semibold text-gray-600">
//             ({rating})
//           </span>
//         </div>
//         <p className="card-title text-xl font-bold text-green-900">
//           Released: {year}
//         </p>
//         <div>
//         <div className="">
//           <div className=" space-y-4 m-2">
//             <button className="btn bg-slate-800 text-white font bold "><FaEye /></button>
//             <Link to ={`updateGame/${_id}`}>
//             <button className="btn bg-green-800 text-white font-bold"><MdEdit /></button>
//             </Link>
//             <button 
//             onClick={() =>handleDelete(_id)}
//             className="btn bg-red-500 text-white font-bold">X</button>
//           </div>
//         </div>

//         </div>
//         <div className="card-actions">
//           <button
//             className="btn btn-primary font-bold"
//             onClick={() => navigate(`/games/${_id}`)} // Navigate to the game details page
//           >
//             Explore Details
//           </button>
          
//         </div>
//             {/* Buttons  */}
           

//       </div>
      
//     </div>
//     {/* <div className="card-actions justify-end">
//           <div className="btn-group btn-group-vertical grid space-y-4 m-2">
//             <button className="btn bg-slate-800 text-white font bold ">View</button>
//             <Link to ={`updateCoffee/${_id}`}>
//             <button className="btn bg-green-800 text-white font-bold">Edit</button>
//             </Link>
//             <button 
//             onClick={() =>handleDelete(_id)}
//             className="btn bg-red-500 text-white font-bold">X</button>
//           </div>
//         </div> */}
//     </Link>
//   );
// };

// export default GameCard;


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
    <div className="w-[460px] h-[720px] bg-base-100 rounded-xl shadow-md overflow-hidden">
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
        <div className="mt-4 flex justify-between">
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
        </div>
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

