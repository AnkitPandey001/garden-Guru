import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div className="md:max-w-[1280px] mx-auto py-6">
      <div className="flex justify-around">
        <NavLink
          to="/adminpage/userhome"
          className="list-group-item list-group-item-action mr-4"
          activeClassName="bg-gray-200"
        >
          See Users
        </NavLink>
        <NavLink
          to="/adminpage/addplant"
          className="list-group-item list-group-item-action"
          activeClassName="bg-gray-200" 
        >
          Add Plant
        </NavLink>
      </div>
    </div>
  );
};

export default Adminmenu;
