import { useState, useEffect } from "react";
import { useAddNewSchoolMutation } from "./schoolApiSlice";
import { useNavigate } from "react-router-dom";

const FIELDS_REGEX = /^[a-z ,.'-]+$/i;

const NewSchool = () => {
  const [addNewSchool, { isLoading, isSuccess, isError, error }] =
    useAddNewSchoolMutation();

  const navigate = useNavigate();

  const [schoolName, setSchoolName] = useState("");
  const [validSchoolName, setValidSchoolName] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [validRegNo, setValidRegNo] = useState(false);
  const [schoolType, setSchoolType] = useState("");
  const [validSchoolType, setValidSchoolType] = useState(false);
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);

  useEffect(() => {
    setValidSchoolName(FIELDS_REGEX.test(schoolName));
  }, [schoolName]);

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
      setSchoolName("");
      setRegNo("");
      setSchoolType("");
      setAddress("");

      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  const onSchoolNameChanged = (e) => setSchoolName(e.target.value);
  const onRegNoChanged = (e) => setRegNo(e.target.value);
  const onSchoolTypeChanged = (e) => setSchoolType(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);

  const canSave =
    [validSchoolName, validRegNo, validSchoolType, validAddress].every(
      Boolean
    ) && !isLoading;

  const onSaveSchoolClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewSchool({ schoolName, regNo, schoolType, address });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validSchoolClass = !validSchoolName ? "form__input--incomplete" : "";
  const validRegNoClass = !validRegNo ? "form__input--incomplete" : "";
  const validSchoolTypeClass = !validSchoolType
    ? "form__input--incomplete"
    : "";
  const validAddressClass = !validAddress ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveSchoolClicked}>
        <div className="form__title-row">
          <h2>CreateNew School</h2>
        </div>
        <label className="form__label" htmlFor="schoolName">
          SchoolName:
        </label>
        <input
          className={`form__input ${validSchoolClass}`}
          id="schoolName"
          name="schoolName"
          type="text"
          autoComplete="off"
          value={schoolName}
          onChange={onSchoolNameChanged}
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
          <button className="icon-button" title="Save" disabled={!canSave}>
            Create
          </button>
        </div>
      </form>
    </>
  );

  return content;
};
export default NewSchool;
