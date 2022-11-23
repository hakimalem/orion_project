import axios from "axios";

export const getRoles =  (setRoles) => {
    axios
      .get("http://127.0.0.1:8000/role/")
      .then((res) => {
        // console.log(res.data);
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
}

export function  fetchClassrooms  (s)  {
  
    console.log('args', arguments[0]);
    return axios
      .get("http://127.0.0.1:8000/classroom/").then(res => {
        const data = res.data;
        return filterOptions1(s, data);
      });
    
    // console.log("classrooms" , data);
    
};

const filterOptions1 = (str, classroom) => {
  console.log("string", str);
  console.log("classrooms in options", classroom);
  const filtered =  classroom.filter((i) => {
    // console.log("classroom", i);
    return i["classroom_name"].toLowerCase().includes(str.toLowerCase());
  });
  console.log('filetered', filtered);
  return filtered;
};