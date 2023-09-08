import { useState, useEffect } from "react";
import { useAddNewSchoolMutation } from "./schoolApiSlice";
import { useNavigate } from "react-router-dom";

const FIELDS_REGEX = /^[a-z ,.'-]+$/i;

const NewSchool = () => {
  const [addNewSchool, { isLoading, isSuccess, isError, error }] =
    useAddNewSchoolMutation();

  const navigate = useNavigate();

  const [schoolname, setSchoolname] = useState("");
  const [validSchoolname, setValidSchoolname] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [validRegNo, setValidRegNo] = useState(false);
  const [schoolType, setSchoolType] = useState("");
  const [validSchoolType, setValidSchoolType] = useState(false);
    const [address, setAddress] = useState("")
    const [validAddress, setValidAddress] = useState(false)
    
  useEffect(() => {
    setValidSchoolname(FIELDS_REGEX.test(schoolname));
  }, [schoolname]);

  useEffect(() => {
    setValidRegNo(FIELDS_REGEX.test(regNo));
  }, [regNo]);

  useEffect(() => {
    setValidSchoolType(FIELDS_REGEX.test(schoolType));
  }, [schoolType]);

  useEffect(() => {
    setValidRegNo(FIELDS_REGEX.test(regNo));
  }, [regNo]);
    
  useEffect(() => {
    setValidAddress(FIELDS_REGEX.test(address));
  }, [address]);

  useEffect(() => {
    if (isSuccess) {
      setSchoolname("");
        setRegNo("");
        setSchoolType("");
        setAddress("");
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  const onSchoolnameChanged = (e) => setSchoolname(e.target.value);
    const onRegNoChanged = (e) => setRegNo(e.target.value);
    const onSchoolTypeChanged = (e) => setSchoolType(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);





  const canSave =
    [validSchoolname, validRegNo, validSchoolType, validAddress ].every(Boolean) && !isLoading;

  const onSaveSchoolClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewSchool({ schoolname, regNo, schoolType, address });
    }
  };


  const errClass = isError ? "errmsg" : "offscreen";
  const validSchoolClass = !validSchoolname ? "form__input--incomplete" : "";
    const validRegNoClass = !validRegNo ? "form__input--incomplete" : "";
    const validSchoolTypeClass = !validSchoolType ? "form__input--incomplete" : "";
    const validAddressClass = !validAddress ? "form__input--incomplete" : "";

  
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveSchoolClicked}>
        <div className="form__title-row">
          <h2>CreateNew School</h2>
         
        </div>
        <label className="form__label" htmlFor="schoolname">
          Schoolname: 
        </label>
        <input
          className={`form__input ${validSchoolClass}`}
          id="schoolname"
          name="schoolname"
          type="text"
          autoComplete="off"
          value={schoolname}
          onChange={onSchoolnameChanged}
        />

        <label className="form__label" htmlFor="regNo">
          RegNo: 
        </label>
        <input
          className={`form__input ${validRegNoClass}`}
          id="regNo"
          name="regNo"
          type="text"
          value={regNo}
          onChange={onRegNoChanged}
              />
              
              <label className="form__label" htmlFor="schoolType">
          School Type: 
        </label>
        <input
          className={`form__input ${validSchoolTypeClass}`}
          id="schoolType"
          name="schoolType"
          type="text"
          value={schoolType}
          onChange={onSchoolTypeChanged}
              />
              
              <label className="form__label" htmlFor="address">
          School Address: 
        </label>
        <input
          className={`form__input ${validAddressClass}`}
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={onAddressChanged}
        />
 <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >Create</button>
          </div>
        
      </form>
    </>
  );

  return content;
};
export default NewSchool;
