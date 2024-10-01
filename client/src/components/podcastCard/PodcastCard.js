import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { playerActions } from "../../store/Player";

const PodcastCard = ({ items, from }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const handlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      console.log("Playing:", items.title);
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImg(`http://localhost:8000/${items.frontImage}`)
      );
      dispatch(
        playerActions.changeSong(`http://localhost:8000/${items.audioFile}`)
      );
    }
  };

  return (
    <div className="hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <NavLink
        to={`/description/${items._id}?from=${from}`}
        className="bg-white border flex flex-col rounded shadow-xl p-4 hover:shadow-2xl transition-all duration-300"
      >
        <div>
          <img
            src={`http://localhost:8000/${items.frontImage}`}
            alt=""
            className="rounded size-[42vh] object-cover"
          />
        </div>
        <div className="mt-2 text-xl font-bold">
          {items.title.length > 10
            ? items.title.slice(0, 10) + " ..."
            : items.title}
        </div>
        <div className="mt-2 leading-5 text-slate-500">
          {items.description.length > 20
            ? items.description.slice(0, 20) + " ..."
            : items.description}
        </div>
        <div className="mt-2 bg-orange-200 text-orange-600 border border-orange-800 rounded-full px-4 py-2 text-xl">
          <h3 className="text-center">{items.category.categoryName}</h3>
        </div>
        <div className="mt-2">
          <Link
            to={isLoggedIn ? "#" : "/signup"}
            className="bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
            onClick={handlePlay}
          >
            Play Now
          </Link>
        </div>
      </NavLink>
    </div>
  );
};

export default PodcastCard;
