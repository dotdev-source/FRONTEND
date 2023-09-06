import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const NewSchool = () => {
    const schoolNameRef = useRef()
    const errRef = useRef()
    const [schoolName, setSchoolName] = useState('')
    const [schoolType, setSchoolType] = useState('')
    const [regNo, setRegNo] = useState('')
    const [schoolAddress, setSchoolAddress] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        schoolNameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [schoolName, schoolType, regNo, schoolAddress])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ schoolName, schoolType })
            dispatch(setCredentials({ accessToken }))
            setSchoolName('')
            setSchoolType('')
            navigate('/dashboard')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing SchoolName or SchoolType');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleSchoolNameInput = (e) => setSchoolName(e.target.value)
    const handlePwdInput = (e) => setSchoolType(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="public">
            <header>
                <h3>Create School</h3>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="schoolName">SchoolName Address</label>
                    <input
                        className="form__input"
                        type="text"
                        id="schoolName"
                        ref={schoolNameRef}
                        value={schoolName}
                        onChange={handleSchoolNameInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="schoolType">SchoolType:</label>
                    <input
                        className="form__input"
                        type="schoolType"
                        id="schoolType"
                        onChange={handlePwdInput}
                        value={schoolType}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                </form>
            </main>
            
        </section>
    )

    return content
}
export default NewSchool;