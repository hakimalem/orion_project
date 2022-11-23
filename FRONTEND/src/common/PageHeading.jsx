import React from 'react'

function PageHeading({children}) {
  // console.log('children', children);
  return (
    <h1 className=' lg:w-[584px] md:w-[380px] bg-blue-bg text-center text-blue-botton font-extrabold rounded-lg py-2 px-2 flex justify-center'>{children}</h1>
  )
}

export default PageHeading