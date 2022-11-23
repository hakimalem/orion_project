import React, { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Button } from "../components/Button";
import { FaRegEdit } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getRoles } from "../fetch/getData";

export const Profile = () => {
  const navigate = useNavigate();
  const { id: param } = useParams();
  const [user, setUser] = useState({
    uname: "Amina Naceri",
    email: "admin@esi-sba.dz",
    role: "Admin",
    ppic: "/img/profile_pic.jpg",
  });

  const [readOnly, setReadOnly] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);
  const [phone, setPhone] = useState(user.phone_number);
  const [password, setPassword] = useState(user.password);
  const [address, setAddress] = useState(user.address);
  const [roles , setRoles] = useState([])
  const schema = Joi.object({
    uname: Joi.string().required().label("User Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect( () => {
    // console.log("param", param);
      axios
        .get("http://127.0.0.1:8000/role/")
        .then((res) => {
          console.log('roles before set',res.data);
          setRoles(res.data);
          console.log("roles after set", roles);
        })
        .catch((err) => {
          console.log(err);
        });
    if (param) {
        axios.get(`http://127.0.0.1:8000/staff/${param}/`).then((res) => {
        console.log(res.data);
        const { uname, email, role, lastonline } = res.data;

        // const roleid = roles.filter((r) => r.roleName === role)[0].id;
        // console.log('roles',roles)
        // console.log('roleid', roleid[0].id);
        console.log('user', res.data);
        setValue("uname", uname)
        setValue("email", email)
        setUser({
          uname: uname,
          email: email,
          role: role,
          lastonline: lastonline,
        });
      }).catch(ex => {
        console.log(ex);
        // navigate("/not-found", {replace : true});
      });
    }
    }
  , []);
  // const role = roles.find((role) => role.id === user.role_id);

  const onSubmit = (data) => {
    console.log(data);
    const profile = {...data,}
    setReadOnly(true);
  };

  return (
    <div className="flex justify-center items-center w-full bg-background h-[86%] p-10">
      <div className="border-gray-400  w-full min-h-full  rounded-lg flex justify-center items-center">
        <div className="flex justify-evenly w-full h-full items-center">
          <div className="w-[25%] rounded-md px-4 py-8">
            <div className="flex flex-col items-center justify-center">
              <img className="rounded-full w-2/3" src={user.ppic} alt="" />
              <p className="font-bold mt-3">{user.uname}</p>
            </div>
            <div className="mt-6">
              <div>
                <span className="text-gray-400 mr-8">Email : </span>
                <span>{user.email}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-10">Role : </span>
                <span>{user.role}</span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md py-16 px-16"
          >
            <div className="my-6 flex justify-between items-center w-[110%]">
              <label htmlFor="phone_number">User Name</label>
              <input
                {...register("uname")}
                name="uname"
                className={`${readOnly ? "bg-input_read_only" : null}
                  focus:outline-none border rounded-lg border-2 px-2 py-1`}
                id="phone_number"
                type="text"
                readOnly={readOnly}
                // value={phone}
                // onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.uname && !readOnly && (
              <div className="  text-red-500  -mt-3  py-1 rounded-md">
                {errors.uname.message}
              </div>
            )}
            <div className="my-6 flex justify-between items-center w-[110%]">
              <label htmlFor="email">Email </label>
              <input
                {...register("email")}
                className={`${readOnly ? "bg-input_read_only" : null}
                  focus:outline-none border rounded-lg border-2 px-2 py-1`}
                id="email"
                type="email"
                name="email"
                readOnly={readOnly}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.email && !readOnly && (
              <div className="  text-red-500  -mt-3  py-1 rounded-md">
                {errors.email.message}
              </div>
            )}

            <div className="flex justify-around">
              <Button
                className="p-2 px-3 bg-blue_2 text-white  font-bold rounded-2xl relative left-full"
                type="button"
                onClick={() => setReadOnly(false)}
              >
                <FaRegEdit />
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
