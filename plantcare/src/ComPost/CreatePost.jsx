import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const notify = (msg) => {
    toast.error(msg);
  };

  const notifyB = (msg) => {
    toast.success(msg);
  };

  function postData() {
    fetch("http://localhost:8080/createComminty", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: title,
        desc: desc,
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

  return (
    <div className="max-w-[600px] mx-auto my-8 py-6 p-6 bg-white rounded-lg shadow-xl">
      <div>
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
          placeholder="Enter Your Community Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
          placeholder="Write A Caption"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button
          className="bg-[#20B486]  hover:bg-[#20b43c] transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={postData}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
