import React, { useEffect } from "react";
import PersonAdd from "./PersonAdd.svg";
import PageHeading from "../../common/PageHeading";
import AddButton from "../../common/AddButton";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import search from "./search.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { isVisible } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { notifyAdd, notifyExist, notifyUpdate, waitToReload } from "../../utils/notifications";

function RoleForm() {
  const [isVisible, setIsVisible] = useOutletContext();
  const [exist, setExist] = useState(false);
  // let role = {
  //   roleName: "",
  //   permission: "",
  // };
  console.log('wait to reload');
  const navigate = useNavigate();
  const handleClick = () => {
    setIsVisible({ ...isVisible, roles: false });
    navigate("/roles", { replace: "true" });
  };

  useEffect(() => {
    console.log("param", param);
    if (param === "new") {
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/role/${param}/`)
      .then((res) => {
        console.log(res.data);
        setValue("roleName", res.data.roleName);
        setValue("permission", res.data.permission === 1 ? "admin" : "user");
        setExist(true);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: "",
      permission: "",
      
    },
  });

  const { id: param } = useParams();

  const onSubmit = (data) => {
    console.log(data);
    const role = { ...data, permission: data.permission === "admin" ? 1 : 2 };
    // console.log(role);
    if (!exist) {
      axios
        .post("http://127.0.0.1:8000/role/", role)
        .then(async (res) => {
          // const timeBeforeReload = setTimeout(() => waitToReload('roles',isVisible, setIsVisible), 2000);
          notifyAdd("Role");
          await waitToReload("roles", isVisible, setIsVisible);

          // clearTimeout(timeBeforeReload);
        })
        .catch((ex) => {
          // console.log("error message", ex.response.data.roleName[0]);
          notifyExist();
        });
      // .finally(() => {clearTimeout(timeBeforeReload);});
    } else {
      axios
        .put(`http://127.0.0.1:8000/role/${param}/`, role)
        .then(async (res) => {
          // const timeBeforeReload = setTimeout(
          //   () => waitToReload("roles", isVisible, setIsVisible).then(res => {console.log(res);}),
          //   2000
          // );
          notifyUpdate("Role");
          await waitToReload("roles", isVisible, setIsVisible);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }

    // navigate("/roles", { replace: "true" });
    //call the server send the changes
  };

  return (
    <div className="container ">
      {isVisible.roles && (
        <>
          <div className="main-top flex justify-around mt-3">
            <PageHeading>
              <img className="w-5 h-5 mr-4" src={PersonAdd} alt="" />
              <span>add new role</span>
            </PageHeading>
            <AddButton onClick={handleClick} to="role">
              View All
            </AddButton>
          </div>

          <div className="mt-6 flex justify-end ">
            <form className="" action="" method="post">
              <div className="search-input flex justify-between border-blue-search border rounded-md w-60  h-8 self-center px-6 py-[1px] mr-12">
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

          <div className="role-form px-3 ">
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="name-input flex flex-col mt-3">
                <div className="flex">
                  <label
                    className="self-center text-blue-botton font-bold text-lg"
                    htmlFor="Name"
                  >
                    Name :
                  </label>
                  <div className="search-input flex justify-between ml-2  border-blue-search border rounded-md h-8 self-center px-6 py-[1px] mr-12">
                    <input
                      {...register("roleName", {
                        required: "name is required",
                      })}
                      name="roleName"
                      className=" outline-none rounded-md placeholder:text-black placeholder:text-sm w-32 lg:w-36"
                      type="text"
                      id="name"
                      placeholder="EX : Teacher"
                    />
                  </div>
                </div>
                <div className="flex justify-start mt-2 ml-16">
                  {errors.roleName && (
                    <div className="text-red-500 -mt-3 px-3 py-1 rounded-md">
                      {errors.roleName.message}
                    </div>
                  )}
                </div>
              </div>

              <h2 className="text-blue-botton font-bold text-lg mt-8">
                premissions :{" "}
              </h2>
              <div className="permissions mt-6 columns-3	">
                <div className="my-2">
                  <input
                    className="bg-gray-200"
                    {...register("permission", { required: true })}
                    type="radio"
                    id="admin"
                    name="permission"
                    value="admin"
                  ></input>
                  <label className="ml-3" htmlFor="admin">
                    Admin
                  </label>
                </div>

                <div className="my-3">
                  <input
                    {...register("permission", { required: true })}
                    type="radio"
                    id="user"
                    name="permission"
                    value="user"
                  ></input>
                  <label className="ml-3" htmlFor="user">
                    User
                  </label>
                </div>
              </div>
              <div className="flex pt-8">
                <input
                  className="px-10 mx-auto py-2 rounded-2xl bg-blue-botton text-white font-bold"
                  type="submit"
                  value={exist ? "Edit The role" : "+ ADD Role"}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default RoleForm;
