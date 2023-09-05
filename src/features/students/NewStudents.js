import { useSelector } from 'react-redux'
import { selectAllStudents } from '../students/studentsApiSlice'
import NewStudentForm from './NewNoteForm'

const NewStudent = () => {
    const students = useSelector(selectAllStudents)

    if (!students?.length) return <p>Not Currently Available</p>

    const content = <NewStudentForm students={students} />

    return content
}
export default NewStudent