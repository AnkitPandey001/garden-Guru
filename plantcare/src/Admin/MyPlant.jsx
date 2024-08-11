import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

const MyPlant = () => {
  const [plants, setPlants] = useState([]);

  const notifyB = () => {
    toast.success("You have removed your collection");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userPlantAdded")) || {};
    setPlants(Object.values(data));
  }, []);

  const handleRemove = (id) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    localStorage.setItem("userPlantAdded", JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
    notifyB();
  };

  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Display two slides vertically
    slidesToScroll: 1, // Scroll one slide at a time
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10 md:mt-0 ">My Collection</h1>
      {plants.length > 0 ? (
        <Slider {...sliderSettings} className="custom-slide">
          {plants.map((plant, index) => (
            <div key={plant.id} className="plant-card rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-center items-center mb-2">
                <img
                  className="w-[150px] h-[180px] object-cover"
                  src={plant.images}
                  alt={plant.commonName}
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-medium mb-2">{plant.commonName}</h2>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-green-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
                    onClick={() =>
                      navigate(`/pagenavigation/${index}`, { state: { plant } })
                    }
                  >
                    View Details
                  </button>
                  <button
                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                    onClick={() => handleRemove(plant.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-black text-3xl font-bold mt-16">
          Nothing In Your Collection
        </p>
      )}
    </>
  );
};

export default MyPlant;
