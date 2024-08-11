
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { p6, p7 } from '../assest/';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [userType, setuserType] = useState("");
  const [SecretKey, setSecretKey] = useState("");

  const navigate = useNavigate();
  const notify = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg);
  };

  const postData = () => {
    if (userType === "admin" && SecretKey !== "garden") {
      alert("Invalid Admin");
    } else {
      fetch("http://localhost:8080/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          userName: username,
          password: password,
          country: country,
          state: state,
          pincode: pincode,
          userType: userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notify(data.error);
          } else {
            notifyB(data.message);
            navigate("/signin");
          }
          console.log(data);
        });
    }
  };

  return (
    <div className='w-full min-h-screen md:bg-[#c4d7cf] py-16 flex justify-center items-center'>
      <div className='bg-white md:max-w-[1280px] px-6 py-8 rounded-3xl shadow-xl'>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative flex justify-center items-center">
            <img src={p6} alt='mage' className='absolute inset-0 w-full max-w-[300px] md:max-w-md blur-sm' /> 
            <img src={p7} alt='mage' className='relative z-10 w-full max-w-[300px] md:max-w-md ml-14 py-[50px]' />
          </div>
          <div className='flex flex-col justify-center'>
            <h2 className='text-3xl font-semibold mb-5'>Let's Get Started.</h2>
            <div className="flex items-center mb-4">
              <p className="mr-4">Register here:</p>
              <input type="radio" name="userType" value="admin" checked={userType === "admin"} onChange={(e) => setuserType(e.target.value)} /> 
              <span className="mr-4">Admin</span>
              <input type="radio" name="userType" value="user" checked={userType === "user"} onChange={(e) => setuserType(e.target.value)} /> 
              <span>User</span>
            </div>
            {userType === "admin" && (
              <div className="mb-4">
                <label className="block mb-1">Secret Key</label>
                <input type="text" placeholder="Secret Key" name="SecretKey" id="SecretKey" value={SecretKey} onChange={(e) => setSecretKey(e.target.value)} className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md mb-4"/>
              </div>
            )}
            <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md mb-4" />
        <input type="password" placeholder="Password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md mb-4" />
        <input type="text" placeholder="Full Name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md mb-4" />
        <input type="text" placeholder="Username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-white border max-w-[500px] p-4 input-box-shadow rounded-md mb-4" />
        <div className="flex flex-wrap gap-4 mb-4">
          <input type="text" placeholder="Country" name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="bg-white border max-w-[250px] p-4 input-box-shadow rounded-md flex-1" />
          <input type="text" placeholder="State" name="state" id="state" value={state} onChange={(e) => setState(e.target.value)} className="bg-white border max-w-[250px] p-4 input-box-shadow rounded-md flex-1" />
          <input type="text" placeholder="Pincode" name="pincode" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="bg-white border max-w-[250px] p-4 input-box-shadow rounded-md flex-1" />
        </div>
        <p className='text-sm mb-4'>
          By signing up, you agree to our <br /> terms, privacy policy and cookies policy.
        </p>
        <input type="submit" value="Sign Up" className="btn-login bg-[#20b486] text-white rounded hover:bg-[#20b43c] px-4 py-2 transition-colors duration-300 max-w-[500px]" onClick={() => postData()} />
      </div>
    </div>
  </div>
</div>
  );
};

export default SignUp;
