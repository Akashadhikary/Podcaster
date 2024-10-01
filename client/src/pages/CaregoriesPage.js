import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PodcastCard from "../components/podcastCard/PodcastCard";

const CategoriesPage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cat } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/category/${cat}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setPodcasts(response.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="px-4 py-4 md:px-8 lg:px-12 bg-green-100 min-h-screen">
      <Link className="underline" to="/categories">
        <h1 className="text-2xl md:text-3xl font-semibold capitalize">{cat}</h1>
      </Link>
      <div className="w-full py-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh] w-full">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        ) : podcasts.length > 0 ? (
          podcasts.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} from="categories" />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[60vh] w-full">
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
    </div>
  );
};

export default CategoriesPage;
