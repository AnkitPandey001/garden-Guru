const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongoUrl } = require("./key.js");
const cors = require("cors");
const USER = require("./models/model.js");
const fs = require("fs");
const bodyParser = require("body-parser"); // Add this line


app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/comm.js"));

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("server connected to mongoose");
});

mongoose.connection.on("error", () => {
  console.log("server not connected to mongoose");
});

//! get all user in data base
app.get("/getUser", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { name: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ],
    };
  }
  try {
    const allUser = await USER.find(query);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log("error in get user", error);
  }
});

//! delete data from database
app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    const result = await USER.deleteOne({ _id: userid });
    if (result.deletedCount === 0) {
      res.status(404).json({ status: "error", message: "User not found" });
    } else {
      res
        .status(200)
        .json({ status: "ok", message: "User deleted successfully" });
    }
  } catch (error) {
    console.log("error in delete user", error);
    res.status(500).json({ status: "error", message: "Error deleting user" });
  }
});

//! get indoor data

app.get("/indoor", (req, res) => {
  const inData = JSON.parse(fs.readFileSync("./data/indoor.json", "utf-8"));
  res.json(inData);
});

//! get outdoor data
app.get("/outdoor", (req, res) => {
  const inData = JSON.parse(fs.readFileSync("./data/outdoor.json", "utf-8"));
  res.json(inData);
});

//! updating indoor data------------
app.post("/indoor", (req, res) => {
  const newData = req.body;

  const indoorData = JSON.parse(fs.readFileSync("./data/indoor.json", "utf-8"));
  const newId =
    indoorData.length > 0 ? indoorData[indoorData.length - 1].id + 1 : 1;

  const formattedData = {
    id: newId,
    commonName: newData.commonName,
    scientificName: newData.scientificName,
    description: newData.description,
    careRequirements: {
      light: newData.light,
      watering: newData.watering,
      temperature: newData.temperature,
      humidity: newData.humidity,
      soil: newData.soil,
      fertilization: newData.fertilization,
      pruning: newData.pruning,
      propagation: newData.propagation,
      growingZones: newData.growingZones,
      nativeHabitat: newData.nativeHabitat,
      uses: newData.uses,
      toxicity: newData.toxicity,
      pestsAndDiseases: newData.pestsAndDiseases,
    },
  };

  indoorData.push(formattedData);

  fs.writeFileSync("./data/indoor.json", JSON.stringify(indoorData, null, 2));

  res.json({ message: "Data added successfully", data: formattedData });
});

//! ----------updating oudoor data--------------------------
app.post("/outdoor", (req, res) => {
  const newData = req.body;

  const outDoorData = JSON.parse(
    fs.readFileSync("./data/outdoor.json", "utf-8")
  );
  const newId =
    outDoorData.length > 0 ? outDoorData[outDoorData.length - 1].id + 1 : 1;

  const formattedData = {
    id: newId,
    commonName: newData.commonName,
    scientificName: newData.scientificName,
    description: newData.description,
    careRequirements: {
      light: newData.light,
      watering: newData.watering,
      temperature: newData.temperature,
      humidity: newData.humidity,
      soil: newData.soil,
      fertilization: newData.fertilization,
      pruning: newData.pruning,
      propagation: newData.propagation,
      growingZones: newData.growingZones,
      nativeHabitat: newData.nativeHabitat,
      uses: newData.uses,
      toxicity: newData.toxicity,
      pestsAndDiseases: newData.pestsAndDiseases,
    },
  };

  outDoorData.push(formattedData);

  fs.writeFileSync("./data/outdoor.json", JSON.stringify(outDoorData, null, 2));

  res.json({ message: "Data added successfully", data: formattedData });
});

//! surving the frontend 

app.listen(8080, () => {
  console.log("server started");
});
