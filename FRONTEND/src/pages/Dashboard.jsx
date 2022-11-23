import axios from "axios";
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import { DoughnutChart } from "../components/DoughnutChart";
import { LineChart } from "../components/LineChart";
import timetab from "../images/timetab.svg";

export const Dashboard = ({ user }) => {
  const [analytics, setAnalytics] = useState({});
  const [mostRequested, setMostRequested] = useState([]);
  const [requestValue, setRequestValue] = useState("week");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/analytics/")
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/mostreq/")
      .then((res) => {
        setMostRequested(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    Number_of_requests,
    Number_of_approved_requests,
    Number_of_disapproved_requests,
    Number_of_Waiting_requests,
    Number_of_Staff,
    Teachers,
    Clubs,
    Other,
    number_of_classrooms,
    number_of_td,
    number_of_tp,
    number_of_amphi,
    number_of_others,
    request_td_month,
    request_tp_month,
    request_amphi_month,
    request_td_week,
    request_tp_week,
    request_amphi_week,
  } = analytics;

  const seeTimetable = (id) => {
    window.open(`/schedulerstaff/${id}`, "_blank");
  };

  return (
    <div className='flex justify-center items-center w-full bg-background h-[86%] px-16 py-8'>
      <div className=' border-gray-400 w-full min-h-full rounded-lg grid grid-cols-11 gap-6 grid-rows-4'>
        <div className='bg-white shadow-lg hover:shadow-xl rounded-2xl col-span-3 row-span-2 py-6 px-4 hover:scale-105 transition duration-700'>
          <DoughnutChart
            labels={["Approved", "Disapproved", "on wait"]}
            labelName={"Requests"}
            dataa={[
              Number_of_approved_requests,
              Number_of_disapproved_requests,
              Number_of_Waiting_requests,
            ]}
          />
        </div>
        <div className='shadow-lg hover:shadow-xl text-white bg-gradient-to-r from-[#b981da] to-[#eddbf8] rounded-xl col-span-3 hover:scale-105 transition duration-700'>
          <div className='p-2 flex justify-center flex-col'>
            <h1 className='font-bold text-2xl text-center'>Total Staff</h1>
            <p className='text-4xl font-[900] mx-auto mt-3'>
              {Number_of_Staff}
            </p>
            <div className='flex justify-around mt-3'>
              <p>
                <span className='font-[900] text-lg'>{Teachers}</span> Teacher
              </p>
              <p>
                <span className='font-[900] text-lg'>{Clubs}</span> Club
              </p>
            </div>
          </div>
        </div>
        <div className='bg-white shadow-lg hover:shadow-xl  rounded-2xl col-span-5 row-span-2 py-6 px-4 pt-8  hover:scale-105  transition duration-700'>
          <select
            onChange={(e) => setRequestValue(e.target.value)}
            className='outline-none rounded-md placeholder:text-black bg-white border-blue-search border px-3 py-[1px] ml-[70%]'>
            <option value='week'>This week</option>
            <option value='month'>This month</option>
          </select>
          <BarChart
            labels={["TD", "TP", "AMPHI"]}
            labelName={"Requested classrooms"}
            dataa={
              requestValue == "week"
                ? [request_td_week, request_tp_week, request_amphi_week]
                : [request_td_month, request_tp_month, request_amphi_month]
            }
          />
        </div>
        <div className='shadow-lg hover:shadow-xl  text-white bg-gradient-to-r from-[#7fb4b8] to-[#dbedf0] rounded-xl col-span-3 hover:scale-105  transition duration-700'>
          <div className='p-2 flex justify-center flex-col'>
            <h1 className='font-bold text-2xl text-center'>Classrooms</h1>
            <p className='text-4xl font-[900] mx-auto mt-3'>
              {number_of_classrooms}
            </p>
            <div className='flex justify-around mt-3'>
              <p>
                <span className='font-[900] text-lg'>{number_of_tp}</span> TP
              </p>
              <p>
                <span className='font-[900] text-lg'>{number_of_td}</span> TD
              </p>
              <p>
                <span className='font-[900] text-lg'>{number_of_amphi}</span>{" "}
                Amphi
              </p>
            </div>
          </div>
        </div>
        <div className='bg-white px-3 pt-4 shadow-lg hover:shadow-xl  rounded-xl col-span-6 row-span-2 hover:scale-105  transition duration-700'>
          <LineChart
            labels={["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]}
            labelName={"Total Requests"}
            dataa={[
              analytics["request sunday"],
              analytics["request monday"],
              analytics["request tuesday"],
              analytics["request wednesday"],
              analytics["request thursday"],
              analytics["request friday"],
              analytics["request saturday"],
            ]}
          />
        </div>
        <div className='shadow-lg hover:shadow-xl  rounded-xl col-span-5 row-span-2 hover:scale-105  transition duration-700'>
          <h1 className='text-xl p-3 font-bold text-[#3803C1]'>
            Most Requested Classrooms
          </h1>
          <table className='w-full'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-3'>Name</th>
                <th>Type</th>
                <th>Cycle</th>
                <th>Timetable</th>
              </tr>
            </thead>
            <tbody>
              {mostRequested.map((row) => (
                <tr className='border-b even:bg-cyan-50'>
                  <td className='text-center p-2'>{row.classroom_name}</td>
                  <td className='text-center'>{row.type}</td>
                  <td className='text-center'>
                    {row.cycle === 1 ? "Preparatory" : "Engineering"}
                  </td>
                  <td className='text-center'>
                    <button
                      className='p-2'
                      onClick={() => seeTimetable(row.id)}>
                      <img src={timetab} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/*


*/
