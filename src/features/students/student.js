import { useNavigate } from "react-router-dom";
import { useGetStudentQuery } from './studentsApiSlice ';
import {memo} from 'react'

const Student = ({ studentId }) => {

  const { student } = useGetStudentQuery('Student', { selectFromResultData: ({ data }) => ({ student: data?.entities[studentId] }) })

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

const memoizedStudent = memo(Student);
export default memoizedStudent;
