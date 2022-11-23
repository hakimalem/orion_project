import React, { useEffect } from "react";
import PersonAdd from "../roles/PersonAdd.svg";
import PageHeading from "../../common/PageHeading";
import Icon from "../../common/Icon";
import AddButton from "../../common/AddButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import search from "../roles/search.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { notifyAdd, waitToReload } from "../../utils/notifications";



function StaffListForm() {
  const [roles, setRoles] = useState([]);
  const [isVisible, setIsVisible] = useOutletContext();
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const handleClick = () => {
    setIsVisible({...isVisible,staff : false});
    navigate(-1, { replace: "true" });
  };
  useEffect(()=> {
    axios
      .get("http://127.0.0.1:8000/role/")
      .then((res) => {
        setRoles(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
      lastonline: new Date().toISOString(),
    },
  });
  console.log(errors);


  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("http://127.0.0.1:8000/staff/modify/", data)
      .then(async (res) => {
        const timeBeforeReload = setTimeout(
          () => waitToReload("staff", isVisible, setIsVisible),
          2000
        );
        notifyAdd("Member");
        await timeBeforeReload();

        // clearTimeout(timeBeforeReload);
      })
      .catch((ex) => {
        console.log(ex);
      });;
  };


  return (
    <div className="container">
      {isVisible.staff && (
        <>
          <div className="main-top flex justify-around mt-3">
            <PageHeading>
              <img className="w-5 h-5 mr-4" src={PersonAdd} alt="" />
              <span>add new membre</span>
            </PageHeading>
            <AddButton onClick={handleClick} to="">
              View All
            </AddButton>
          </div>
          <div className="form">
            <h2 className="text-blue-botton font-bold text-lg mt-8">
              login informations :
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login-informations mt-6 p-1 "
            >
              <div>
                <div className="flex">
                  <div>
                    <div className="my-2 grid grid-cols-2">
                      <label
                        className="py-1 mx-4  justify-self-end"
                        htmlFor="password"
                      >
                        Password :
                      </label>
                      <input
                        className="py-1 px-3 outline-none w-44 border-blue-botton border rounded-lg"
                        {...register("password", {
                          required: "password is required",
                          maxLength: {
                            value: 30,
                            message: "password must be less than 30 caracters",
                          },
                          minLength: {
                            value: 8,
                            message: "password must be more than 8 caracters",
                          },
                        })}
                        type="text"
                        id="password"
                        name="password"
                        placeholder="enter password"
                      ></input>
                    </div>
                    {errors.password && (
                      <div className=" w-44 float-right text-red-500 -mt-3 px-3 py-1 rounded-md">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="my-2 grid grid-cols-2">
                      <label
                        className="mx-4 py-1 justify-self-end "
                        htmlFor="role"
                      >
                        Role :
                      </label>
                      <select
                        id="role"
                        className="mx-4 bg-white outline-none px-3 w-44 justify-self-start  border-blue-botton border rounded-lg"
                        name="role"
                        {...register("role", { required: "role is required" })}
                      >
                        Role :
                        {roles.map((role) => (
                          <option key={role.id} value={role.roleName}>
                            {role.roleName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.role && (
                      <div className="w-44 float-right text-red-500 -mt-3 px-3 py-1 rounded-md">
                        {errors.role.message}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex ">
                    <div className="my-2 grid grid-cols-2">
                      <label
                        className="py-1 mx-4  justify-self-end"
                        htmlFor="email"
                      >
                        Email :
                      </label>
                      <input
                        className="py-1 outline-none px-3 w-44 border-blue-botton border rounded-lg"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        })}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="enter email"
                      ></input>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 w-[340px] ">
                    <div className="w/5"></div>
                    {errors.email && (
                      <div className="w-44 float-right text-red-500 -mt-3 px-3 py-1 rounded-md">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <input
                  className="px-10 mx-auto outline-none mt-16 py-2 rounded-2xl bg-blue-botton text-white font-bold"
                  type="submit"
                  value="+ Add new member"
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffListForm;
