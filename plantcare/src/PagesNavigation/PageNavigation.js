import React from "react";
import { useLocation } from "react-router-dom";
import { FiSun, FiDroplet, FiThermometer, FiCloud, FiLayers, FiHeart, FiScissors, FiMapPin, FiAlertCircle } from "react-icons/fi";

const PageNavigation = () => {
  const location = useLocation();
  const plantData = location.state?.plant;

  return (
    <div className="md:max-w-[1280px] py-8 mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <InfoSection title="Watering" content={plantData.careRequirements.watering} icon={<FiDroplet />} />
        <InfoSection title="Light" content={plantData.careRequirements.light} icon={<FiSun />} />
        <InfoSection title="Temperature" content={plantData.careRequirements.temperature} icon={<FiThermometer />} />
        <InfoSection title="Soil" content={plantData.careRequirements.soil} icon={<FiLayers />} />
        <div className="col-span-1 row-span-2">
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-center items-center">
            <img src={plantData.images} alt="" className="h-auto w-80 rounded-lg" />
          </div>
        </div>
        <InfoSection title="Fertilization" content={plantData.careRequirements.fertilization} icon={<FiHeart />} />
        <InfoSection title="Pruning" content={plantData.careRequirements.pruning} icon={<FiScissors />} />
        <InfoSection title="Growing Zones" content={plantData.careRequirements.growingZones} icon={<FiMapPin />} />
        <InfoSection title="Native Habitat" content={plantData.careRequirements.nativeHabitat} icon={<FiMapPin />} />
        <InfoSection title="Toxicity" content={plantData.careRequirements.toxicity} icon={<FiAlertCircle />} />
        <InfoSection title="Humidity" content={plantData.careRequirements.humidity} icon={<FiCloud />} />
      </div>
      </div>
  );
};

const InfoSection = ({ title, content, icon }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <div className="flex justify-center items-center mb-2">{icon}</div>
    <h1 className="text-lg font-semibold">{title}</h1>
    <p>{content}</p>
  </div>
);

export default PageNavigation;
