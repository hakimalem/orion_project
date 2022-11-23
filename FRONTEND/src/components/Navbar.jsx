import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-28 py-5 sticky top-0 z-10 bg-white">
      <div>
        <input
          type="text"
          className="focus:outline-none border border-gray-400 rounded-md py-[6px] px-4 w-[130%] ml-10"
          placeholder="Search ..."
        />
      </div>
      <div className="flex items-end">
        <div className="flex flex-col">
          <span className="mx-auto font-light text-sm">welcome</span>
          <h2 className=" font-bold text-sm">Admin</h2>
        </div>
        <img src="/img/profile_pic.jpg" className="w-12 rounded-full mx-3" />
        
      </div>
    </div>
  );
};
