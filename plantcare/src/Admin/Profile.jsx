
import React from "react";

const Profile = () => {
  const data = JSON.parse(localStorage.getItem("Garden")).savedUser;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className=" text-white p-6 rounded-lg bg-[#025050] w-full ">
        <h1 className="text-xl font-semibold mb-4">User Details:</h1>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {data.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Country:</span> {data.country}
          </p>
          <p className="mb-2">
            <span className="font-semibold">State:</span> {data.state}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Pincode:</span> {data.pincode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
