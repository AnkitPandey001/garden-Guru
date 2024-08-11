import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Userhome = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/getUser?search=${searchTerm}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch(`http://localhost:8080/deleteUser`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Handle success or error
          alert("User will be deleted");
        });
    }
  };

  return (
    <div className="container md:max-w-[1280px] mx-auto px-4 py-8">
      <div className="text-2xl font-bold mb-4">Welcome Admin</div>
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <span className="absolute right-3 top-3 text-gray-500">
          Total Records: {data.length}
        </span>
      </div>
      <div className="overflow-x-auto rounded-sm">
        <table className="w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-[#025050] text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">User Type</th>
              <th className="py-3 px-6 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.userName}</td>
                <td className="py-3 px-6">{user.userType}</td>
                <td className="py-3 px-6">
                  <MdDelete
                    onClick={() => deleteUser(user._id, user.name)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userhome;
