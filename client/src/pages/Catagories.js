import React from "react";
import { Link } from "react-router-dom";

const Catagories = () => {
  const Cat = [
    {
      name: "Comedy",
      color: "bg-purple-200",
      to: "/categories/Comedy",
      img: "comedy.png",
    },
    {
      name: "Business",
      color: "bg-green-200",
      to: "/categories/Business",
      img: "investment.png",
    },
    {
      name: "Education",
      color: "bg-red-200",
      to: "/categories/Education",
      img: "homework.png",
    },
    {
      name: "Hobbies",
      color: "bg-zinc-200",
      to: "/categories/Hobby",
      img: "lifestyle.png",
    },
    {
      name: "Govornment",
      color: "bg-yellow-200",
      to: "/categories/Govornment",
      img: "mayor.png",
    },
  ];

  return (
    <div className="h-screen lg:h-[90vh] bg-green-100">
      <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Cat.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className={`rounded px-8 py-4 text-xl font-semibold ${item.color} hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300 relative h-[22vh] overflow-hidden `}
          >
            <div>{item.name}</div>
            <div className="w-[100%] flex items-center justify-end absolute -bottom-2 -right-2">
              <img
                src={item.img}
                alt={item.img}
                className="rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catagories;
