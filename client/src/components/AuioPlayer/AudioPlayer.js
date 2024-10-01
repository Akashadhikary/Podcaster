import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/Player";
import { GiCrossedSabres } from "react-icons/gi";
import { BiLogoPlayStore } from "react-icons/bi";
import { TbRewindBackward10 } from "react-icons/tb";
import { TbRewindForward10 } from "react-icons/tb";
import { CgPlayPause } from "react-icons/cg";
import { AiOutlineEllipsis } from "react-icons/ai"; // Import three dots icon

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [volume, setVolume] = useState(1); // Volume state
  const [playbackRate, setPlaybackRate] = useState(1); // Playback speed state
  const [showControls, setShowControls] = useState(false); // Control visibility

  const dispatch = useDispatch();
  const playerDiv = useSelector((state) => state.Player.isPlayerDiv);
  const currentImage = useSelector((state) => state.Player.img);
  const currentSong = useSelector((state) => state.Player.songPath);

  const audioRef = useRef();

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImg(""));
    dispatch(playerActions.changeSong(""));
  };

  const handleSongPlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0; // Reset the audio to the start
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  // const handleVolumeChange = (e) => {
  //   const newVolume = e.target.value;
  //   setVolume(newVolume);
  //   audioRef.current.volume = newVolume; // Set the audio volume
  // };

  const handlePlaybackRateChange = (e) => {
    const newPlaybackRate = e.target.value;
    setPlaybackRate(newPlaybackRate);
    audioRef.current.playbackRate = newPlaybackRate; // Set the playback speed
  };

  const toggleControls = () => {
    setShowControls((prev) => !prev); // Toggle visibility
  };

  useEffect(() => {
    if (currentSong) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  }, [currentSong]);

  return (
    <div
      className={`${
        playerDiv ? "fixed" : "hidden"
      } fixed bottom-0 left-0 w-[100%] bg-zinc-600 bg-opacity-30 backdrop-blur-lg text-zinc-300 p-4 rounded flex items-center gap-4`}
    >
      <div className="hidden md:block w-1/3 flex justify-center">
        <img
          src={currentImage || "podcast.jpg"}
          alt="podcast"
          className={`h-16 w-16 rounded-full object-cover transition-transform ease-linear ${
            isPlaying ? "animate-slow-spin" : ""
          }`}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
          <button
            className="text-3xl text-black hover:text-gray-700"
            onClick={handleBackward}
          >
            <TbRewindBackward10 />
          </button>
          <button
            className="relative text-3xl text-black hover:text-gray-700"
            onClick={handleSongPlay}
          >
            {isPlaying ? <CgPlayPause /> : <BiLogoPlayStore />}
            <span className="absolute inset-2 text-xl font-semibold text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </button>
          <button
            className="text-3xl text-black hover:text-gray-700"
            onClick={handleForward}
          >
            <TbRewindForward10 />
          </button>
          <button
            className="text-3xl text-black hover:text-gray-700"
            onClick={toggleControls} // Toggle controls on click
          >
            <AiOutlineEllipsis />
          </button>
        </div>
        <div className="w-full flex items-center justify-center mt-3">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            className="w-full hover:cursor-pointer"
            onChange={handleSeek}
          />
        </div>
        <div className="w-full flex items-center text-black justify-between text-sm">
          <span>
            {new Date(currentTime * 1000).toISOString().substr(14, 5)}
          </span>
          <span>
            {new Date(duration * 1000).toISOString().substr(14, 5)}
          </span>
        </div>
        {/* Show volume and playback controls if showControls is true */}
        {showControls && (
          <div className="w-full flex flex-col items-center mt-2">
            {/* <div className="flex flex-col items-center">
              <label className="text-sm">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                className="w-3 hover:cursor-pointer transform rotate-90"
                onChange={handleVolumeChange}
              />
            </div> */}
            <div className="mt-2">
              <label className="text-sm">Playback Speed</label>
              <select
                value={playbackRate}
                onChange={handlePlaybackRateChange}
                className="text-black bg-white rounded-md"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/3 flex items-center justify-end">
        <button
          className="rounded-full text-3xl hover:bg-red-600 hover:text-white w-12 h-12 text-black flex items-center justify-center"
          onClick={handleClose}
        >
          <GiCrossedSabres />
        </button>
      </div>
      <audio
        src={currentSong}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default AudioPlayer;

