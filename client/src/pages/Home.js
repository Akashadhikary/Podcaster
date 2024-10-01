import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="bg-green-100 px-6 lg:px-12 h-screen flex flex-col items-center justify-center">
      {/* Container for heading and image */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
        
        {/* Text Section */}
        <div className="w-full lg:w-4/6 flex flex-col items-center lg:items-start">
          {/* First line */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center lg:text-left">
            Create & listen to the all latest
          </h1>
          {/* Second line with podcast and image */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold flex items-center justify-center lg:justify-start mt-2 lg:mt-0">
            p
            <img
              src="microphone.png"
              alt="o"
              className="h-10 md:h-12 lg:h-16 lg:animate-spin-slow lg:mx-2"
            />
            dcasts
          </h1>
        </div>
        
        {/* Image Section */}
        <div className="w-full lg:w-1/6 mb-6 lg:mb-0 lg:block flex justify-center">
          <div className="px-2 py-4 shadow-md w-48 h-48 lg:w-auto lg:h-auto">
            <img
              src="frontImage.jpg"
              alt="Podcast Cover"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 w-full flex flex-col lg:flex-row items-center justify-between lg:items-start lg:justify-between gap-6 lg:gap-0">
        
        {/* Sign In Section */}
        <div className="flex flex-col items-center lg:items-start">
          <p className="text-xl font-semibold text-center lg:text-left">
            Listen to the most popular podcasts on just one platform, <b>PODCASTER</b>.
          </p>
          {!isLoggedIn && (
            <button className="px-6 py-4 mt-8 bg-green-700 text-white font-semibold rounded-full">
              <Link to="/signin" className="font-bold text-xl">
                Sign In to listen
              </Link>
            </button>
          )}
        </div>

        {/* Podcast Info Section */}
        <div className="lg:mt-0">
          <p className="text-zinc-600 font-bold text-center lg:text-right">
            Our app contains more than 2000 podcasts for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
