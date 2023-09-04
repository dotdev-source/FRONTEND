import { useState, useEffect } from "react"
import { useAddNewStudentMutation } from "./studentsApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"


const STUDENT_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const NewStudentForm = () => {

    const [addNewStudent, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewStudentMutation()

    const navigate = useNavigate()

    const [studentname, setStudentname] = useState('')
    const [validStudentname, setValidStudentname] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidStudentname(STUDENT_REGEX.test(studentname))
    }, [studentname])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setStudentname('')
            setPassword('')
            setRoles([])
            navigate('/dash/students')
        }
    }, [isSuccess, navigate])

    const onStudentnameChanged = e => setStudentname(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validStudentname, validPassword].every(Boolean) && !isLoading

    const onSaveStudentClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewStudent({ studentname, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validStudentClass = !validStudentname ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveStudentClicked}>
                <div className="form__title-row">
                    <h2>New Student</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="studentname">
                    Studentname: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validStudentClass}`}
                    id="studentname"
                    name="studentname"
                    type="text"
                    autoComplete="off"
                    value={studentname}
                    onChange={onStudentnameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default NewStudentForm