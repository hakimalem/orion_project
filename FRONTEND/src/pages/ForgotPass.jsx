import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../images/forgotPassword.svg";

export const ForgotPass = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center w-full mt-16 '>
      <div className='w-1/2 border rounded-3xl shadow-xl shadow-gray-300 p-8'>
        <h2 className='text-[#14279B] text-4xl font-[800] text-center mb-10'>
          Forgot your password ?{" "}
        </h2>
        <p className='text-[#6C63FF] text-center text-xl'>
          Enter your registered email below
          <br /> to receive password reset instruction
        </p>
        <div className='mt-10 ml-72 bg-[#fffcfe] rounded-2xl pl-10 pt-5 pb-5 drop-shadow-xl'>
          <h2 className='text-blue_1 text-xl font-bold'>Email</h2>
          <input
            type='email'
            placeholder='please enter your email'
            className='focus:outline-none border-b border-blue_1  p-2 bg-inherit block'
          />
          <span className='text-blue_1 text-xs'>remembered your password?</span>
          <button
            className='text-blue_1 text-xs font-[800] ml-2'
            onClick={() => navigate("/login")}>
            Log in
          </button>
          <button
            type='button'
            className='p-2 px-12 bg-blue_2 text-white mt-5 ml-20 font-bold rounded-2xl'
            onClick={() => navigate("/checkcode")}>
            Send
          </button>
        </div>
        <ReactLogo className='w-[40%] -mt-36 h-52' />
      </div>
    </div>
  );
};
