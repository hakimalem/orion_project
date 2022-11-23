import React, { useState, useRef, useEffect, useMemo } from "react";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import search from "../roles/search.svg";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import Popup from "reactjs-popup";
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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getRoles } from "../../fetch/getData";
import { date } from "joi";
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { notifyApprove, notifyDelete, notifyDisapprove, notifyExist, waitToReload } from "../../utils/notifications";
import { DateTime } from "luxon";

function Request() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useOutletContext();
  const [roles, setRoles] = useState([]);
  const [requests, setRequests] = useState([]); // request list goes here
  


  //cdm (useEffect) is used here to set roles and requests.
  useEffect(() => {
    //setting roles here
    getRoles(setRoles);

    //setting requests here
    axios
      .get("http://127.0.0.1:8000/adminreqlist/")
      .then((res) => {
        setRequests(res.data);
        console.log(requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const requestTableData = requests.map((request) => {
    return {
      ...request,
      // uname: (
      //   <div className='flex justify-start items-center '>
      //     <img src={request.ppic} className='w-[50px] mr-3 rounded-full' />{" "}
      //     <p>{request.uname}</p>
      //   </div>
      // ),
      cycle: request.cycle === 1 ? "CP" : "CS",
      start: new Date(request.start).toLocaleString("en-US", {
        hourCycle: "h23",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      end: new Date(request.end).toLocaleString("en-US", {
        timeZone: "Europe/Paris",
        hourCycle: "h23",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),

      approve: (
        <BsCheckCircle className="text-green-600 text-2xl cursor-pointer" />
      ),
      disapprove: (
        <BsXCircle className="text-red-600 text-2xl cursor-pointer " />
      ),
      delet: (
        <Popup
          trigger={
            <img src={delet} className="cursor-pointer p-2 hover:bg-gray-200" />
          }
          modal
          nested
          overlayStyle
        >
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
                      

                      handleDelete(request.id);
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
      edit: <img src={edit} className="cursor-pointer p-2 hover:bg-gray-200" />,
      ppic: <img src={request.ppic} className="w-[50px] m-auto rounded-full" />,
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
        accessor: "requester",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      { Header: "Role", accessor: "staffrole", Filter: ColumnFilter },
      {
        Header: "Classroom",
        accessor: "Classrooms",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Cycle",
        accessor: "cycle",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      // {
      //   Header: "Date",
      //   accessor: "date",
      //   Filter: ColumnFilter,
      //   disableFilters: true,
      // },
      {
        Header: "Start time",
        accessor: "start",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "End time",
        accessor: "end",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "approve",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "disapprove",
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
        accessor: "delet",
        Filter: ColumnFilter,
        disableFilters: true,
      },
    ],
    []
  );

  const data = useMemo(() => requestTableData, [requests]);

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
      if (isVisible.request === false) {
      }
    }
  }, [isVisible]);

  const handleClick = () => {
    setIsVisible({ ...isVisible, request: true });
  };

  function handleDelete(id) {
    console.log(id);

    const original = requests;

    try {
      axios
        .delete(`http://127.0.0.1:8000/request/modify/${id}/`)
        .then((res) => {
          const copy = requests.filter((request) => request.id !== id);
          notifyDelete("request");
          setRequests(copy);
        });
    } catch (ex) {
      setRequests(original);
      console.log(ex);
    }
    // post the changes to the DB
  }

  function handleEdit(id) {
    console.log(id);
    navigate(`modify/${id}`);
    setIsVisible({ ...isVisible, request: true });
  }

  function handleDisapprove(id) {
    axios.patch(`http://127.0.0.1:8000/approve/${id}/`, {status : "Desapproved"}).then(async (res) => {
      notifyDisapprove();
      await waitToReload("request",isVisible,setIsVisible)
    }).catch(ex => {
      notifyExist(ex.response.data[0])
    });
  }

  function handleApprove(id) {
    console.log('approving');
    axios
      .patch(`http://127.0.0.1:8000/approve/${id}/`, { status: "Approved" })
      .then(async (res) => {
        notifyApprove();
        await waitToReload("request",isVisible,setIsVisible)
        // window.location.reload();
      }).catch(ex => {
        console.log("exception", ex);
      notifyExist(ex.response.data[0])
    });;
  }

  const onClick = (id, name) => {
    console.log('id ',id);
    if (name === "delet") {
      // handleDelete(id);
      console.log('id ref', id);
    }
    if (name === "edit") {
      handleEdit(id);
    }
    if (name === "approve") {
      handleApprove(id);
      // setRequests([
      //   ...requests,
      //   { ...requests.find((e) => e.id === id), status: "Approved" },
      // ]);
      const updated = requests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "Approved",
            }
          : request
      );
      setRequests(updated);
    }
    
    if (name === "disapprove") {
      handleDisapprove(id);
      const updated = requests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: "Disapproved",
            }
          : request
      );
      setRequests(updated);
    }
  };

  useEffect(() => {});
  return (
    <div className="flex justify-center items-center w-full bg-background h-[86%] p-10">
      <ToastContainer></ToastContainer>
      <div className="border-gray-400  w-full min-h-full  rounded-lg  justify-center items-center">
        {!isVisible.request && (
          <>
            <div className="main-top flex justify-around mt-3">
              <PageHeading>Requests</PageHeading>
              <AddButton onClick={handleClick} to="/request/new">
                make new request
              </AddButton>
            </div>
            <div className="flex justify-between mt-12">
              <div className="select ml-4">
                <label htmlFor="seleced-role">Show : </label>
                {headerGroups.map((headerGroup) =>
                  headerGroup.headers.map((column) => (
                    <> {column.canFilter && column.render("Filter")}</>
                  ))
                )}
              </div>

              <form action="" method="post">
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />
              </form>
            </div>
            {requests.length ? (
              <>
                {" "}
                <div className="flex justify-center mt-10">
                  <table
                    className="border-collapse w-full"
                    {...getTableProps()}
                  >
                    <thead className="">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              {...column.getHeaderProps()}
                              className=" p-2  bg-white text-center"
                            >
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
                            className="hover:bg-[#efefef] border-b text-center even:bg-[#fafafa]"
                            {...row.getRowProps}
                          >
                            {row.cells.map((cell) => (
                              <td
                                onClick={() => {
                                  onClick(row.original.id, cell.column.id);
                                  // console.log(cell.column.id);
                                }}
                                className="p-1 text-center border-[#ddd]"
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

                  {/* table goes here  */}
                </div>
                <div className="text-gray-700 mt-8 ml-6">
                  Results :{" "}
                  <span className="bg-[#CCC] px-4 rounded-lg font-extrabold">
                    {pageIndex + 1}
                  </span>{" "}
                  Of {pageOptions.length}
                  <p className="inline mx-3">go to page : </p>
                  <input
                    className="w-10 mr- h-6 focus:outline-none border rounded-sm "
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(pageNumber);
                    }}
                  />
                  <select
                    className="h-6 focus:outline-none"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
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
                    disabled={!canPreviousPage}
                  >
                    <IoIosArrowBack />
                  </button>
                  <button
                    className={`${
                      !canNextPage
                        ? "bg-gray-200 border ml-2 rounded-full px-2"
                        : "border ml-2 rounded-full px-2"
                    }`}
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </>
            ) : <div className="flex justify-center mt-24"> there are now requests for now</div>}
          </>
        )}
        <Outlet context={[isVisible, setIsVisible]}></Outlet>
      </div>
    </div>
  );
}

export default Request;
