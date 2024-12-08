import React from "react";
import footer from "../../assets/footer.jpeg";

const Footer = () => {
  return (
    <div className="bg-black  w-full mt-[200px]">
      <div className="pt-20 flex flex-col items-center justify-center text-center animate__animated animate__flip animate__slow__animate_infinite">
        <img src={footer} alt="" className="" />
      </div>
      <div className="ml-10 mt-8 pb-6 flex justify-between mr-10 items-center">
        <div>
          <h3 className="text-white font-semibold text-xl">About Us</h3>
          <p className="text-white opacity-[50%] text-base">
            We are a passionate team <br /> dedicated to providing the best
            <br /> services to our customers. we offering <br /> the latest and 
            popular collection og games
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl">Quick Links</h3>
          <ul className="grid grid-cols-1 text-white opacity-[50%] text-base">
            <li>Home</li>
            <li>Service</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

          


        <div>
          <h3 className="text-white font-semibold text-xl">Subscribe</h3>
          <p className=" text-white opacity-[50%] text-base">
            Subscribe to our newsletter for the <br /> latest updates.
          </p>
          <form className="flex justify-center items-center gap-4 mt-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-gradient-to-r from-yellow-300 to-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="">
        <hr />

        <p className="text-center text-white font-semibold  p-8">
          @2024 Your Company All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
