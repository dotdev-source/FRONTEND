import { Routes, Route } from "react-router-dom";
import Home from "./features/auth/Home";
import Login from "./features/auth/Login";
import DashboardLayout from "./components/DashboardLayout";
import Students from "./features/students/Students";
import AddNewStudent from "./features/students/NewStudentForm";
import EditTeacher from "./features/teachers/EditTeacher";
import Teachers from "./features/teachers/Teachers";
import AddNewTeacher from "./features/teachers/NewTeacherForm";
import AdminSignup from "./features/admin/AdminSignup";
import EditStudent from "./features/students/EditStudent";
import Prefetch from "./features/auth/Prefetch";
import Schools from "./features/school/Schools";
import NewSchool from "./features/school/NewSchool";
import EditSchool from "./features/school/EditSchool";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import {ROLES} from './config/roles'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="signup" element={<AdminSignup />} />
      <Route path="login" element={<Login />} />

      {/* Begining of Dashboard Layout or protected routes */}
      {/* <Route path="schools/new" element={<NewSchool />} /> */}

      <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
        <Route element={<Prefetch  />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />

            <Route path="/dashboard/schools">
              <Route index element={<Schools />} />
              <Route path="schools/new" element={<NewSchool />} />
              <Route path="schools/:id" element={<EditSchool />} />
            </Route>

            <Route path="/dashboard/teachers">
              <Route index element={<Teachers />} />
              <Route path="teachers/:id" element={<EditTeacher />} />
              <Route path="teachers/new" element={<AddNewTeacher />} />
            </Route>

            <Route path="/dashboard/students">
              <Route index element={<Students />} />
              <Route path="students/:id" element={<EditStudent />} />
              <Route path="students/new" element={<AddNewStudent />} />
            </Route>
          </Route>
          </Route>
          </Route>
      </Route>

      {/* End of Dashboard Layout or End of Protected Routes*/}
    </Routes>
  );
}

export default App;
