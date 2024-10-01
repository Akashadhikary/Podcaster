import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ErrorPage from "./ErrorPage";

const SignUp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/sign-up",
        values
      );
      console.log(res.data.message);
      navigate("/signin");
    } catch (e) {
      // toast.error(e.response.data.message);
      alert(e.response.data.message);
      console.log(e.response.data.message);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="h-screen bg-green-200 flex items-center justify-center">
          <div className="lg:w-2/6 md:w-3/6 w-4/6 flex flex-col items-center justify-center">
            {/* <ToastContainer
        position="top-center"
        draggable
      /> */}
            <Link to="/" className="text-2xl font-semibold">
              PODCASTER
            </Link>
            <div className="mt-6 w-full">
              <div className="w-full flex flex-col">
                <label>Username</label>
                <input
                  className="mt-2 p-2 outline-none border border-black rounded-md"
                  type="text"
                  name="username"
                  value={values.name}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-2 flex flex-col">
                <label>Email</label>
                <input
                  className="mt-3 p-2 outline-none border border-black rounded-md"
                  type="text"
                  name="email"
                  value={values.email}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-3 flex flex-col">
                <label>Password</label>
                <input
                  className="mt-2 p-2 outline-none border border-black rounded-md"
                  type="password"
                  name="password"
                  value={values.password}
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="w-full mt-4 flex flex-col">
                <button
                  className="bg-green-600 font-semibold text-xl text-white rounded p-2"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
              <div className="w-full mt-3 flex flex-col">
                <p className="text-center font-semibold">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-green-900 hover:text-green-600"
                  >
                    Sign In
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

export default SignUp;
