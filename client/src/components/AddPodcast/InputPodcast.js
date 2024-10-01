import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate();


  const handleChangeImage = (e) => {
    // const file = e.target.value[0];
    // setFontImage(file);
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFrontImage(e.target.files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFrontImage(file);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitPodcast = async (e) => {
    // console.log(input, frontImage, audioFile);
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("frontImage", frontImage);
    formData.append("audioFile", audioFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/add-podcast",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // console.log(response);

      // toast.success(response.data.message)

      alert(response.data.message);
      navigate("/profile")
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);

      // toast.error(e.response.data.message)
    } finally {
      setInput({
        title: "",
        description: "",
        category: "",
      });
      setAudioFile(null);
      setFrontImage(null);
    }
  };

  return (
    <div className="px-12 py-4 lg:px-12 bg-green-100 h-screen lg:h-[90vh]">
      {/* <ToastContainer/> */}
      <h1 className="text-2xl font-semibold">Create your podcast here</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-start justify-between gap-4">
        {/* left div */}
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className="size-[30vh] lg:size-[60vh] flex items-center justify-center hover:bg-slate-200 transition-all duration-300"
            style={{ border: "1px dashed black" }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="Thumbnil"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <label
                htmlFor="file"
                className={`text-xl h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${
                  dragging ? "bg-blue-400" : ""
                }`}
              >
                <span className="text-center">
                  Drag and drop the thumbnail or Click to browse
                </span>
              </label>
            )}
          </div>
        </div>

        {/* right div */}
        <div className="w-full lg:w-4/6 bg-slate-600 p-4">
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="title">
              Podcast Title
            </label>
            <input
              type="text"
              placeholder="Enter title here"
              name="title"
              value={input.title}
              id="title"
              className="w-full px-2 py-2 mt-2 outline-none border border-black rounded"
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Enter description here"
              name="description"
              value={input.description}
              id="description"
              rows={4}
              onChange={handleChangeInput}
              className="w-full px-2 py-2 mt-2 outline-none border border-black rounded"
            />
          </div>

          {/* div for audio file section*/}
          <div className="my-4 px-4 lg:px-12">
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Div for Audio Selection */}
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium" htmlFor="audioFile">
                  Select Audio
                </label>
                <input
                  type="file"
                  accept=".mp3, .wav, .m4a, .ogg"
                  id="audioFile"
                  className="mt-4 border border-gray-300 rounded p-2"
                  onChange={(e) => {
                    e.preventDefault();
                    setAudioFile(e.target.files[0]);
                  }}
                />
              </div>

              {/* Right Div for Categories */}
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium" htmlFor="category">
                  Select Category
                </label>
                <select
                  name="category"
                  value={input.category}
                  id="category"
                  onChange={handleChangeInput}
                  className="border border-gray-300 rounded mt-4 outline-none px-4 py-2"
                >
                  <option value="">Select Category</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Hobbies">Hobbies</option>
                  <option value="Govornment">Govornment</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-6 flex">
            <button
              className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300"
              onClick={handleSubmitPodcast}
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
