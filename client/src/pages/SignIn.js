import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage";

const SignIn = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/sign-in",
        values,
        { withCredentials: true } //{ withCredentials: true } for cookie
      );
      dispatch(authActions.signin());
      // console.log(res.data.message);
      navigate("/profile");
    } catch (e) {
      // toast.error(e.response.data.message);
      if (e.response && e.response.data && e.response.data.message) {
        alert(e.response.data.message);
        console.log(e.response.data.message);
      } else {
        console.log("An error occurred", e);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="h-screen bg-green-200 flex items-center justify-center">
          <div className="lg:w-2/6 md:w-3/6 w-4/6 flex flex-col items-center justify-center">
            <Link to="/" className="text-2xl font-semibold">
              PODCASTER
            </Link>
            <div className="mt-6 w-full">
              <div className="w-full mt-2 flex flex-col relative">
                <label
                  className={`absolute left-2 transition-all duration-300 px-1 ${
                    emailFocused || values.email
                      ? "-top-3 text-xs"
                      : "top-3 text-base"
                  } bg-white rounded-md`}
                >
                  Email
                </label>
                <input
                  className="p-2 outline-none border border-black rounded-md focus:border-green-600 transition-all duration-300"
                  type="text"
                  name="email"
                  value={values.email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(!!values.email)} // if there's a value, the label stays floated
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full mt-5 flex flex-col relative">
                <label
                  className={`absolute left-2 transition-all duration-300 px-1 ${
                    passwordFocused || values.password
                      ? "-top-3 text-xs"
                      : "top-3 text-base"
                  } bg-white rounded-md`}
                >
                  Password
                </label>
                <input
                  className="p-2 outline-none border border-black rounded-md focus:border-green-600 transition-all duration-300"
                  type="password"
                  name="password"
                  value={values.password}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(!!values.password)} // if there's a value, the label stays floated
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full mt-4 flex flex-col">
                <button
                  className="bg-green-600 font-semibold text-xl text-white rounded p-2"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              </div>
              <div className="w-full mt-3 flex flex-col">
                <p className="text-center font-semibold">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-green-900 hover:text-green-600"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
