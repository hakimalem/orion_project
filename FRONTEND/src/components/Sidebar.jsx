import React, { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import DashLogo from "../images/sidebarimages/dashboard.svg";
import RolesLogo from "../images/sidebarimages/roles.svg";
import StaffLogo from "../images/sidebarimages/staff.svg";
import ClassLogo from "../images/sidebarimages/classroom.svg";
import RequestLogo from "../images/sidebarimages/request.svg";
import ProfileLogo from "../images/sidebarimages/profile.svg";
import LogoutLogo from "../images/sidebarimages/logout.svg";
import logo from "../images/logoo.jpeg";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

export const Sidebar = ({ isVisible, setIsVisible }) => {
  // const [isVisible, setIsVisible] = useOutletContext();

  const [openSideBar, setOpenSideBar] = useState(true);
  const dataSideBar = [
    { name: "Dashboard", image: DashLogo },
    { name: "Roles", image: RolesLogo },
    { name: "Staff", image: StaffLogo },
    { name: "Classrooms", image: ClassLogo },
    { name: "Request", image: RequestLogo },
    { name: "Profile", image: ProfileLogo },
  ];

  function handleClick(name) {
    setIsVisible({ ...isVisible, [name]: false });
  }
  return (
    <aside
      onMouseEnter={() => setOpenSideBar(true)}
      onMouseLeave={() => setOpenSideBar(false)}
      className={`${
        openSideBar ? "w-64" : "w-[90px]"
      } rounded-md h-screen relative duration-500 shadow-lg shadow-gray-300 sticky z-20 top-0 left-0`}>
      <div className='flex pt-8'>
        <img src={logo} alt='Logo' />
      </div>
      <nav className='p-5 pt-6  relative'>
        {dataSideBar.map(({ name, image }, index) => (
          <NavLink
            onClick={() => handleClick(name.toLowerCase())}
            to={`/${name.toLowerCase()}/`}
            key={index}
            className={({ isActive }) =>
              isActive
                ? `flex  items-center gap-x-3 duration-500 p-2 rounded-md cursor-pointer my-3 bg-[#f5f5f5] text-[#3803C1] before:h-10 before:left-[-5px] before:w-2 before:absolute before:bg-[#3803C1] before:duration-500`
                : `flex  items-center gap-x-3 duration-500 p-2 rounded-md cursor-pointer my-3 hover:bg-[#f5f5f5] hover:text-[#3803C1]  before:h-10 before:left-[-5px] hover:before:w-2 before:absolute before:bg-[#3803C1] before:duration-500`
            }>
            <img
              src={image}
              alt={name}
              className={`${!openSideBar && "ml-[50%] -translate-x-[50%]"}`}
            />
            <span
              className={`${
                !openSideBar && "opacity-0"
              } origin-left duration-100`}>
              {name}
            </span>
          </NavLink>
        ))}
        <div className='border-t border-gray-400 mt-36'>
          <NavLink
            to='/'
            className='flex items-center gap-x-3 duration-100 p-2 rounded-md cursor-pointer my-3 hover:bg-[#f5f5f5] hover:text-[#3803C1]  before:h-10 before:left-[-5px] hover:before:w-2 before:absolute before:bg-[#3803C1] before:duration-500 mt-2 '>
            <img
              src={LogoutLogo}
              alt='Log out'
              className={`${!openSideBar && "ml-[50%] -translate-x-[50%]"}`}
            />
            <span
              className={`${
                !openSideBar && "hidden"
              } origin-left duration-500`}>
              Log out
            </span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};
