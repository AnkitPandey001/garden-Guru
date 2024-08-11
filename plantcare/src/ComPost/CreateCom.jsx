import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateCom = () => {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [communityId, setCommunityId] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
    setImg(event.target.files[0]);
  };

  useEffect(() => {
    setCommunityId(localStorage.getItem("communityId"));
  }, []);

  const notify = (msg) => {
    toast.error(msg);
  };

  const notifyB = (msg) => {
    toast.success(msg);
  };

  useEffect(() => {
    if (url) {
      fetch("http://localhost:8080/addpost", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          pic: url,
          communityId: communityId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notify(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/community");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [communityId, desc, title, url, navigate]);

  const PostPost = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "GardenGurur");
    data.append("cloud_name", "pandeycloud");
    fetch("https://api.cloudinary.com/v1_1/pandeycloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center py-6">
      <div className="w-full md:max-w-[1280px] mx-auto flex">
        <div className="w-1/2 mr-8">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            <div className="create_img">
              <img
                id="output"
                src="https://imgs.search.brave.com/WNbfIJdMRVAzkFO-_d87ZkMhdMCiAYGshQVSr39N0DM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzI5LzY2LzI0/LzM2MF9GXzEyOTY2/MjQyNV9QZlh4dkZO/MVpjYnRpZUNpb1hh/Y00wdWNrQjF2UzRq/aC5qcGc"
                alt="Preview"
                className="img_sel"
              />
            </div>
            <div className="create_img_input">
              <input
                type="file"
                accept="image/*"
                className="input_img"
                onChange={loadFile}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Post Details</h2>
            <div className="create_post_title mb-4">
              <input
                className="text_input border border-gray-300 rounded-lg px-3 py-3 w-full mb-4"
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="create_post_textarea mb-4">
              <textarea
                className="text_com border border-gray-300 rounded-lg px-3 py-3 w-full mb-4"
                type="text"
                placeholder="Write A Caption"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={PostPost}
              className="bg-[#20B486]  hover:bg-[#20b43c] transition-colors duration-300  text-white font-semibold py-2 px-4 rounded-lg"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCom;
