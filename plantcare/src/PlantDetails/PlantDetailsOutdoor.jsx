import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Data from "../topData/outdoorData";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./customSlider.css"; // Import custom CSS file for Slider
import { toast } from "react-toastify";

const PlantDetailsOutdoor = () => {
  const [selectedPlant, setSelectedPlant] = useState(Data[0]); // Default to the first plant
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(Data);
  const navigate = useNavigate();

  const handleProductClick = (plant) => {
    setSelectedPlant(plant);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const notifyB = () => {
    toast.success("Plant added to your collection");
  };
  const notifyA = () => {
    toast.error("Plant is already in your collection");
  };

  const handleClickAdd = (plantId) => {
    const plant = Data.find((p) => p.id === plantId);
    const currentData = JSON.parse(localStorage.getItem("userPlantAdded")) || [];
    if (currentData[plant.id]) {
      notifyA();
      return;
    }
    const updatedData = { ...currentData, [plant.id]: plant };
    localStorage.setItem("userPlantAdded", JSON.stringify(updatedData));
    notifyB();
    navigate("/adminpage/myplant");
  };
  

  useEffect(() => {
    // Filter data based on search value
    const filtered = Data.filter((plant) =>
      plant.commonName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);

    // Update selected plant based on search result
    if (filtered.length === 1) {
      setSelectedPlant(filtered[0]);
    } else if (filtered.length === 0) {
      setSelectedPlant(Data[0]); // Reset to the first plant if no matches
    } else {
      setSelectedPlant(filtered[0]); // Select the first matched plant
    }
  }, [searchValue]); // Run effect whenever searchValue changes

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="md:max-w-[1280px] mx-auto px-4 md:px-0 mt-10">
    <div className="flex justify-center mb-4">
      <div className="relative w-full md:w-80">
        <input
          type="text"
          placeholder="Search plant..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:border-green-500"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </div>
    <div className="grid gap-y-4 md:gap-y-0 md:grid-cols-2">
      {/* Details */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          {selectedPlant.commonName}
        </h1>
        <p className="mb-4">{selectedPlant.description}</p>
        <button
          className="px-4 py-2 bg-[#20B486] text-white rounded hover:bg-[#20b43c] transition-colors duration-300 mr-4"
          onClick={() =>
            navigate(`/pagenavigation/${selectedPlant.id}`, {
              state: { plant: selectedPlant },
            })
          }
        >
          Explore More
        </button>
        <button
          className="px-4 py-2 bg-[#20B486] text-white rounded hover:bg-[#20b43c] transition-colors duration-300 mr-4"
          onClick={() => handleClickAdd(selectedPlant.id)}
        >
          +
        </button>
      </div>

      {/* Image */}
      <div className="p-8 col-start-2 row-span-2 flex items-center justify-center max-w-[500px] mx-auto md:mx-20">
        {selectedPlant && (
          <img
            className="w-full h-auto rounded-lg max-h-[600px]"
            src={selectedPlant.images}
            alt={selectedPlant.commonName}
          />
        )}
      </div>

      {/* Slider */}
      <div className="bg-white rounded shadow-lg p-8 mt-4 md:mt-10 custom-slider">
        <Slider {...sliderSettings}>
          {filteredData.map((plant) => (
            <div
              key={plant.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleProductClick(plant)}
            >
              <img
                className="w-[150px] h-[180px] mb-2 object-cover"
                src={plant.images}
                alt={plant.commonName}
              />
              <p className="text-sm text-center">{plant.commonName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </div>
  );
};

export default PlantDetailsOutdoor;
