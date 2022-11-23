import * as React from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { CheckCode } from "./pages/CheckCode";
import { Dashboard } from "./pages/Dashboard";
import { ForgotPass } from "./pages/ForgotPass";
import { Login } from "./pages/Login";
import { ChangePass } from "./pages/ChangePass.jsx";
import Roles from "./pages/roles/Roles";
import StaffList from "./pages/staffList/StaffList";
import StaffListForm from "./pages/staffList/StaffListForm";
import Classrooms from "./pages/classrooms/Classrooms";
import { Profile } from "./pages/Profile";
import Request from "./pages/request/Request";
import { SharedLayout } from "./components/SharedLayout";
import RoleForm from "./pages/roles/RoleForm";
import ClassroomForm from "./pages/classrooms/ClassroomForm";
import RequestForm from "./pages/request/RequestForm";
import { useState } from "react";
import NotFound from "./common/NotFound";

import { SchedulerClassrooms } from "./components/SchedulerClassrooms";
import { SchedulerStafflist } from "./components/SchedulerStaff";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/schedulerclass/:id' element={<SchedulerClassrooms />} />
        <Route path='/schedulerstaff/:id' element={<SchedulerStafflist />} />
        <Route path='/' element={<Login setUser={setUser} />} />
        <Route path='/' element={<SharedLayout user={user} />}>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/roles' element={<Roles />}>
            <Route path=':id' element={<RoleForm />} />
          </Route>
          <Route path='/staff' element={<StaffList />}>
            <Route path='/staff/new' element={<StaffListForm />} />
          </Route>
          <Route path='/classrooms' element={<Classrooms />}>
            <Route path=':id' element={<ClassroomForm />} />
          </Route>
          <Route path='/request' element={<Request />}>
            <Route
              path='modify/:id'
              element={<RequestForm></RequestForm>}></Route>
            <Route path=':id' element={<RequestForm></RequestForm>}></Route>
          </Route>
          <Route path='/Profile/:id' element={<Profile />} />
          <Route path='/Profile' element={<Profile />} />
        </Route>
        <Route path='forgotpassword' element={<ForgotPass />} />
        <Route path='checkcode' element={<CheckCode />} />
        <Route path='changepass' element={<ChangePass />} />
        <Route path='*' element={<NotFound></NotFound>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
