import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardHome from "./features/auth/Home";
import Login from "./features/auth/Login";
import DashboardLayout from "./components/DashboardLayout";
import Students from "./features/students/Students";
import AddNewStudent from "./components/NewStudentForm";
import EditTeacher from "./components/EditTeacher";
import Teachers from "./features/teachers/Teachers";
import AddNewTeacher from "./components/NewTeacherForm";
import Signup from "./features/auth/Signup";
import EditStudent from "./features/students/EditStudent";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />

        {/* Begining of Dashboard Layout or protected routes */}
        <Route element={<Prefetch />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          <Route path="/dashboard/teachers">
            <Route index element={<Teachers />} />
            <Route path="/:id" element={<EditTeacher />} />
            <Route path="/new" element={<AddNewTeacher />} />

          </Route>

          
          <Route path="/dashboard/students">
            <Route index element={<Students />} />
            <Route path="/:id" element={<EditStudent />} />
            <Route path="/new" element={<AddNewStudent  />} />
          </Route>
          </Route>
          </Route>
        {/* End of Dashboard Layout or End of Protected Routes*/}
      </Route>
    </Routes>
  );
}

export default App;
