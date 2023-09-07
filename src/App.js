import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./features/auth/Home";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardHome />} />
        <Route path="signup" element={<AdminSignup />} />
        <Route path="login" element={<Login />} />

        {/* Begining of Dashboard Layout or protected routes */}
        <Route element={<Prefetch />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          <Route path="/dashboard/teachers">
            <Route index element={<Teachers />} />
            <Route path="teachers/:id" element={<EditTeacher />} />
            <Route path="teachers/new" element={<AddNewTeacher />} />

          </Route>

          
          <Route path="/dashboard/students">
            <Route index element={<Students />} />
            <Route path="students/:id" element={<EditStudent />} />
            <Route path="students/new" element={<AddNewStudent  />} />
          </Route>
          </Route>
          </Route>
        {/* End of Dashboard Layout or End of Protected Routes*/}
      </Route>
    </Routes>
  );
}

export default App;
