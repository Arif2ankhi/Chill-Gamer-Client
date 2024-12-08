import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.jpg';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-toastify'; // Importing toast for showing messages

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  // Handle SignOut
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('User signed out successfully');
        toast.success('Logged out successfully!'); // Show a toast message
      })
      .catch((error) => {
        console.log('Error during sign out:', error.message);
        toast.error('Error while logging out!');
      });
  };

  // Links for navigation
  const links = (
    <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-5">
      <li>
        <NavLink
          className="text-lg text-black font-bold p-2"
          to="/"
          activeClassName="text-orange-700"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-lg text-black font-bold p-2"
          to="/allReviews"
          
          activeClassName="text-orange-700"
        >
          All Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-lg text-black font-bold p-2"
          to="/addReview"
          activeClassName="text-orange-700"
        >
          Add Review
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-lg text-black font-bold p-2"
          to="/myReviews"
          activeClassName="text-orange-700"
        >
          My Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          className="text-lg text-black font-bold p-2"
          to="/gameWatchList"
          activeClassName="text-orange-700"
        >
          Watch List
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className="navbar bg-orange-500 rounded-lg mt-2 mb-8 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img
          className="w-[96px] h-[84px] text-2xl rounded-lg ml-4 animate__animated animate__flip animate__slow"
          src={Logo}
          alt="Logo"
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="menu menu-horizontal px-1">{links}</div>
      </div>
      <div className="navbar-end">
        {/* User Avatar and Logout */}
        {user ? (
          <div className="flex items-center gap-2">
            {/* User Avatar */}
            <div className="relative">
              <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            </div>
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="btn btn-secondary ml-2"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button className="btn btn-primary">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;



