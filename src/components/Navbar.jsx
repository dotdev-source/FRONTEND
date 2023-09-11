import React, {useEffect} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
const STUDENT_REGEX = /^\/dashboard\/teachers(\/)?$/
const TEACHERS_REGEX = /^\/dashboard\/teachers(\/)?$/

const Navbar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashboardClass = null
    if (!DASHBOARD_REGEX.test(pathname) && !STUDENT_REGEX.test(pathname) && !TEACHERS_REGEX.test(pathname)) {
        dashboardClass = "dashboard-header__container--small"
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >logout
        </button>
    )
    return (
        <>
            {logoutButton}
            <h1>navbar</h1>

            </>
)
}

export default Navbar