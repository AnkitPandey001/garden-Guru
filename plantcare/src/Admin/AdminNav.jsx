// import React from "react";
// import { NavLink } from "react-router-dom";
// import './Admin.css'

// const AdminNav = () => {
//   return (
//     <div className="Admin_nav">
//        <NavLink to="/adminpage/profile" className="Admin_Link">Profile</NavLink>
//        <NavLink to="/adminpage/suggest" className="Admin_Link">Suggestion</NavLink>
//       <NavLink to="/adminpage/compost" className="Admin_Link">Community Post</NavLink>
//       <NavLink to="/adminpage/myplant" className="Admin_Link">My Collection</NavLink>
   
//     </div>
//   );
// };

// export default AdminNav;


import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="flex flex-col bg-[#025050] p-12 rounded-lg">
      <NavLink
        to="/adminpage/profile"
        className="text-gray-300 hover:text-white py-7"
        activeClassName="text-white"
      >
        Profile
      </NavLink>
      <NavLink
        to="/adminpage/suggest"
        className="text-gray-300 hover:text-white py-7"
        activeClassName="text-white"
      >
        Suggestion
      </NavLink>
      <NavLink
        to="/adminpage/compost"
        className="text-gray-300 hover:text-white py-7"
        activeClassName="text-white"
      >
        Community Post
      </NavLink>
      <NavLink
        to="/adminpage/myplant"
        className="text-gray-300 hover:text-white py-7"
        activeClassName="text-white"
      >
        My Collection
      </NavLink>
    </div>
  );
};

export default AdminNav;
