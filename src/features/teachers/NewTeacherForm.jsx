import React from "react";
import { useState, useEffect } from "react";
import { useAddNewTeacherMutation } from "./teachersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const FULLNAME_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewTeacherForm = () => {
  const [addNewTeacher, { isLoading, isSuccess, isError, error }] =
    useAddNewTeacherMutation();

  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [validFullname, setValidFullname] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["admin"]);

  useEffect(() => {
    setValidFullname(FULLNAME_REGEX.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setFullname("");
      setPassword("");
      setRoles([]);
      navigate("/dashboard/teachers");
    }
  }, [isSuccess, navigate]);

  const onFullnameChanged = (e) => setFullname(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validFullname, validPassword].every(Boolean) && !isLoading;

  const onSaveTeacherClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewTeacher({ fullname, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });
    
  const errClass = isError ? "errmsg" : "offscreen"
    const validFullnameClass = !validFullname ? 'form__input--incomplete' : ''
  const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
        
  const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveTeacherClicked}>
                <div className="form__title-row">
                    <h2>New Teacher</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="teachername">
                    Teachername: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validFullnameClass}`}
                    id="teachername"
                    name="teachername"
                    type="text"
                    autoComplete="off"
                    value={fullname}
                    onChange={onFullnameChanged}
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

    return content;
};

export default NewTeacherForm;
