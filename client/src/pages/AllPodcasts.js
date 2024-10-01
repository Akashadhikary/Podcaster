import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PodcastCard from '../components/podcastCard/PodcastCard';
import { useSelector } from 'react-redux';

const AllPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const playerDiv = useSelector((state) => state.Player.isPlayerDiv);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:8000/api/v1/get-podcasts');
        setPodcasts(response.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`bg-green-100 px-12 h-full min-h-screen ${playerDiv ? "pb-24" : "pb-0"}`}>
      <div className='w-full px-4 lg:px-12 py-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
        {loading ? (
          // Loading state
          <div className='flex items-center justify-center min-h-[60vh] w-full'>
            <div className='text-xl font-semibold'>Loading...</div>
          </div>
        ) : podcasts.length > 0 ? (
          // Render podcasts if data is present
          podcasts.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} from="all-podcasts"/>
            </div>
          ))
        ) : (
          // No data, show the video
          <div className='flex items-center justify-center min-h-[60vh] w-full'>
            <video
              className='w-full max-w-xs md:max-w-md lg:max-w-lg object-contain'
              autoPlay
              loop
              muted
            >
              <source src='/NoData.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPodcasts;
