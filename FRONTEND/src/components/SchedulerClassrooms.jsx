import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export const SchedulerClassrooms = () => {
  const [schedules, setSchedules] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const calendarRef = useRef();
  const params = useParams();
  const classID = params.id;
  console.log("params : ", params);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/classroomtt/${classID}/`)
      .then((res) => {
        console.log("class TT", res.data);
        const b = res.data.map((schedule) => ({
          ...schedule,
          calendarId: "0",
          title: schedule.description,
          category: "time",
        }));
        setSchedules(b);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const clas = classrooms.find((c) => c.id === classID);

  const beforeUpdateSchedulecalendar = (evt) => {
    const { schedule, changes } = evt;
    console.log("original", evt.schedule);
    console.log(
      "update",
      evt.changes?.start?._date.toISOString() || schedule.start
    );
    // console.log("start", evt.start);
    // console.log("end", evt.end);

    // console.log();

    calendarRef.current.calendarInst.updateSchedule(
      evt.schedule.id,
      evt.schedule.calendarId,
      evt.changes
    );
    axios
      .get("http://127.0.0.1:8000/sessions/" + schedule.id + "/")
      .then((res) => {
        axios.patch(`http://127.0.0.1:8000/sessions/${schedule.id}/`, {
          start:
            evt.changes?.start?._date.toISOString() ||
            new Date(schedule.start).toISOString(),
          end:
            evt.changes?.end?._date.toISOString() ||
            new Date(schedule.end).toISOString(),
        });
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const deleteSchedule = (evt) => {
    const { schedule } = evt;
    axios
      .delete(`http://127.0.0.1:8000/sessions/${schedule.id}/`)
      .then((res) => {
        const updated = schedules.filter((sch) => sch.id != schedule.id);
        setSchedules(updated);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  // const createSchedule = (evt) => {
  //   const session = {
  //     start: new Date(evt.start._date).toISOString(),
  //     end: new Date(evt.end._date).toISOString(),
  //     description: evt.title,
  //     group: 1,
  //     SessionSubject: 2,
  //     sessionlead: 1,
  //     classroom_id: 1,
  //     ActivityType: 1,
  //   };
  //   console.log(session);
  //   axios
  //     .post("http://127.0.0.1:8000/sessions/", session)
  //     .then((res) => {
  //       console.log("added successfully");
  //     })
  //     .catch((ex) => {
  //       console.log(ex);
  //     });
  // };

  return (
    <div className='p-10'>
      <Calendar
        className='text-2xl'
        scheduleView={["time"]}
        defaultView='week'
        allDayView={false}
        taskView={false}
        usageStatistics={false}
        ref={calendarRef}
        // onBeforeCreateSchedule={createSchedule}
        onBeforeDeleteSchedule={deleteSchedule}
        onBeforeUpdateSchedule={beforeUpdateSchedulecalendar}
        // height="900px"
        calendars={[
          {
            id: "0",
            name: "Private",
            bgColor: "#9e5fff",
            borderColor: "#9e5fff",
          },
          {
            id: "1",
            name: "Company",
            bgColor: "#00a9ff",
            borderColor: "#00a9ff",
          },
        ]}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        month={{
          startDayOfWeek: 0,
        }}
        schedules={schedules}
        // timezones={[
        //   {
        //     timezoneOffset: 540,
        //     displayLabel: "GMT+09:00",
        //     tooltip: "Seoul",
        //   },
        //   {
        //     timezoneOffset: -420,
        //     displayLabel: "GMT-08:00",
        //     tooltip: "Los Angeles",
        //   },
        // ]}
        useDetailPopup
        useCreationPopup={false}
        // view={selectedView} // You can also set the `defaultView` option.
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
        }}
      />
    </div>
  );
};
