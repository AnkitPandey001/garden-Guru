import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Suggest from "./Suggest";
import Profile from "./Profile";
import MyPlant from "./MyPlant";
 import AddPlant from "./AddPlant"
import Userhome from "./Userhome";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" replace />} />
      <Route path="suggest" element={<Suggest />} />
      <Route path="profile" element={<Profile />} />
      <Route path="myplant" element={<MyPlant />} />
      <Route path="userhome" element={<Userhome />} />
      <Route path="addplant" element={<AddPlant/>}/>
    </Routes>
  );
};

export default AdminRoutes;
