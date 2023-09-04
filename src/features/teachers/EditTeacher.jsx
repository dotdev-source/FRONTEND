import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTeachersById } from './teachersApiSlice'
import EditTeacherForm from './EditTeacherForm'

const EditTeacher = () => {
    const { id } = useParams()

    const teacher = useSelector(state => selectTeachersById(state, id))

    const content = teacher ? <EditTeacherForm teacher={teacher} /> : <p>Loading...</p>

    return content
}
export default EditTeacher;