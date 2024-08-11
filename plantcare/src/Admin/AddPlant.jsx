import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddPlant = () => {
  const [type, setType] = useState("indoor");
  const [formData, setFormData] = useState({
    commonName: "",
    scientificName: "",
    description: "",
    light: "",
    watering: "",
    temperature: "",
    humidity: "",
    soil: "",
    fertilization: "",
    pruning: "",
    propagation: "",
    growingZones: "",
    nativeHabitat: "",
    uses: "",
    toxicity: "",
    pestsAndDiseases: "",
  });

  const notify = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8080/${type}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          notifyB(data.message);
        }
        console.log(data);
      });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700">Type</label>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-2 p-3 block w-full border-gray rounded-md shadow-sm"
        >
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>

      {Object.keys(formData).map((key) => (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="block text-gray-700 capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="mt-2 p-4 bg-white border  max-w-[500px] input-box-shadow rounded-md w-full focus:outline-none focus:border-green-500"
          />
        </div>
      ))}

      <div>
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="mt-4 bg-[#20b486] text-white rounded hover:bg-[#20b43c] py-2 px-4 "
        />
      </div>
    </div>
  );
};

export default AddPlant;
