import React, {useEffect} from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from "../hooks/useAuth";


// const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
// const STUDENT_REGEX = /^\/dashboard\/teachers(\/)?$/
// const TEACHERS_REGEX = /^\/dashboard\/teachers(\/)?$/

const SideNav = () => {
  const { fullname, status } = useAuth(); 
  const navigate = useNavigate();
  // const { pathname } = useLocation();

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
  

  const logoutButton = (

      <button
          className="icon-button"
          title="Logout"
          onClick={sendLogout}
      >logout
      </button>
  )

  return <div>
    <p>{fullname}</p>
    <p>{status}</p>
    {/* Use the status above the display the other contents of the sidebar */}
    {logoutButton}

    <h1>SideNav</h1></div>;
};

export default SideNav;
