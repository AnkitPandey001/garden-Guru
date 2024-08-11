import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "../home/Home";
import SignUp from "../SignUp/SignUp";
import PageNavigation from "../PagesNavigation/PageNavigation";
import PlantDetailsIndoor from "../PlantDetails/PlantDetailsIndoor";
import PlantDetailsOutdoor from "../PlantDetails/PlantDetailsOutdoor";
import Community from "../community/Community";
import Sign from "../SignIn/Sign";
import Admin from "../Admin/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Nav.css";
import { LuLogOut } from "react-icons/lu";
import { IoIosUnlock } from "react-icons/io";
import logo from "../assest/logo.png";
import close from "../assest/close.png";
import more from "../assest/more.png";
import CreateCom from '../ComPost/CreateCom'
import CreatePost from '../ComPost/CreatePost'
const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <div className="w-full h-[80px] bg-white border-b">
          <div className="md:max-w-[1280px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
            <NavLink to="/" className="border-none" end>
              <img alt="" src={logo} className="h-[40px]" />
            </NavLink>
            <div className="hidden md:flex items-center ">
              <ul className="flex gap-10">
                <NavLink to="/" ClassName="active" end>
                  Home
                </NavLink>
                <NavLink to="/plantdetailsindoor" ClassName="active">
                  Indoor Plant
                </NavLink>
                <NavLink to="/plantdetailsoutdoor" ClassName="active">
                  Outdoor Plant
                </NavLink>
              </ul>
            </div>
            <div className="hidden md:flex">
              <button className="flex justify-between items-center  bg-transparent  px-6 gap-2">
                {" "}
                <IoIosUnlock />
                <NavLink to="/signin">SignIn</NavLink>
              </button>
              <button className="px-8 py-3 rounded-md bg-[#20B486] text-white font-bold">
                <NavLink to="/signup">Sign Up for Free</NavLink>
              </button>
            </div>
            <div className="md:hidden" onClick={handleClick}>
              <img alt="" src={toggle ? close : more} />
            </div>
          </div>
          <div
            className={
              toggle
                ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
                : "hidden"
            }
          >
            <ul>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/" ClassName="active" end>
                  Home
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/plantdetailsindoor" ClassName="active">
                  Indoor Plant
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/plantdetailsoutdoor" ClassName="active">
                  Outdoor Plant
                </NavLink>
              </li>
              <div className="flex flex-col my-4 gap-4">
                <button className="border border-[20B486] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4">
                  <IoIosUnlock />
                  <NavLink to="/signin">SignIn</NavLink>
                </button>
                <button className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold">
                  <NavLink to="/signup">Sign Up for Free</NavLink>
                </button>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full h-[80px] bg-white border-b">
          <div className="md:max-w-[1280px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
            <img alt="" src={logo} className="h-[40px]" />
            <div className="hidden md:flex items-center ">
              <ul className="flex gap-8">
                <NavLink to="/" ClassName="active" end>
                  Home
                </NavLink>
                <NavLink to="/plantdetailsindoor" ClassName="active">
                  Indoor Plant
                </NavLink>
                <NavLink to="/plantdetailsoutdoor" ClassName="active">
                  Outdoor Plant
                </NavLink>
                <NavLink to="/community" ClassName="active">
                  {" "}
                  Community
                </NavLink>
                <NavLink to="/adminpage/*" ClassName="active">
                  {" "}
                  Dashboard
                </NavLink>
              </ul>
            </div>
            <div className="hidden md:flex">
              <button className="flex justify-between items-center  bg-transparent  px-6 gap-2">
                <NavLink to="/signin" onClick={handleLogout}>
                  <LuLogOut />
                </NavLink>
              </button>
            </div>
            <div className="md:hidden" onClick={handleClick}>
              <img alt="" src={toggle ? close : more} />
            </div>
          </div>
          <div
            className={
              toggle
                ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
                : "hidden"
            }
          >
            <ul>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/" ClassName="active" end>
                  Home
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/plantdetailsindoor" ClassName="active">
                  Indoor Plant
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/plantdetailsoutdoor" ClassName="active">
                  Outdoor Plant
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/community" ClassName="active">
                  {" "}
                  Community
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/adminpage/*" ClassName="active">
                  {" "}
                  Admin Page
                </NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100"></li>
              <div className="flex flex-col my-4 gap-4">
                <button className="border border-[20B486] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4">
                  <NavLink to="/signin" onClick={handleLogout}>
                    <LuLogOut />
                  </NavLink>
                </button>
              </div>
            </ul>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pagenavigation/:id" element={<PageNavigation />} />
        <Route path="/plantdetailsindoor" element={<PlantDetailsIndoor />} />
        <Route path="/plantdetailsoutdoor" element={<PlantDetailsOutdoor />} />
        <Route path="/community" element={<Community />} />
        <Route path="/signin" element={<Sign handleLogin={handleLogin} />} />
        <Route path="/adminpage/*" element={<Admin />} />
        <Route path="createCom" element={<CreateCom/>}/>
        <Route path="createPost" element={<CreatePost/>}/>
      </Routes>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
};
export default Nav;
