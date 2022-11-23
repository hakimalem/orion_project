import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SchedulerStafflist = () => {
  const [schedules, setSchedules] = useState([]);
  const calendarRef = useRef();
  const params = useParams();
  const staffID = params.id;
  console.log("params : ", params);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/stafftt/${staffID}/`)
      .then((res) => {
        console.log("class TT", res.data);
        const b = res.data.map((schedule) => ({
          ...schedule,
          calendarId: "0",
          title: schedule.description,
          category: "time",
        }));
        console.log(b);
        setSchedules(b);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  //   const beforeUpdateSchedulecalendar = (evt) => {
  //     const { schedule, changes } = evt;
  //     console.log("original", evt.schedule);
  //     console.log(
  //       "update",
  //       evt.changes?.start?._date.toISOString() || schedule.start
  //     );
  //     // console.log("start", evt.start);
  //     // console.log("end", evt.end);

  //     // console.log();

  //     calendarRef.current.calendarInst.updateSchedule(
  //       evt.schedule.id,
  //       evt.schedule.calendarId,
  //       evt.changes
  //     );
  //     axios
  //       .get("http://127.0.0.1:8000/sessions/" + schedule.id + "/")
  //       .then((res) => {
  //         axios.put(`http://127.0.0.1:8000/sessions/${schedule.id}/`, {
  //           ...res.data,
  //           start:
  //             evt.changes?.start?._date.toISOString() ||
  //             new Date(schedule.start).toISOString(),
  //           end:
  //             evt.changes?.end?._date.toISOString() ||
  //             new Date(schedule.end).toISOString(),
  //         });
  //       })
  //       .catch((ex) => {
  //         console.log(ex);
  //       });
  //   };

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
    <Calendar
      usageStatistics={false}
      ref={calendarRef}
      // onBeforeCreateSchedule={createSchedule}
      onBeforeDeleteSchedule={deleteSchedule}
      //   onBeforeUpdateSchedule={beforeUpdateSchedulecalendar}
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
      scheduleView
      taskView
      template={{
        milestone(schedule) {
          return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
        },
        milestoneTitle() {
          return "Milestone";
        },
        allday(schedule) {
          return `${schedule.title}<i class="fa fa-refresh"></i>`;
        },
        alldayTitle() {
          return "All Day";
        },
      }}
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
      useCreationPopup
      // view={selectedView} // You can also set the `defaultView` option.
      week={{
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true,
      }}
    />
  );
};
