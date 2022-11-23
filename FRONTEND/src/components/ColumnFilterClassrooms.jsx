import React from "react";

export const ColumnFilterClassrooms = ({ column }) => {
  const { filterValue, setFilter } = column;
  const onChange = (value) => {
    if (value !== "all") {
      setFilter(value);
    } else {
      setFilter("");
    }
  };
  return (
    <select
      name=''
      id=''
      onChange={(e) => onChange(e.target.value)}
      className='outline-none rounded-md placeholder:text-black bg-white border-blue-search border px-3 py-[1px]'>
      <option value='all'>All</option>

      <option value='tp'>TD</option>
      <option value='td'>TP</option>
      <option value='amphi'>AMPHI</option>
    </select>
  );
};

