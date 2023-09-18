import { useSelector } from 'react-redux'
import { selectAllTeachers } from '../teachers/teachersApiSlice'
import NewStudentForm from './NewNoteForm'

const AllTeachers = () => {
    const teachers = useSelector(selectAllTeachers)

    if (!teachers?.length) return <p>Not Currently Available</p>

    const content = <NewStudentForm teachers={teachers} />

    return content
}
export default AllTeachers