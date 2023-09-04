import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTeachersById } from "./teachersApiSlice";

const Teacher = ({ teacherId }) => {
  const teacher = useSelector((state) => selectTeachersById(state, teacherId));

  const navigate = useNavigate();

  if (teacher) {
    const handleEdit = () => navigate(`/dashboard/teachers/${teacherId}`);

    const teacherRolesString = teacher.roles.toString().replaceAll(",", ", ");

    // const paymentStatus = teacher.paid ? "" : "table__cell--inactive";

    return (
      <tr className="table__row teacher">
        <td>{teacher.teachername}</td>
        <td>{teacherRolesString}</td>
      </tr>
    );
  } else return null;
};
export default Teacher;
