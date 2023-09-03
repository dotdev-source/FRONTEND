import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectStudentsById } from "./studentsApiSlice";

const Student = ({ studentId }) => {
  const student = useSelector((state) => selectStudentsById(state, studentId));

  const navigate = useNavigate();

  if (student) {
    const handleEdit = () => navigate(`/dash/students/${studentId}`);

    const studentRolesString = student.roles.toString().replaceAll(",", ", ");

    // const paymentStatus = student.paid ? "" : "table__cell--inactive";

    return (
      <tr className="table__row student">
        <td>{student.studentname}</td>
        <td>{studentRolesString}</td>
      </tr>
    );
  } else return null;
};
export default Student;
