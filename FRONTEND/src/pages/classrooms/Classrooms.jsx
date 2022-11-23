import React, { useState, useRef, useEffect, useMemo } from "react";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import search from "../roles/search.svg";
import Popup from "reactjs-popup";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import delet from "../../images/delete.svg";
import edit from "../../images/edit.svg";
import timetab from "../../images/timetab.svg";
import { GlobalFilter } from "../../components/GlobalFilter";
import {
  usePagination,
  useTable,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { ColumnFilter } from "../../components/ColumnFilter";
import axios from "axios";
import { ColumnFilterClassrooms } from "../../components/ColumnFilterClassrooms.jsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { notifyDelete } from "../../utils/notifications";
import { Scheduler } from "../../components/SchedulerClassrooms";

function Classrooms() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useOutletContext();
  const [roles, setRoles] = useState([]);
  const [classrooms, setClassrooms] = useState([]); // staff list goes here

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

    axios
      .get("http://127.0.0.1:8000/classroom/")
      .then((res) => {
        console.log("res", res.data);
        setClassrooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const classTableData = classrooms.map((classroom) => {
    return {
      ...classroom,
      cycle: classroom.cycle === 1 ? "Preparatory" : "Engineering",
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
                      handleDelete(classroom.id);
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
        Header: "Classroom Name",
        accessor: "classroom_name",
        Filter: ColumnFilterClassrooms,
        disableFilters: true,
      },
      {
        Header: "Classroom type",
        accessor: "type",
        Filter: ColumnFilterClassrooms,
      },
      {
        Header: "Cycle",
        accessor: "cycle",
        Filter: ColumnFilterClassrooms,
        disableFilters: true,
      },
      {
        Header: "Max capacity",
        accessor: "Capacity",
        Filter: ColumnFilterClassrooms,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "edit",
        Filter: ColumnFilterClassrooms,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "timetab",
        Filter: ColumnFilterClassrooms,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "delet",
        Filter: ColumnFilterClassrooms,
        disableFilters: true,
      },
    ],
    []
  );

  const data = useMemo(() => classTableData, [classrooms]);

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
      if (isVisible.classrooms === false) {
      }
    }
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible({ ...isVisible, classrooms: true });
  };

  function handleEdit(id) {
    console.log(id);
    setIsVisible({ ...isVisible, classrooms: true });
    navigate(`${id}`);
  }

  function handleDelete(id) {
    // console.log(id);
    // const copy = classrooms.filter((staff) => staff.id !== id);
    // console.log(copy);
    // setClassrooms(copy);
    // console.log("staff list ", classrooms);

    const original = classrooms;

    try {
      axios.delete(`http://127.0.0.1:8000/classroom/${id}/`).then((res) => {
        const copy = classrooms.filter((classroom) => classroom.id !== id);
        notifyDelete("classroom");
        setClassrooms(copy);
      });
    } catch (ex) {
      classrooms(original);
      console.log(ex);
    }

    // post the changes to the DB
  }
  // const navigat = useNavigate();
  const onClick = (id, name) => {
    if (name === "delet") {
      console.log("delete", id);
      // handleDelete(id);
    }
    if (name === "edit") {
      handleEdit(id);
    }
    if (name === "timetab") {
      window.open(`/schedulerclass/${id}`, "_blank");
    }
  };

  useEffect(() => {});
  return (
    <div className='flex justify-center items-center w-full bg-background h-[86%] p-10'>
      <ToastContainer></ToastContainer>
      <div className='border-gray-400  w-full min-h-full  rounded-lg  justify-center items-center'>
        {!isVisible.classrooms && (
          <>
            <div className='main-top flex justify-around mt-3'>
              <PageHeading>Classrooms</PageHeading>
              <AddButton onClick={handleClick} to='/classrooms/new'>
                +add new classroom
              </AddButton>
            </div>
            <div className='flex justify-between mt-12'>
              <div className='select ml-4'>
                <label htmlFor='seleced-role'>Show : </label>
                {headerGroups.map((headerGroup) =>
                  headerGroup.headers.map((column) => (
                    <> {column.canFilter && column.render("Filter")}</>
                  ))
                )}
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
                          className=' p-2 bg-[#A9F7F5] text-center px-0 '>
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
                        className='hover:bg-[#efefef] border even:bg-[#FCF3FA] text-center'
                        {...row.getRowProps}>
                        {row.cells.map((cell) => (
                          <td
                            onClick={() => {
                              onClick(row.original.id, cell.column.id);
                              // console.log(cell.column.id);
                            }}
                            className='p-1 text-center	border-[#ddd]'
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

export default Classrooms;
