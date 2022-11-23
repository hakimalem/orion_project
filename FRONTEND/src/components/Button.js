import React from "react";

export const Button = ({ children, type, onClick }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick || null}
      className='p-2 px-12 bg-blue_2 text-white  font-bold rounded-2xl'>
      {children}
    </button>
  );
};
