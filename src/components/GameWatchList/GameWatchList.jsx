

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const GameWatchList = () => {
  const { user } = useContext(AuthContext);
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`https://chill-gamer-server-xi.vercel.app/watchlist?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setWatchList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <p className="text-center text-xl font-bold">Loading Watchlist...</p>;
  }

  if (!user) {
    return <p className="text-center text-xl font-bold">Please log in to view your Watchlist.</p>;
  }

  if (watchList.length === 0) {
    return <p className="text-center text-xl font-bold">Your Watchlist is empty.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Game Watchlist</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Game Cover</th>
            <th className="border border-gray-300 px-4 py-2">Game Title</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Genre</th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">
                <img src={item.gameCover} alt={item.gameTitle} className="h-16 w-16 rounded" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.gameTitle}</td>
              <td className="border border-gray-300 px-4 py-2">{item.rating} / 5</td>
              <td className="border border-gray-300 px-4 py-2">{item.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameWatchList;
