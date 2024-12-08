

import React, { useState } from "react";
import Banner from "../Banner/Banner";
import { useLoaderData } from "react-router-dom";
import GameCard from "../GameCard/GameCard";
import Marquee from "react-fast-marquee";

const Home = () => {
  const games = useLoaderData();

  // State for theme: 'light' or 'dark'
  const [theme, setTheme] = useState("light");

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Sort games by rating and pick the top 6
  const topRatedGames = [...games]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Filter games by Action genre
  const actionGames = games.filter(
    (game) => game.genre.toLowerCase() === "action"
  );

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="p-4 flex justify-end">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 border rounded-md font-semibold transition hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>

      <Banner />

      {/* Popular Games Section */}
      <section>
        <div className="text-3xl font-extrabold justify-center text-center text-red-800 animate__animated animate__bounce">
          Popular Games
        </div>

        <Marquee pauseOnHover={true} speed={300}>
          <div className="flex gap-12">
            {games.map((game) => (
              <img
                className="w-[240px] h-[160px] gap-10 mt-2"
                key={game._id}
                src={game.photo}
                alt={game.name}
                onClick={() => navigate(`/games/${game._id}`)}
              />
            ))}
          </div>
        </Marquee>
      </section>

      {/* Top Rated Games */}
      <div className="m-10">
        <h1 className="text-6xl text-center justify-center text-purple-700 font-bold mb-6">
          Top Rated Games
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4 lg:grid-cols-3 gap-8">
          {topRatedGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>

      {/* All Cool Games */}
      <div className="m-10">
        <h1 className="text-6xl text-center justify-center font-extrabold text-orange-700 mb-6">
          All Cool Games
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game._id} game={game}></GameCard>
          ))}
        </div>
      </div>

      {/* Action Games */}
      <div className="m-10">
        <h1 className="text-6xl text-center justify-center font-bold text-red-700 mb-6">
          Action Games
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actionGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


