
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-100 text-white py-12">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="flex flex-col items-start">
            <h3 className="text-black text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-black">Any Questions</p>
            <ul className="mt-4 text-black">
              <li>Email: Discount.coupon@com</li>
              <li>Phone: +448323421</li>
              <li>Address: East london, Uk</li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold mb-4 text-red-950">Subscribe us</h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-[#e4edd5] text-black py-2 rounded-md hover:bg-slate-500 hover:text-white transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex justify-center sm:justify-start items-center space-x-6 mt-4 sm:mt-0">
          <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-900 hover:text-red-600 transition duration-200"
            >
              <FaYoutube className="text-2xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-600 transition duration-200"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-600 transition duration-200"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-400 transition duration-200"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="text-center mt-08">
          <p className="text-black font-semibold mt-6">
             @Copyright Chill Gamer. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

