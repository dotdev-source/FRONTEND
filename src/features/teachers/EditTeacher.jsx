import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTeacherById } from './teachersApiSlice'
import EditTeacherForm from './EditTeacherForm'

const EditTeacher = () => {
    const { id } = useParams()

    const teacher = useSelector(state => selectTeacherById(state, id))

    const content = teacher ? <EditTeacherForm teacher={teacher} /> : <p>Loading...</p>

    return content
}
export default EditTeacher;