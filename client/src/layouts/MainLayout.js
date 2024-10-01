import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/AuioPlayer/AudioPlayer";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow mt-14">
        <Outlet />
      </main>

      <div className="w-full">
        {/* <Footer /> */}
        <AudioPlayer />
      </div>
    </div>
  );
};

export default MainLayout;
