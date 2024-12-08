

// import React from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UpdateReview = () => {
// const {email} = reviews;

//   const navigate = useNavigate();
//   const reviewData = useLoaderData(); // Get data from the loader

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     const updatedReview = {
//       gameTitle: e.target.gameTitle.value,
//       description: e.target.description.value,
//       rating: parseFloat(e.target.rating.value),
//       genre: e.target.genre.value,
//     };

//     fetch(`http://localhost:5000/reviews/${reviewData._id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedReview),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.modifiedCount > 0) {
//           toast.success("Review updated successfully!");
//           navigate("/myReviews");
//         } else {
//           toast.error("Failed to update review.");
//         }
//       })
//       .catch((err) => {
//         console.error("Error updating review:", err);
//         toast.error("An error occurred while updating the review.");
//       });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Update Review</h1>
//       <form
//         onSubmit={handleUpdate}
//         className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
//       >
//         <div className="mb-4">
//           <label htmlFor="gameTitle" className="block font-bold mb-2">
//             Game Title
//           </label>
//           <input
//             type="text"
//             id="gameTitle"
//             name="gameTitle"
//             defaultValue={reviewData.gameTitle}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block font-bold mb-2">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             defaultValue={reviewData.description}
//             className="w-full border px-3 py-2 rounded"
//             rows="4"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="rating" className="block font-bold mb-2">
//             Rating
//           </label>
//           <input
//             type="number"
//             id="rating"
//             name="rating"
//             min="0"
//             max="5"
//             step="0.1"
//             defaultValue={reviewData.rating}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="genre" className="block font-bold mb-2">
//             Genre
//           </label>
//           <input
//             type="text"
//             id="genre"
//             name="genre"
//             defaultValue={reviewData.genre}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>
//         {/* <div className="mb-4">
//           <label htmlFor="userEmail" className="block font-bold mb-2">
//             Your Email
//           </label>
//           <input
//             type="email"
//             id="userEmail"
//             name="userEmail"
//             value={reviewData.userEmail}
//             className="w-full border px-3 py-2 rounded bg-gray-100"
//             readOnly
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="userName" className="block font-bold mb-2">
//             Your Name
//           </label>
//           <input
//             type="text"
//             id="userName"
//             name="userName"
//             value={reviewData.userName}
//             className="w-full border px-3 py-2 rounded bg-gray-100"
//             readOnly
//           />
//         </div> */}
//         <div className="mb-4">
//   <label htmlFor="userEmail" className="block font-bold mb-2">
//     Your Email
//   </label>
//   <input
//     type="email"
//     id="userEmail"
//     name="userEmail"
//     defaultValue={reviewData.userEmail}
//     className="w-full border px-3 py-2 rounded"
//     required
//   />
// </div>
// <div className="mb-4">
//   <label htmlFor="userName" className="block font-bold mb-2">
//     Your Name
//   </label>
//   <input
//     type="text"
//     id="userName"
//     name="userName"
//     defaultValue={reviewData.userName}
//     className="w-full border px-3 py-2 rounded"
//     required
//   />
// </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="btn btn-primary bg-blue-500 text-white font-bold py-2 px-4 rounded"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateReview;



import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const UpdateReview = () => {
    const reviews = useLoaderData();
const {_id} = reviews;

  const navigate = useNavigate();
  const reviewData = useLoaderData(); // Get data from the loader

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedReview = {
      gameTitle: e.target.gameTitle.value,
      description: e.target.description.value,
      rating: parseFloat(e.target.rating.value),
      genre: e.target.genre.value,
    };

    fetch(`http://localhost:5000/reviews/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
            Swal.fire({
                title: 'Success!',
                text: 'Review Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })

        }

    //       toast.success("Review updated successfully!");
    //       navigate("/myReviews");
    //     } else {
    //       toast.error("Failed to update review.");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error updating review:", err);
    //     toast.error("An error occurred while updating the review.");
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Update Review</h1>
      <form
        onSubmit={handleUpdate}
        className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
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
        {/* <div className="mb-4">
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
        </div> */}
        <div className="mb-4">
  <label htmlFor="userEmail" className="block font-bold mb-2">
    Your Email
  </label>
  <input
    type="email"
    id="userEmail"
    name="userEmail"
    defaultValue={reviewData.userEmail}
    className="w-full border px-3 py-2 rounded"
    required
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
    defaultValue={reviewData.userName}
    className="w-full border px-3 py-2 rounded"
    required
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



