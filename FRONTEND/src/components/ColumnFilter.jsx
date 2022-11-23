import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const ColumnFilter = ({ column }) => {
  const [roles, setRoles] = useState([]);
  const { filterValue, setFilter } = column;
  const onChange = (value) => {
    if (value !== "ALL") {
      setFilter(value);
    } else {
      setFilter("");
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/role/")
      .then((res) => {
        setRoles(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <select
      name=''
      id=''
      onChange={(e) => onChange(e.target.value)}
      className='outline-none rounded-md placeholder:text-black bg-white border-blue-search border px-3 py-[1px]'>
      {[{ roleName: "ALL", id: 0 }, ...roles].map((role) => (
        <option key={role.id} value={role.roleName}>
          {role.roleName}
        </option>
      ))}
    </select>
  );
};

/*

<select
                  className='outline-none rounded-md placeholder:text-black bg-white border-blue-search border px-3 py-[1px]'
                  name='roles'
                  id='seleced-role'>
                  {[{ _id: 0, role: "ALL" }, ...roles].map((role) => (
                    <option key={role._id} value={role.role}>
                      {role.role}
                    </option>
                  ))}
                </select>

*/
