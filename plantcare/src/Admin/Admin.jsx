
import React, { useState, useEffect } from "react";
// import AdminNav from "./AdminNav";
// import AdminRoutes from "./AdminRoutes";
import RealAdmindash from "./RealAdmindash";
import Profile from "./Profile";
import MyPlant from "./MyPlant";
import Suggest from "./Suggest";
import "./slider.css"

const Admin = () => {
  const data = JSON.parse(localStorage.getItem("Garden")).savedUser.name;
  const firstChar = data.charAt(0).toUpperCase();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Garden"));
    if (data && data.savedUser && data.savedUser.userType === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      {isAdmin ? (
        <RealAdmindash />
      ) : (
        <div className="md:max-w-[1280px] mx-auto py-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:row-span-2 mb-6 lg:mb-0">
            <div className="max-w-full lg:max-w-[300px] h-full mx-auto rounded-lg">
              <div className="bg-[#f9f5f1] flex flex-col justify-center items-center rounded-lg p-8 mb-6 lg:mb-0">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4">
                  <p className="text-gray-800">{firstChar}</p>
                </div>
                <div className="">
                  <p className="text-xl font-semibold">{data}</p>
                </div>
              </div>
              <Profile />
            </div>
          </div>
          <div className="col-span-2 max-w-full lg:max-w-[800px] mb-6 lg:mb-0">
            <MyPlant />
          </div>
          <div className="col-span-2 max-w-full lg:max-w-[800px]">
            <div className="p-4 rounded-lg">
              <Suggest />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;

