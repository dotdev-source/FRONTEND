import { useParams } from 'react-router-dom'
import EditTeacherForm from './EditTeacherForm'
import { useGetTeachersQuery } from './teachersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditTeacher = () => {
    const { id } = useParams()

    const { teacher } = useGetTeachersQuery('Teacher', { selectFromResultData: ({ data }) => ({ teacher: data?.entities[id] }) })

    if(!teacher) return <PulseLoader color="fff" />
    const content = <EditTeacherForm teacher={teacher } />

    return content
}
export default EditTeacher;