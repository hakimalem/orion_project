import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import { BiLockAlt, BiShow, BiHide } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import axios from "axios";
import { notifyExist } from "../utils/notifications";

export const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(username, password);
    // if (username && password) {
    //   setUser({ username, password });
    //   navigate("/Dashboard");
    // }
    axios.post("http://127.0.0.1:8000/api/token/",{username: username, password : password}).then(res => {
      console.log(res.data);
    }).catch(ex => {
      console.log(ex);
      notifyExist(ex.response.data.detail)
    });
  };

  return (
    <div className="flex justify-center mt-10 ">
      <ToastContainer></ToastContainer>
      <div className="flex justify-between w-[60%] rounded-[33px] shadow-xl shadow-gray-300">
        <div className=' flex bg-[url("./images/login.svg")] w-[45%] top-0 left-0  bg-no-repeat bg-contain'>
          <h1 className="text-white font-[800] text-[50px] leading-[111.5%] p-8 mt-8">
            Welcome <br /> Back !
          </h1>
        </div>
        <div className="w-[55%] mt-32">
          <form onSubmit={submitHandler}>
            <h2 className="text-blue_2 uppercase font-[800] text-3xl">
              log in
            </h2>{" "}
            <div className="flex flex-col mt-16">
              <label htmlFor="adress" className="text-blue_1">
                Email Adress
              </label>
              <div>
                <GoMail className="absolute mt-3 text-blue_1" />
                <input
                  type="email"
                  // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                  required
                  id="adress"
                  placeholder="please enter your email address"
                  className="focus:outline-none border-b border-blue_1 w-2/3 p-2 pl-8"
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mt-10">
              <label htmlFor="pass" className="text-blue_1">
                Password
              </label>
              <div>
                <BiLockAlt className="absolute mt-3 text-blue_1" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="pass"
                  placeholder="please enter your password"
                  className="focus:outline-none border-b border-blue_1 w-2/3 p-2 pl-8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="text-blue_1 ml-72 -translate-y-6 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </div>
              </div>
            </div>
            <button
              className="text-blue_1 ml-32 mt-2"
              type="button"
              onClick={() => navigate("/forgotpassword")}
            >
              forgot your password ?
            </button>
            <button
              type="submit"
              className="p-2 px-12 bg-blue_2 text-white ml-[25%] mt-20 -translate-y-8 font-bold rounded-2xl"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
