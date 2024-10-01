import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userData, setUserData] = useState();
  //   const isLoggedOut = useSelector((state) => state.auth.isLoggedOut);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/get-user", {
          withCredentials: true,
        });
        // console.log(res.data.user);
        setUserData(res.data.user);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("http://localhost:8000/api/v1/log-out", {
      withCredentials: true,
    });
    // console.log(res);
    dispatch(authActions.signout());
    navigate("/")
  };

  return (
    <>
      {userData && (
        <div className="bg-green-900 rounded py-5 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300">Profile</p>
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {userData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{userData.email}</p>
          </div>
          <div>
            <button
              className="px-4 py-2 border rounded-full border-white text-white hover:shadow-xl transition-all duration-300"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
