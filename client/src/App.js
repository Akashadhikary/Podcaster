import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Catagories from "./pages/Catagories";
import Profile from "./pages/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import AddPodcast from "./pages/AddPodcast";
import AllPodcasts from "./pages/AllPodcasts";
import CaregoriesPage from "./pages/CaregoriesPage";
import DescriptionPage from "./pages/DescriptionPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/check-cookie", { withCredentials: true });
      if (response.data.message) {
        dispatch(authActions.signin());
      }
    };
    fetch();
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Catagories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/all-podcasts" element={<AllPodcasts />} />
            <Route path="/categories/:cat" element={<CaregoriesPage />} />
            <Route path="/description/:id" element={<DescriptionPage />} />
            {/* <Route path="/categories/:*" element={<CaregoriesPage />} />
            <Route path="/description/:*" element={<DescriptionPage />} /> */}
            <Route path="*" element={<ErrorPage/>} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
