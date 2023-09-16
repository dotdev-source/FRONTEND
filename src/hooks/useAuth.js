import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isStudent = false
    let isTeacher = false
    let isAdmin = false
    let status = "Admin"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isStudent = roles.includes('Student')
        isTeacher = roles.includes('Teacher')
        isAdmin = roles.includes('Admin')

        if (isStudent) status = "isStudent"
        if (isTeacher) status = "Teacher"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isStudent, isTeacher, isAdmin, }
    }

    return { username: '', roles: [], isStudent, isTeacher, isAdmin, status }
}
export default useAuth