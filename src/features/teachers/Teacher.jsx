import { useNavigate } from "react-router-dom";
import { useGetTeachersQuery } from "./teachersApiSlice";
import {memo} from 'react'

const Teacher = ({ teacherId }) => {
  const { teacher } = useGetTeachersQuery('Teacher', { selectFromResultData: ({ data }) => ({ teacher: data?.entities[teacherId] }) })

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

const memoizedTeacher = memo(Teacher)
export default memoizedTeacher;
