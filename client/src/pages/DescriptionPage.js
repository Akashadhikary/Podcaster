import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const DescriptionPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [podcast, setPodcast] = useState(null); // Changed state name to singular for clarity
  const [loading, setLoading] = useState(true);

  // Get the 'from' query parameter to determine where the user came from
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/get-podcasts/${id}`,
          { withCredentials: true }
        );
        setPodcast(response.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="px-4 bg-green-100 min-h-screen lg:px-12 py-4 flex flex-col items-center justify-center">
      {loading ? (
        <div className="text-xl font-semibold">Loading...</div>
      ) : podcast ? (
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 w-full">
          <div>
            <Link
              to={`/${
                from === "categories"
                  ? "categories"
                  : from === "all-podcasts"
                  ? "all-podcasts"
                  : "profile"
              }`}
              className="px-4 mb-4 py-2 border rounded-full bg-black text-white text-center"
            >
              <button>Back</button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start md:items-start">
            <img
              src={`http://localhost:8000/${podcast.frontImage}`}
              alt={podcast.title}
              className="rounded w-full h-auto max-h-[50vh] object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="text-2xl md:text-4xl font-semibold">
              {podcast.title}
            </div>
            <h3 className="mt-4">{podcast.description}</h3>
            <div className="mt-2 w-fit bg-orange-200 text-orange-600 border border-orange-800 rounded-full px-4 py-2 text-lg md:text-xl">
              <h3 className="text-center">{podcast.category.categoryName}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full min-h-[60vh]">
          <video
            className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
            autoPlay
            loop
            muted
          >
            <source src="/NoData.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default DescriptionPage;
