import React, { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import search from "./search.svg";
import delet from "../../images/delete.svg";
import edit from "../../images/edit.svg";
import { useTable } from "react-table";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyDelete } from "../../utils/notifications";

function Roles({ match }) {
  const [roles, setRoles] = useState([]);
  const [isvisible, setIsVisibel] = useOutletContext();
  const isInitialMount = useRef(true);
  const navigate = useNavigate();


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
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isvisible.roles === false) {
      }
    }
  }, [isvisible]);

  function handleEdit(id) {
    console.log(id);
    setIsVisibel({ ...isvisible, roles: true });
    navigate(`${id}`);

    //redirct to modify role form and post the change to the DB
  }
  

  const onClick = (id, name) => {
    if (name === "delet") {
      // handleDelete(id)
    };
    if (name === "edit") {
      
      handleEdit(id)};
    };

  

  function handleDelete(id) {
    // console.log(id);

    const original = roles;

    try {
      axios.delete(`http://127.0.0.1:8000/role/${id}/`).then((res) => {
        const copy = roles.filter((role) => role.id !== id);
        notifyDelete("Role");
        setRoles(copy);
      });
    } catch (ex) {
      setRoles(original);
      console.log(ex);
    }
    
    // console.log(copy);
    // post the changes to the DB
  }
  const handleClick = () => {
    setIsVisibel({ ...isvisible, roles: true });
  };
  

  const data = roles.map((r) => {
    return {
      ...r,

      // role: <input type='text' value={r.role} />,
      edit: <img src={edit} />,
      delet: (
        <Popup trigger={<img src={delet} />} modal nested overlayStyle>
          {(close) => (
            <div className="p-2 ">
              <div className="flex justify-end">
                <button
                  className="close text-gray-500 font-bold text-lg flex "
                  onClick={close}
                >
                  X
                </button>
              </div>
              <div className="header text-xl font-bold flex justify-center">
                You are about to delete a role{" "}
              </div>
              <div className="content my-5 py-4 flex flex-col items-center text-stone-600 text-sm font-bold ">
                <span>this will delete the role from the roles list </span>
                <span>are you sure ? </span>
              </div>
              <div className="actions flex justify-end">
                <div>
                  <button
                    className="button font-bold border border-gray-300  rounded-lg px-3 py-2 my-3"
                    onClick={() => {
                      console.log("cancel");
                      close();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="button font-bold bg-red-500 text-white rounded-lg px-3 py-2 my-3 ml-3"
                    onClick={() => {
                      console.log("yes delete ");
                      handleDelete(r.id);
                      close();
                    }}
                  >
                    Yes delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      ),
    };
  });
  const columns = useMemo(
    () => [
      { Header: "Role", accessor: "roleName" },
      { Header: "", accessor: "edit" },
      { Header: "", accessor: "delet" },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });


  
  return (
    <div className="flex justify-center items-center w-full bg-background h-[86%] p-10">
      {/* <div className="bg-black text-white" onClick={notifyDelete}>
        toastify
      </div> */}
      <ToastContainer></ToastContainer>
      {/* <PopupExample></PopupExample> */}
      <div className="border-gray-400  w-full min-h-full  rounded-lg  justify-center items-center">
        {!isvisible.roles && (
          <>
            <div className="main-top flex justify-around mt-3">
              <PageHeading>Roles</PageHeading>
              <AddButton onClick={handleClick} to="/roles/new">
                +add new role
              </AddButton>
            </div>

            <div className="flex justify-between mt-12">
              <div className="select ml-4">
                <label htmlFor="seleced-role">Show : </label>
                <select
                  className="outline-none rounded-md placeholder:text-black bg-white border-blue-search border px-3 py-[1px]"
                  name="roles"
                  id="seleced-role"
                >
                  {[{ _id: 0, role: "ALL" }, ...roles].map((role) => (
                    <option key={role.id} value={role.roleName}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>

              <form action="" method="post">
                <div className="search-input flex border-blue-search border rounded-md  h-8 self-center px-6 py-[1px] mr-12">
                  <label htmlFor="search"></label>
                  <input
                    className="outline-none rounded-md placeholder:text-black w-32 lg:w-36"
                    type="text"
                    id="search"
                    placeholder="Search..."
                  />
                  <span className="w-5 self-center">
                    <img src={search} alt="" />
                  </span>
                </div>
              </form>
            </div>

            <div className="flex justify-center mt-24">
              <table className="w-[500px] text-center" {...getTableProps()}>
                <thead className="bg-[#A9F7F5]">
                  {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          key={index}
                          // colSpan={`${column.Header === "Action" ? 2 : 1} `}

                          {...column.getHeaderProps()}
                          className="bg-[#A9F7F5]"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr
                        key={index}
                        className="hover:bg-[#ddd] even:bg-row_table_bg"
                        {...row.getRowProps}
                      >
                        {row.cells.map((cell, index) => (
                          <td
                            key={index}
                            onClick={() => {
                              onClick(row.original.id, cell.column.id);
                              // console.log(cell.column.id);
                            }}
                            className={`${
                              cell.column.id == "delet" ||
                              cell.column.id == "edit"
                                ? "hover:bg-gray-400 w-16 cursor-pointer flex-inline justify-center "
                                : ""
                            } p-2 border border-[#ddd] text-center `}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="text-gray-700 mt-16 ml-6">
              Results :{" "}
              <span className="bg-[#CCC] px-4 rounded-lg font-extrabold">
                3
              </span>{" "}
              Of {`${roles.length}`}
            </div>
          </>
        )}
        <Outlet context={[isvisible, setIsVisibel]} />
      </div>
    </div>
  );
}

export default Roles;

// <td
//                           onClick={handleModify}
//                           className='w-6 py-2 cursor-pointer border hover:bg-gray-200'>
//                           <img className='mx-auto' src={edit} alt='' />
//                         </td>
//                         <td
//                           // data-remove={}
//                           onClick={() => handleDelete(row.original._id)}
//                           className='w-6 py-2 cursor-pointer border hover:bg-gray-200'>
//                           <img className='mx-auto' src={delet} alt='' />
//                         </td>
