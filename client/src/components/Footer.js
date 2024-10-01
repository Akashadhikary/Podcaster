import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-6 mt-12 w-full">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-4">
        
        {/* Podcast Name and Year */}
        <div className="text-center lg:text-left">
          <p className="text-lg font-semibold">
            &copy; {new Date().getFullYear()} PODCAST NAME
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center lg:justify-start gap-4">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            <img
              src="playstore.png"
              alt="Playstore"
              className="h-8 w-8"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            <img
              src="facebook.png"
              alt="Facebook"
              className="h-8 w-8"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity duration-300"
          >
            <img
              src="instagram.png"
              alt="Instagram"
              className="h-8 w-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
