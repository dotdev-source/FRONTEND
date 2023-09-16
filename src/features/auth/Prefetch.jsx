import { store } from '../../app/store'
import { teachersApiSlice } from '../teachers/teachersApiSlice'
import { studentsApiSlice } from '../students/studentsApiSlice';
import { schoolApiSlice } from '../school/schoolApiSlice';
import { subjectsApiSlice } from '../subjects/subjectsApiSlice';
import { programsApiSlice } from '../programs/programsApiSlice';
import { classesApiSlice } from '../classes/classesApiSlice';
import { examsApiSlice } from '../exams/examsApiSlice';
import { academicYearApiSlice } from '../academicYear/academicYearApiSlice';
import { acdemicTermApiSlice } from '../acdemicTerm/acdemicTermApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const teachers = store.dispatch(teachersApiSlice.endpoints.getTeachers.initiate())
        const students = store.dispatch(studentsApiSlice.endpoints.getStudents.initiate())
        const schools = store.dispatch(schoolApiSlice.endpoints.getSchools.initiate())
        const subjects = store.dispatch(subjectsApiSlice.endpoints.getSubjects.initiate())
        const programs = store.dispatch(programsApiSlice.endpoints.getPrograms.initiate())
        const classes = store.dispatch(classesApiSlice.endpoints.getClasses.initiate())
        const exams = store.dispatch(examsApiSlice.endpoints.getExams.initiate())
        const academicYears = store.dispatch(academicYearApiSlice.endpoints.getAcademicYears.initiate())
        const academicTerms= store.dispatch(acdemicTermApiSlice.endpoints.getAcademicTerms.initiate())

        return () => {
            console.log('unsubscribing')
            teachers.unsubscribe()
            students.unsubscribe()
            schools.unsubscribe()
            subjects.unsubscribe()
            programs.unsubscribe()
            classes.unsubscribe()
            exams.unsubscribe()
            academicYears.unsubscribe()
            academicTerms.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch