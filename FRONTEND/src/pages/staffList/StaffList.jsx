import React, { useState, useRef, useEffect, useMemo } from "react";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import search from "../roles/search.svg";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import delet from "../../images/delete.svg";
import edit from "../../images/edit.svg";
import timetab from "../../images/timetab.svg";
import { GlobalFilter } from "../../components/GlobalFilter";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  usePagination,
  useTable,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { ColumnFilter } from "../../components/ColumnFilter";
import axios from "axios";
import { getRoles } from "../../fetch/getData";
import { ToastContainer } from "react-toastify";
import { notifyDelete } from "../../utils/notifications";

function StaffList() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [staffList, setStaffList] = useState([]); // staff list goes here
  const [isVisible, setIsVisible] = useOutletContext(); //visibility

  //fetching the data (roles for filter)
  useEffect(() => {
    getRoles(setRoles);

    axios
      .get("http://127.0.0.1:8000/staff/")
      .then((res) => {
        setStaffList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const staffData = staffList.map((staff) => {
    console.log("staff", staff);
    return {
      ...staff,
      // uname: (
      //   <div className='flex justify-start items-center '>
      //     <img src={staff.ppic} className='w-[50px] mr-3 rounded-full' />{" "}
      //     <p>{staff.uname}</p>
      //   </div>
      // ),
      ppic: <img src={staff.ppic} className='w-[50px] m-auto rounded-full' />,
      status: (
        <p
          className={`${
            staff.status == "active"
              ? "bg-green-100 text-green-800 py-1 text-lg rounded-lg text-center"
              : "bg-gray-100 text-gray-500 py-1 text-lg rounded-lg text-center"
          }`}>
          {staff.status}
        </p>
      ),
      delet: (
        <Popup
          trigger={
            <img src={delet} className='cursor-pointer p-2 hover:bg-gray-200' />
          }
          modal
          nested
          overlayStyle>
          {(close) => (
            <div className='p-2 '>
              <div className='flex justify-end'>
                <button
                  className='close text-gray-500 font-bold text-lg flex '
                  onClick={close}>
                  X
                </button>
              </div>
              <div className='header text-xl font-bold flex justify-center'>
                You are about to delete a role{" "}
              </div>
              <div className='content my-5 py-4 flex flex-col items-center text-stone-600 text-sm font-bold '>
                <span>this will delete the role from the roles list </span>
                <span>are you sure ? </span>
              </div>
              <div className='actions flex justify-end'>
                <div>
                  <button
                    className='button font-bold border border-gray-300  rounded-lg px-3 py-2 my-3'
                    onClick={() => {
                      console.log("cancel");
                      close();
                    }}>
                    Cancel
                  </button>
                  <button
                    className='button font-bold bg-red-500 text-white rounded-lg px-3 py-2 my-3 ml-3'
                    onClick={() => {
                      console.log("yes delete ");
                      handleDelete(staff.id);
                      close();
                    }}>
                    Yes delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      ),
      edit: <img src={edit} className='cursor-pointer p-2 hover:bg-gray-200' />,
      timetab: (
        <img src={timetab} className='cursor-pointer p-2 hover:bg-gray-200' />
      ),
    };
  });

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "ppic",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Name",
        accessor: "uname",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      { Header: "Role", accessor: "role", Filter: ColumnFilter },
      {
        Header: "Email",
        accessor: "email",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "edit",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "timetab",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "delet",
        Filter: ColumnFilter,
        disableFilters: true,
      },
    ],
    []
  );

  const data = useMemo(() => staffData, [staffList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    pageOptions,
    gotoPage,
    state,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageSize: 4 } },
    useGlobalFilter,

    useFilters,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isVisible.staff === false) {
      }
    }
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible({ ...isVisible, staff: true });
  };

  function handleEdit(id) {
    console.log(id);
    navigate(`/profile/${id}`);
  }

  function handleDelete(id) {
    const original = staffList;

    try {
      axios.delete(`http://127.0.0.1:8000/staff/modify/${id}/`).then((res) => {
        const copy = staffList.filter((staff) => staff.id !== id);
        notifyDelete("staff");
        setStaffList(copy);
      });
    } catch (ex) {
      setStaffList(original);
      console.log(ex);
    }

    // post the changes to the DB
  }
  const onClick = (id, name) => {
    if (name === "delet") {
      // handleDelete(id);
    }
    if (name === "edit") {
      handleEdit(id);
    }
    if (name === "timetab") {
      window.open(`/schedulerstaff/${id}`, "_blank");
    }
  };

  return (
    <div className='flex justify-center items-center w-full bg-background h-[86%] p-10'>
      <ToastContainer></ToastContainer>
      <div className='border-gray-400  w-full min-h-full  rounded-lg  justify-center items-center'>
        {!isVisible.staff && (
          <>
            <div className='main-top flex justify-around mt-3'>
              <PageHeading>Staff list</PageHeading>
              <AddButton onClick={handleClick} to='/staff/new'>
                +add new member
              </AddButton>
            </div>
            <div className='flex justify-between mt-12'>
              <div className='select ml-4'>
                <label htmlFor='seleced-role'>Show : </label>
                {headerGroups.map((headerGroup) => {
                  return headerGroup.headers.map((column) => (
                    <> {column.canFilter && column.render("Filter")}</>
                  ));
                })}
              </div>

              <form action='' method='post'>
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />
              </form>
            </div>
            <div className='flex justify-center mt-10'>
              <table
                className='border-collapse min-w-[70%]'
                {...getTableProps()}>
                <thead className=''>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className=' p-2 bg-white text-center'>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        className='hover:bg-[#efefef] border-b even:bg-[#fafafa]'
                        {...row.getRowProps}>
                        {row.cells.map((cell) => (
                          <td
                            onClick={() => {
                              onClick(row.original.id, cell.column.id);
                              // console.log(cell.column.id);
                            }}
                            className='p-1  border-[#ddd]'
                            {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* table goes here  */}
            </div>
            <div className='text-gray-700 mt-8 ml-6'>
              Results :{" "}
              <span className='bg-[#CCC] px-4 rounded-lg font-extrabold'>
                {pageIndex + 1}
              </span>{" "}
              Of {pageOptions.length}
              <p className='inline mx-3'>go to page : </p>
              <input
                className='w-10 mr- h-6 focus:outline-none border rounded-sm '
                type='number'
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
              <select
                className='h-6 focus:outline-none'
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}>
                {[4, 6, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <button
                className={`${
                  !canPreviousPage
                    ? "bg-gray-200 border mx- ml-5 rounded-full px-2"
                    : "border mx- ml-5 rounded-full px-2"
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                <IoIosArrowBack />
              </button>
              <button
                className={`${
                  !canNextPage
                    ? "bg-gray-200 border ml-2 rounded-full px-2"
                    : "border ml-2 rounded-full px-2"
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}>
                <IoIosArrowForward />
              </button>
            </div>
          </>
        )}
        <Outlet context={[isVisible, setIsVisible]}></Outlet>
      </div>
    </div>
  );
}

export default StaffList;
