import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const SharedLayout = () => {
  const [isVisible, setIsVisible] = useState({
    roles : false,
    staff : false,
    classrooms : false,
    request : false
  })

  

  // function handleIsVisible(page) {
  //   setIsVesible({ ...isVisible, [page]: !isVisible["page"] });
  // }

  return (
    <div className="flex relative">
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="w-full">
        <Navbar />
        <Outlet context={[isVisible, setIsVisible]} />
      </div>
    </div>
  );
};
