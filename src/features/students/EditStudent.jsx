import { useParams } from "react-router-dom";
import { useGetStudentQuery } from "./studentsApiSlice";
import { EditStudentForm } from "./EditStudent";
import { useGetTeachersQuery } from "../teachers/teachersApiSlice";
import useAuth from "../../hooks/useAuth.js";
import PulseLoader from "react-spinners/PulseLoader";

const EditStudent = () => {
    const { id } = useParams();

    const { email, isTeacher, isAdmin } = useAuth();

    const { student } = useGetStudentQuery('Student', {
        selectFromResult: ({ data }) => ({
            student: data.entities[id]
        })
    })

    const { teachers } = useGetTeachersQuery('Teacher', {
        selectFromResultData: ({ data }) => ({
            teacher: data?.ids.map(id => data?.entities[id])
        })
    });

    if (!student || !teachers?.length) return <PulseLoader color={"fff"}/>

    if (!isAdmin && !isTeacher) {
        if (student.email !== email) {
            return <p>No Access</p>
        }
    }
const content = <EditStudentForm student={student} teachers={teachers} />
  return content;
};
export default EditStudent;
