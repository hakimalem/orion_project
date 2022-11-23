import React, { useEffect } from "react";
import classroom from "./classroom.svg";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import search from "./search.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios, { Axios } from "axios";
import { ToastContainer } from "react-toastify";
import { notifyAdd, notifyExist, notifyUpdate, waitToReload } from "../../utils/notifications";


function ClassroomForm() {
  const [isVisible, setIsVisible] = useOutletContext();
  const [classrooms, setClassrooms] = useState([]);
  const [exist, setExist] = useState(false);
  const {id :param} = useParams();

  
  useEffect(() => {
   
    axios
      .get("http://127.0.0.1:8000/classroom/")
      .then((res) => {
        const classes = res.data.map((classroom) => {

          return {
            ...classroom,
            cycle: classroom.cycle === 1 ? "CP" : "CS",
          };
        });
        setClassrooms(classes);
      })
      .catch((err) => {
        console.log(err);
      });
    if (param === "new") {
      return;
    } else {
      axios.get(`http://127.0.0.1:8000/classroom/${param}/`).then((res) => {
        console.log('class', res.data);
        const { classroom_name, capacity, cycle, type } = res.data;
        setValue("classroom_name", classroom_name);
        setValue("capacity", capacity );
        setValue("cycle", cycle === 1 ? "CP" : "CS");
        setValue("type", type);
        setExist(true);
      });
    }
  }, []);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const handleClick = () => {
    setIsVisible({ ...isVisible, classrooms: false });
    navigate(-1, { replace: "true" });
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      classroom_name: "",
      cycle: "",
      type: "",
      Capacity: "",
    },
  });
  const onSubmit = (data) => {
    const classroom = { ...data, cycle: data.cycle === "CP" ? 1 : 2 };

    if (!exist) {
      axios
        .post("http://127.0.0.1:8000/classroom/", classroom)
        .then(async(res) => {
          // const timeBeforeReload = setTimeout(() => waitToReload('classrooms',isVisible, setIsVisible), 2000);
          notifyAdd("Classroom");
          await waitToReload("classrooms", isVisible, setIsVisible);

        })
        .catch((ex) => {
          console.log(ex);
          notifyExist('')
        });
    } else {
      axios
        .put(`http://127.0.0.1:8000/classroom/${param}/`, classroom)
        .then(async (res) => {
          // const timeBeforeReload = setTimeout(
          //   () => waitToReload("classrooms", isVisible, setIsVisible),
          //   2000
          // );
          notifyUpdate("Classroom");
          await waitToReload("classrooms", isVisible, setIsVisible);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }

    // setIsVisible(false);
    // navigate(-1, { replace: "true" });
    //call the server send the changes

    // console.log(data);
  };

  
  const types = [
    "TP","TD","Amphi","Other"
  ];
  const cycle = ["CP","CS"];
  // console.log('type regroup',Object.keys(groupArrayOfObjects(classrooms,'type')));
  return (
    <div className="container">
      <ToastContainer></ToastContainer>
      {isVisible.classrooms && (
        <div>
          <div className="main-top flex justify-around mt-3">
            <PageHeading>
              <img className="w-5 h-5 mr-4" src={classroom} alt="" />
              <span>add new Classrooms</span>
            </PageHeading>
            <AddButton onClick={handleClick} to="/classrooms/new">
              See the classrooms
            </AddButton>
          </div>
          <div className="mt-6 flex justify-center ">
            <form className="" action="" method="post">
              <div className="search-input flex justify-between border-blue-search border rounded-md w-60  h-8 self-center px-6 py-[1px] mr-2">
                <label className="self-center" htmlFor="search">
                  <input
                    className=" outline-none rounded-md placeholder:text-black w-32 lg:w-36"
                    type="text"
                    id="search"
                    placeholder="Search..."
                  />
                </label>
                <span className="w-5 self-center">
                  <img src={search} alt="" />
                </span>
              </div>
            </form>
          </div>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 mt-12">
              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="py-1 mx-4 text-blue-botton justify-self-end"
                    htmlFor="name"
                  >
                    Classroom name :
                  </label>
                  <input
                    className="py-1 px-3 outline-none w-44 border-blue-botton border rounded-lg"
                    {...register("classroom_name", {
                      required: "name is required",
                    })}
                    type="text"
                    id="name"
                    name="classroom_name"
                    placeholder="enter classroom name"
                  ></input>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.name && (
                    <div className="    text-red-500  -mt-3  py-1 rounded-md">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="mx-4 py-1 text-blue-botton justify-self-end "
                    htmlFor="cycle"
                  >
                    Cycle :
                  </label>
                  <select
                    id="cycle"
                    className=" bg-white outline-none justify-self-start  px-3 w-44   border-blue-botton border rounded-lg"
                    name="cycle"
                    {...register("cycle", { required: "cycle is required" })}
                  >
                    Cycle :
                    {cycle.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
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
            <div className="grid grid-cols-2 mt-12">
              <div>
                <div className="my-2 grid grid-cols-2">
                  <label
                    className="mx-4 py-1 text-blue-botton justify-self-end "
                    htmlFor="role"
                  >
                    Classroom type :
                  </label>
                  <select
                    id="type"
                    className=" bg-white outline-none px-3 w-44  justify-self-start  border-blue-botton border rounded-lg"
                    name="type"
                    {...register("type", { required: "type is required" })}
                  >
                    Type :
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
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
                    className="py-1 mx-4 text-blue-botton justify-self-end"
                    htmlFor="password"
                  >
                    Max capacity :
                  </label>
                  <input
                    className="py-1 px-3 outline-none w-44 border-blue-botton border rounded-lg"
                    {...register("Capacity", {
                      required: "this should not be empty",
                      min: {
                        value: 0,
                        message: "Capacity must be more than 0",
                      },
                      max: {
                        value: 250,
                        message: "Capacity must be less than 250",
                      },
                    })}
                    type="number"
                    id="maxCapacity"
                    name="Capacity"
                  ></input>
                </div>
                <div className="grid grid-cols-2">
                  <div className="w-1"></div>
                  {errors.Capacity && (
                    <div className=" text-red-500  -mt-3  py-1 rounded-md">
                      {errors.Capacity.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex">
              <input
                className="px-10 mx-auto outline-none mt-14 py-2 rounded-2xl bg-blue-botton text-white font-bold"
                type="submit"
                value={exist ? "modify the classroom" : "+ Add new classroom"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ClassroomForm;
