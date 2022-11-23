import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../images/chekcPassword.svg";

export const CheckCode = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center w-full mt-16 '>
      <div className='w-1/2 border  p-8 rounded-3xl shadow-xl shadow-gray-300'>
        <h2 className='text-[#14279B] text-4xl font-[800] text-center mb-10'>
          Email has been sent !
        </h2>
        <p className='text-[#6C63FF] text-center text-xl'>
          Please check your inbox and enter <br /> the code that you have been
          sent
        </p>
        <ReactLogo className='w-[40%] ml-96 -mb-96 mt-5 h-52' />
        <div className='mt-52 mr-64 bg-[#fffcfe] rounded-2xl pl-10 pt-5 pb-5 drop-shadow-xl'>
          <h2 className='text-blue_1 text-xl font-bold'>Enter code</h2>
          <input
            type='email'
            maxlength='5'
            size='5'
            placeholder='#####'
            className='focus:outline-none border-b border-blue_1  p-2 bg-inherit block'
          />
          <span className='text-blue_1 text-xs'>Didn’t receive the link?</span>
          <button className='text-blue_1 text-xs font-[800] ml-2'>
            Resend
          </button>
          <button
            type='button'
            className='p-2 px-12 bg-blue_2 text-white mt-5 ml-20 font-bold rounded-2xl'
            onClick={() => navigate("/changepass")}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
