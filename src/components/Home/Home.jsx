// import React from 'react';
// import Banner from '../Banner/Banner';
// import { useLoaderData } from 'react-router-dom';
// import GameCard from '../GameCard/GameCard';
// import Marquee from 'react-fast-marquee';

// const Home = () => {
//     const games = useLoaderData(); 
//     return (
//         <div>
//             <Banner></Banner> 
//             <section>
//         <div className="text-3xl font-extrabold justify-center text-center text-red-800  animate__animated animate__bounce">
//           Popular Games
//         </div>

//         <Marquee pauseOnHover={true} speed={300}>
//           <div className="flex gap-12">
//             {games.map((game) => (
//               <img
//                 className="w-[240px] h-[160px] gap-10 mt-2"
//                 key={game._id}
//                 src={game.photo}
//                 alt={game.name}
//                 onClick={() => navigate(`/games/${game._id}`)}
//               />
//             ))}
//           </div>
//         </Marquee>
//       </section>

//             <div className='m-20 ' >
//             <h1 className='text-6xl text-center justify-center text-green-700 mb-6'> Total Cool  Games : {games.length}</h1>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
//             {
//                 games.map(game => <GameCard
//                 key = {game.id}
//                 game= {game}
                     
//                 ></GameCard>)
//             }
//             </div>

//             </div>

           
//         </div>

//     );
// };

// export default Home;



import React from 'react';
import Banner from '../Banner/Banner';
import { useLoaderData } from 'react-router-dom';
import GameCard from '../GameCard/GameCard';
import Marquee from 'react-fast-marquee';

const Home = () => {
    const games = useLoaderData();

    // Sort games by rating and pick the top 6
    const topRatedGames = [...games]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);

    // Filter games by Action genre
    const actionGames = games.filter((game) => game.genre.toLowerCase() === 'action');

    return (
        <div>
            <Banner />
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

            {/* All Games  */}

            <div className='m-20 ' >
            <h1 className='text-6xl text-center justify-center font-extrabold text-orange-700 mb-6'> All Cool Games</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
           {
                games.map(game => <GameCard
                key = {game.id}
                game= {game}
                     
                ></GameCard>)
            }
            </div>

            </div>




            <div className="m-20">
                {/* Top Rated Games Section */}
                <h1 className="text-6xl text-center justify-center text-purple-700 font-bold mb-6">
                    Top Rated Games
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topRatedGames.map((game) => (
                        <GameCard key={game._id} game={game} />
                    ))}
                </div>
            </div>

            <div className="m-20">
                {/* Action Games Section */}
                <h1 className="text-6xl text-center justify-center font-bold text-red-700 mb-6">
                    Action Games
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {actionGames.map((game) => (
                        <GameCard key={game._id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
