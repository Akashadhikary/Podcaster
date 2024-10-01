import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PodcastCard from "../podcastCard/PodcastCard";

const YourPodcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [selectedPodcasts, setSelectedPodcasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/get-user-podcasts",
          { withCredentials: true }
        );
        setPodcasts(response.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteMode = () => {
    setDeleting(!deleting);
    setSelectedPodcasts([]);
  };

  const handleSelectPodcast = (id) => {
    if (selectedPodcasts.includes(id)) {
      setSelectedPodcasts(
        selectedPodcasts.filter((podcastId) => podcastId !== id)
      );
    } else {
      setSelectedPodcasts([...selectedPodcasts, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allPodcastIds = podcasts.map((podcast) => podcast._id);
      setSelectedPodcasts(allPodcastIds);
    } else {
      setSelectedPodcasts([]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/delete-podcasts",
        { podcastIds: selectedPodcasts },
        { withCredentials: true }
      );
      setPodcasts(
        podcasts.filter((podcast) => !selectedPodcasts.includes(podcast._id))
      );
      setSelectedPodcasts([]);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold md:font-bold">
          Your Podcasts
        </h1>
        <div>
          <Link
            to="/add-podcast"
            className="px-4 py-2 bg-zinc-800 text-white rounded font-semibold hover:bg-zinc-700 transition duration-300"
          >
            Add Podcast
          </Link>
          {podcasts.length > 0 && (
            <button
              onClick={handleDeleteMode}
              className="px-4 mx-5 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-500 transition duration-300"
            >
              {deleting ? "Cancel" : "Delete"}
            </button>
          )}
        </div>
      </div>

      {deleting && (
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            onChange={handleSelectAll}
            checked={selectedPodcasts.length === podcasts.length}
          />
          <label>Select All</label>
          {selectedPodcasts.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-500 transition duration-300"
            >
              Delete Selected
            </button>
          )}
        </div>
      )}

      {podcasts.length === 0 && <div>No Podcast Available</div>}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {podcasts.map((podcast, i) => (
          <div
            key={i}
            className={`w-full relative ${
              deleting
                ? "pointer-events-auto"
                : "hover:bg-gray-100 hover:shadow-lg"
            }`}
          >
            {deleting && (
              <input
                type="checkbox"
                className="absolute top-2 left-2 w-6 h-6 z-10"
                checked={selectedPodcasts.includes(podcast._id)}
                onChange={() => handleSelectPodcast(podcast._id)}
              />
            )}
            <PodcastCard
              items={podcast}
              from="profile"
              className={`${deleting ? "cursor-default" : "cursor-pointer"}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPodcast;
