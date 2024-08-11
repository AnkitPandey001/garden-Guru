

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

const Community = () => {
  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://garden-guru-tau.vercel.app/mycommunities", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));

    fetch("https://garden-guru-tau.vercel.app/allcommunities")
      .then((response) => response.json())
      .then((data) => setAllData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleMoved = () => {
    navigate("/createPost");
  };

  const handleCreatePost = (id) => {
    localStorage.setItem("communityId", id);
    navigate("/createCom");
  };

  const handleClose = () => {
    setShowComment(false);
  };

  useEffect(() => {
    if (data.myCommunities && data.myCommunities.length > 0) {
      setSelectedCommunity(data.myCommunities[0]);
    }
  }, [data.myCommunities]);

  return (
    <div className="md:max-w-[1280px] mx-auto flex flex-col md:flex-row justify-center py-8">
      <div className="w-full md:w-1/4 pr-8 mb-8 md:mb-0">
        <div className="text-2xl font-semibold mb-4">Communities</div>
        {data.myCommunities && data.myCommunities.length > 0 ? (
          <div className="mb-4">
            <div className="text-lg font-semibold mb-2">My Community</div>
            {data.myCommunities.map((ele, index) => {
              const firstChar = ele.postedBy.name.charAt(0);
              return (
                <div
                  className="cursor-pointer bg-white rounded-lg shadow-md py-2 px-4 mb-2"
                  onClick={() => setSelectedCommunity(ele)}
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-300 w-10 h-10 flex justify-center items-center rounded-full mr-3">
                      {firstChar}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {ele.title.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No communities joined or created</p>
        )}
        <div className="text-lg font-semibold mb-2">All Community</div>
        {alldata.allCommunities &&
          alldata.allCommunities.map((ele, index) => {
            const firstChar = ele.postedBy.name.charAt(0);
            return (
              <div
                className="cursor-pointer hover:bg-gray-100 shadow-lg py-2 px-4 rounded-lg mb-2"
                onClick={() => setSelectedCommunity(ele)}
                key={index}
              >
                <div className="flex items-center">
                  <div className="bg-gray-300 w-10 h-10 flex justify-center items-center rounded-full mr-3">
                    {firstChar}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {ele.title.toUpperCase()}
                    </p>
                    <p className="text-gray-600">
                      Created by <br />
                      {ele.postedBy.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="w-full md:w-3/4 pl-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search Community"
              className="border border-gray-300 rounded-lg py-2 px-4 mr-4 shadow-lg w-full md:w-auto"
            />
            <button className="bg-[#20B486] border p-2 shadow-lg rounded-md text-white hover:bg-[#20b43c] transition-colors duration-300">
              Search
            </button>
          </div>
          <div>
            <button
              className="bg-[#20B486] border p-2 shadow-lg rounded-md text-white hover:bg-[#20b43c] transition-colors duration-300"
              onClick={handleMoved}
            >
              Add New Community
            </button>
          </div>
        </div>
        <hr />
        {showComment ? (
          <Comment onClose={handleClose} />
        ) : (
          <div className="py-4">
            {selectedCommunity && (
              <>
                <div>
                  <h1 className="text-3xl font-semibold mb-4">
                    {selectedCommunity.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {selectedCommunity.desc}
                  </p>
                  <h2>
                    Community Created by: {selectedCommunity.postedBy.name}
                  </h2>
                  <br />
                  <button
                    className="bg-[#20B486] text-white py-2 px-4 rounded-lg mb-4"
                    onClick={() => handleCreatePost(selectedCommunity._id)}
                  >
                    Create Post
                  </button>
                </div>
                <h2 className="text-lg font-semibold mb-2">Top Posts</h2>
                <div>
                  {selectedCommunity.posts &&
                  selectedCommunity.posts.length > 0 ? (
                    selectedCommunity.posts.map((post, index) => (
                      <div
                        key={index}
                        className="mb-6 border border-gray-200 rounded-lg p-4"
                      >
                         <h3 className="text-xl font-semibold mb-2 p-2">
                             {post.postedBy.name}
                            </h3>
                        <h3 className="text-xl font-semibold mb-2 p-2">
                          {post.title}
                        </h3>
                        <img
                          src={post.image}
                          alt=""
                          className="mb-2 rounded-lg p-2 w-full"
                        />
                        <p className="text-gray-600 mb-2 p-2">{post.desc}</p>
                        <div className="flex items-center">
                          <input
                            type="text"
                            placeholder="Enter Your Comment"
                            className="border border-gray-300 rounded-lg py-2 px-4 mr-4 w-full md:w-auto"
                          />
                          <button className="bg-[#20B486] text-white py-2 px-4 rounded-lg mr-4">
                            Post
                          </button>
                          <button
                            className="bg-[#20B486] text-white py-2 px-4 rounded-lg"
                            onClick={() => setShowComment(true)}
                          >
                            View Comments
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No posts available</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
