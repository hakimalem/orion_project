import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../images/changepass.svg";

export const ChangePass = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center w-full mt-16 '>
      <div className='w-1/2 border p-8 rounded-3xl shadow-xl shadow-gray-300'>
        <h2 className='text-[#14279B] text-4xl font-[800] text-center mb-10'>
          Reset your password?
        </h2>
        <p className='text-[#6C63FF] text-center text-xl'>
          your new password must be different <br /> from previous used
          passwords
        </p>
        <div className='mt-10 ml-72 bg-[#fffcfe] rounded-2xl pl-10 pt-5 pb-5 drop-shadow-xl'>
          <h2 className='text-blue_1 text-sm'>New password</h2>
          <input
            type='password'
            placeholder='Please enter your new password '
            className='focus:outline-none border-b border-blue_1  p-2 bg-inherit block text-xs'
          />
          <h2 className='text-blue_1 text-sm mt-3 '>Confirm password</h2>
          <input
            type='password'
            placeholder='Please confirm your password '
            className='focus:outline-none border-b border-blue_1  p-2 bg-inherit block text-xs'
          />
          <button
            type='button'
            className='p-2 px-12 bg-blue_2 text-white mt-5 ml-20 font-bold rounded-2xl'
            onClick={() => navigate("/")}>
            Send
          </button>
        </div>
        <ReactLogo className='w-[40%] -mt-36 h-52' />
      </div>
    </div>
  );
};
