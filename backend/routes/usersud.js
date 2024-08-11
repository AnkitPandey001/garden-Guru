const express = require("express");
const router = express.Router();

const USER = require("../models/model.js");

router.get("/getUser", async (req, res) => {
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

router.post("/deleteUser", async (req, res) => {
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

module.exports = router;
