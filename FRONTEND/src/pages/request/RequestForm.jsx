import React, { useEffect, useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import request from "./request.svg";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import search from "./search.svg";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import Select from "react-select";
// import AsyncSelect from "react-select/async";
import axios from "axios";
import { fetchClassrooms } from "../../fetch/getData";
import AsyncSelect from "react-select/async";
import {
  notifyAdd,
  notifyExist,
  notifyUpdate,
  waitToReload,
} from "../../utils/notifications";

function RequestForm() {
  const { id: param } = useParams();
  const navigate = useNavigate();
  const [exist, setExist] = useState(false);
  const [isVisible, setIsVisible] = useOutletContext();
  const [requestInfo, setRequestInfo] = useState("");
  const classroomType = [
    { value: "1", label: "TP" },
    { value: "2", label: "TD" },
    { value: "3", label: "Conferance" },
  ];

  //styles of the asyncSelect
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isSelected
        ? "1px solid rgb(56, 3, 193)"
        : "1px solid rgb(56, 3, 193)",

      // color: state.isFocused ? "rgb(56, 3, 193)" : "rgb(56, 3, 193)",
      width: 176,
      borderRadius: 8,
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgb(56, 3, 193)",
      },
      "&:focus": {
        borderColor: "rgb(56, 3, 193)",
      },
    }),
  };

  // get the classroom for the async select component its the filter when we type in the component
  const filterOptions1 = (str, classroom) => {
    return classroom.filter((i) => {
      return i.classroom_name.toLowerCase().includes(str.toLowerCase());
    });
  };
  const fetchClassrooms = async (s) => {
    return axios
      .get("http://127.0.0.1:8000/classroom/")
      .then((res) => {
        const data = res.data;
        return filterOptions1(s, data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  // get the staff for the async select component its the filter when we type in the component
  const filterOptions = (str, staff) => {
    // console.log("string", str);
    return staff.filter((i) => {
      return i.username.toLowerCase().includes(str.toLowerCase());
    });
  };

  const fetchstaff = async (s) => {
    return axios.get("http://127.0.0.1:8000/staff/").then((res) => {
      const data = res.data;
      console.log('fetched ', data);
      return filterOptions(s, data);
    });
  };

  //cdm this is used to either render modify page or add page (useEffect)
  useEffect(() => {
    // console.log("wait to reload", waitToReload());

    if (param === "new") {
      return;
    } else {
      axios.get(`http://127.0.0.1:8000/request/${param}`).then((res) => {
        // console.log(param);
        console.log("request info", res.data);
        const {
          Classrooms,
          requester,
          start,
          end,
          description,
          classroom_id,
          ReqActivityType,
          requester_id,
        } = res.data;
        setRequestInfo({
          classroom_name: Classrooms,
          requester: requester,
          start: new Date(start).toLocaleString("en-US", {
            hourCycle: "h23",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          end: new Date(end).toLocaleString("en-US", {
            timeZone: "Europe/Paris",
            hourCycle: "h23",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          description: description,
          ReqActivityType: ReqActivityType,
        });
        // setValue("Classrooms.classroom_name", Classrooms);
        // setValue("Classrooms.id", classroom_id);
        // setSelectedOption({ classroom_name: Classrooms, id: classroom_id });
        // setSelectedType({ value: ReqActivityType, label: ReqActivityType });
        // setSelectedFrequency({ value: "week", label: "per week" });
        // setSelectedLeader({ uname: requester, id: requester_id });

        // setValue("requester", requester);
        setValue("start", start);
        setValue("end", end);
        setValue("description", description);
        setExist(true);
      });
    }
  }, []);

  //the schema of validation
  const schema = Joi.object({
    Classrooms: Joi.required(),
    type: Joi.required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    frequency: Joi.required(),
    repitition: Joi.number().integer().min(1).max(20).required(),
    description: Joi.string().required(),
    requester: Joi.required(),
  });

  //use form hook
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  // submit
  const onSubmit = (data) => {
    console.log(data);

    const request = {
      ...data,
      Classrooms: data.Classrooms.id,
      type: data.type.label,
      requester: data.requester.id,
    };

    if (exist) {
      console.log("in put");
      axios
        .put(`http://127.0.0.1:8000/request/modify/${param}/`, request)
        .then(async (res) => {
          // const timeBeforeReload = setTimeout(
          //   () => waitToReload("request", isVisible, setIsVisible),
          //   2000
          // );
          notifyUpdate("Request");
          await waitToReload("request", isVisible, setIsVisible);
        }).catch((ex) => {
          console.log(ex.response.data.non_field_errors[0]);
          notifyExist(ex.response.data.non_field_errors[0]);
        });
    } else {
      axios
        .post(`http://127.0.0.1:8000/request/modify/`, request)
        .then(async (res) => {
          // const timeBeforeReload = setTimeout(
          //   () => waitToReload("request", isVisible, setIsVisible),
          //   2000
          // );
          notifyAdd("Request");
          await waitToReload("request", isVisible, setIsVisible);
        })
        .catch((ex) => {
          // console.log("error ", ex);
          // console.log("error message", ex.response.data);
          notifyExist(ex.response.data.non_field_errors[0]);
        });
    }

    // console.log('request', request);
    // axios.post("http://127.0.0.1:8000/request/modify/", request).then(res => {
    //   console.log('success');
    //   window.location = "/request";

    // }).catch(ex => {
    //   console.log(ex);
    // });
    // setIsVisible({ ...isVisible, request: false });
    // navigate(-1, { replace: "true" });
    //call the server send the changes

    // console.log(data);
  };

  //the render function
  return (
    <div className="container">
      {isVisible.request && (
        <div>
          <div className="main-top flex justify-around ">
            <PageHeading>
              <img className="w-5 h-5 mr-4" src={request} alt="" />
              <span>Send a Request</span>
            </PageHeading>
          </div>

          {exist ? (
            <div className="flex justify-center mt-12 ">
              <table className=" w-full">
                <thead>
                  <tr className="border-b border-gray-300 text-left">
                    <th>requester</th>
                    <th>classroom name</th>
                    <th>start</th>
                    <th>end</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td>{requestInfo.requester}</td>
                    <td>{requestInfo.classroom_name}</td>
                    <td>{requestInfo.start}</td>
                    <td>{requestInfo.end}</td>
                    <td>{requestInfo.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          <form id="request" action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 mt-16">
              <div>
                <div className="my-2 grid grid-cols-2">
                  <label className="py-1 mx-4  justify-self-end" htmlFor="name">
                    Classroom name :
                  </label>
                  <Controller
                    name="Classrooms"
                    control={control}
                    render={({ field }) => {
                      return (
                        <AsyncSelect
                          {...field}
                          styles={customStyles}
                          // value={{label : 'G5', value : 5}}
                          cacheOptions
                          // value={selectedOption}
                          defaultOptions
                          loadOptions={fetchClassrooms}
                          getOptionLabel={(e) => {
                            return e["classroom_name"];
                          }}
                          getOptionValue={(e) => e.id}
                        ></AsyncSelect>
                      );
                    }}
                  ></Controller>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.Classrooms && (
                    <div className="    text-red-500  -mt-3  py-1 rounded-md">
                      {errors.Classrooms.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="mx-4 py-1   justify-self-end "
                    htmlFor="start-time"
                  >
                    Start time :
                  </label>
                  <input
                    type="datetime-local"
                    className="py-1 px-3 outline-none w-44 border-blue-botton border rounded-lg"
                    {...register("start")}
                    id="start-time"
                    name="start"
                    step="1"
                  />
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.start && (
                    <div className="  text-red-500  -mt-3  py-1 rounded-md">
                      {errors.start.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-">
              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="mx-4 py-1  justify-self-end "
                    htmlFor="role"
                  >
                    Classroom type :
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          styles={customStyles}
                          options={classroomType}
                          // value={selectedType}
                        ></Select>
                      );
                    }}
                  ></Controller>
                </div>
                <div className="grid grid-cols-2	 ">
                  <div className="w-1"></div>
                  {errors.type && (
                    <div className="  text-red-500  -mt-3  py-1 rounded-md">
                      {errors.type.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="py-1 mx-4  justify-self-end"
                    htmlFor="end-time"
                  >
                    End time :
                  </label>
                  <input
                    className="py-1 px-3 outline-none w-44 border-blue-botton border rounded-lg"
                    {...register("end")}
                    type="datetime-local"
                    id="end-time"
                    name="end"
                    step="1"
                  ></input>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.end && (
                    <div className=" text-red-500  -mt-3  py-1 rounded-md">
                      {errors.end.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-">
              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="py-1 mx-4  justify-self-end"
                    htmlFor="frequency"
                  >
                    Frequency :
                  </label>
                  <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          styles={customStyles}
                          options={[{ value: "week", label: "per week" }]}
                          // value={selectedFrequency}
                        ></Select>
                      );
                    }}
                  ></Controller>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.frequency && (
                    <div className="    text-red-500  -mt-3  py-1 rounded-md">
                      {errors.frequency.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="py-1 mx-4  justify-self-end"
                    htmlFor="repitition"
                  >
                    Repitition :
                  </label>
                  <input
                    className="py-1 px-3 outline-none w-44 border-blue-botton border rounded-lg"
                    {...register("repitition")}
                    type="number"
                    id="repitition"
                    name="repitition"
                  ></input>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.repitition && (
                    <div className=" text-red-500  -mt-3  py-1 rounded-md">
                      {errors.repitition.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-">
              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="py-1 mx-4  justify-self-end"
                    htmlFor="password"
                  >
                    Session Leader :
                  </label>
                  <Controller
                    name="requester"
                    control={control}
                    render={({ field }) => {
                      return (
                        <AsyncSelect
                          {...field}
                          styles={customStyles}
                          cacheOptions
                          defaultOptions
                          loadOptions={fetchstaff}
                          getOptionLabel={(e) => e.username}
                          getOptionValue={(e) => e.id}
                          // value={selectedLeader}
                        ></AsyncSelect>
                      );
                    }}
                  ></Controller>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.maxCapacity && (
                    <div className=" text-red-500  -mt-3  py-1 rounded-md">
                      {errors.maxCapacity.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="mx-4 py-1  justify-self-end "
                    htmlFor="description"
                  >
                    Description :
                  </label>
                  <textarea
                    id="description"
                    className=" bg-white outline-none justify-self-start  px-3 w-44   border-blue-botton border rounded-lg"
                    name="description"
                    {...register("description")}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.cycle && (
                    <div className="  text-red-500  -mt-3  py-1 rounded-md">
                      {errors.cycle.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex">
              <input
                className="px-10 mx-auto outline-none mt-14 py-2 rounded-2xl bg-blue-botton text-white font-bold"
                type="submit"
                value={exist ? "modify the request" : "+ Add new request"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default RequestForm;
