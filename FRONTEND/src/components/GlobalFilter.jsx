import React, { useState } from "react";
import { useAsyncDebounce } from "react-table/dist/react-table.development";
import search from "../pages/roles/search.svg";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(null);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

  return (
    <div className='search-input flex border-blue-search border rounded-md  h-8 self-center px-6 py-[1px] mr-12'>
      <label htmlFor='search'></label>
      <input
        className='outline-none rounded-md placeholder:text-black w-32 lg:w-36'
        type='text'
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        id='search'
        placeholder='Search...'
      />
      <span className='w-5 self-center'>
        <img src={search} alt='' />
      </span>
    </div>
  );
};
