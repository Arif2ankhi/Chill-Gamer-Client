

import React, { useEffect, useState } from "react";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    // Fetch all reviews from the database
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setFilteredReviews(data);

        // Extract unique genres for filter dropdown
        const uniqueGenres = [...new Set(data.map((review) => review.genre))];
        setGenres(uniqueGenres);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // Handle genre filter
  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.genre === genre);
      setFilteredReviews(filtered);
    }
  };

  // Handle sorting
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedReviews = [...filteredReviews];
    if (option === "rating-asc") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (option === "rating-desc") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (option === "year-asc") {
      sortedReviews.sort((a, b) => new Date(a.year) - new Date(b.year));
    } else if (option === "year-desc") {
      sortedReviews.sort((a, b) => new Date(b.year) - new Date(a.year));
    }

    setFilteredReviews(sortedReviews);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">All Reviews</h1>

      {/* Filter and Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="font-bold mr-2">
            Filter by Genre:
          </label>
          <select
            id="genre"
            className="border px-3 py-2 rounded"
            value={selectedGenre}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Options */}
        <div>
          <label htmlFor="sort" className="font-bold mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            className="border px-3 py-2 rounded"
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Select</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="year-asc">Year (Oldest First)</option>
            <option value="year-desc">Year (Newest First)</option>
          </select>
        </div>
      </div>

      {/* Display Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg shadow-lg p-4 bg-white"
          >
            <h2 className="text-xl font-bold text-slate-800">{review.gameTitle}</h2>
            <img 
              src={review.gameCover}
              alt={review.gameTitle}
              className="h-48 w-full p-4 object-cover rounded-xl"
            />
            <p className="text-gray-600 mt-2">Genre: {review.genre}</p>
            <p className="text-gray-600">Rating: {review.rating}</p>
            <p className="text-gray-600">Year: {review.year}</p>
            <p className="text-gray-600 mt-2">{review.reviewDescription.slice(0, 100)}...</p>
            <a
              href={`/review/${review._id}`}
              className="block mt-4 text-blue-600 font-bold"
            >
             <button className="btn btn-secondary bg-orange-600">Explore Details</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;

