import { store } from '../../app/store'
import { teachersApiSlice } from '../notes/notesApiSlice'
import { studentsApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const teachers = store.dispatch(teachersApiSlice.endpoints.getTeacher.initiate())
        const students = store.dispatch(studentsApiSlice.endpoints.getStudents.initiate())

        return () => {
            console.log('unsubscribing')
            teachers.unsubscribe()
            students.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch