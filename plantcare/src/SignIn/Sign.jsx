import React, { useState } from "react";
import { pl021_1, pl027_1 } from "../assest/";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const notify = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg);
    props.handleLogin();
    navigate("/");
  };
  const postData = (event) => {
    fetch("http://localhost:8080/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notify(data.error);
        } else {
          notifyB(data.message);
          localStorage.setItem("jwt",data.token);
          const { savedUser } = data;
          localStorage.setItem("Garden", JSON.stringify(savedUser));
          navigate("/adminpage");
        }
        console.log(data);
      });
  };
  return (
    <div className="w-full min-h-screen md:bg-[#c4d7cf] py-16">
      <div className="bg-white md:max-w-[1280px] mx-auto grid md:gap-y-10 md:grid-cols-2 max-w-[600px] px-4 rounded-3xl shadow-xl">
        <div className="relative flex justify-center items-center">
          <img
            src={pl021_1}
            alt="mage"
            className="absolute inset-0 w-full max-w-[300px] md:max-w-md blur-sm"
          />
          <img
            src={pl027_1}
            alt="mage"
            className="relative z-10 w-full max-w-[300px] md:max-w-md ml-14 py-[50px]"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <h2 className="text-3xl font-semibold mb-5">Let's Get Started.</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-white border max-w-[500px] p-4 input-box-shadow rounded-md"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-white border max-w-[500px] p-4 input-box-shadow rounded-md"
          />
          <input
            type="submit"
            value="Login"
            className="btn-login bg-[#20b486] text-white rounded hover:bg-[#20b43c] px-4 py-2 mt-4 transition-colors duration-300 max-w-[500px]"
            onClick={() => postData()}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
