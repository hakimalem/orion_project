import React from 'react'
import { Link } from 'react-router-dom'
// import eye from '../staffList/Eye.svg';


function AddButton({children, icon, onClick, to}) {
  return (
    
    
      <Link
        onClick={onClick}
        to={to}
        className="py-2 px-4 cursor-pointer text-white bg-[rgb(92,122,234,0.7)] font-extrabold rounded-3xl  self-center"
      >
        {children}
      </Link>
   
  );
}

export default AddButton