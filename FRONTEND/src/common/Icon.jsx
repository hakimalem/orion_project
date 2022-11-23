import React from 'react'

function Icon({path}) {
    console.log('path' , path);
  return (
      <img className='w-5 h-5' src={path} alt="" />
  )
}

export default Icon