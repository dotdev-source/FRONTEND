import { useState, useEffect } from "react";
import { useAddNewSchoolMutation } from "./schoolApiSlice";
import { useNavigate, Link } from "react-router-dom";
import banner from "../../../public/banner.jpg";

const FIELDS_REGEX = /^[a-z ,.'-]+$/i;

const NewSchool = () => {
  const [
    addNewSchool,
    {
      isLoading,
      isSuccess,
      //  isError, error
    },
  ] = useAddNewSchoolMutation();

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

      navigate("/dashboard/schools");
    }
  }, [isSuccess, navigate]);

  const onSchoolNameChanged = (e) => setSchoolName(e.target.value);
  const onRegNoChanged = (e) => setRegNo(e.target.value);
  const onSchoolTypeChanged = (e) => setSchoolType(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);

  const canSave =
    [validSchoolName, validRegNo, validSchoolType, validAddress].every(
      Boolean,
    ) && !isLoading;

  const onSaveSchoolClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewSchool({ schoolName, regNo, schoolType, address });
    }
  };

  // const errClass = isError ? "errmsg" : "offscreen";
  const validSchoolClass = !validSchoolName ? "form__input--incomplete" : "";
  const validRegNoClass = !validRegNo ? "form__input--incomplete" : "";
  const validSchoolTypeClass = !validSchoolType
    ? "form__input--incomplete"
    : "";
  const validAddressClass = !validAddress ? "form__input--incomplete" : "";

  const content = (
    <div className="grid h-screen grid-cols-[500px_1fr] bg-white">
      <img alt="" src={banner} className="h-full w-full" />
      <section className="relative flex h-full w-full flex-col pl-[207px] pr-[74px] pt-[88px]">
        <h3 className="text-2xl font-bold leading-9 text-black">
          Create Your School
        </h3>
        <main className="mt-10 w-full">
          {/* <p className={errClass}>{error?.data?.message}</p> */}

          <form className="form w-full" onSubmit={onSaveSchoolClicked}>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                className="text-sm font-medium leading-[21px] text-[#333]"
                htmlFor="schoolName"
              >
                SchoolName
              </label>
              <input
                className={`w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565] ${validSchoolClass}`}
                id="schoolName"
                name="schoolName"
                type="text"
                autoComplete="off"
                value={schoolName}
                onChange={onSchoolNameChanged}
              />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                className="text-sm font-medium leading-[21px] text-[#333]"
                htmlFor="regNo"
              >
                RegNo
              </label>
              <input
                className={`w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565] ${validRegNoClass}`}
                id="regNo"
                name="regNo"
                type="text"
                value={regNo}
                onChange={onRegNoChanged}
              />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                className="text-sm font-medium leading-[21px] text-[#333]"
                htmlFor="schoolType"
              >
                School Type:
              </label>
              <input
                className={`w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565] ${validSchoolTypeClass}`}
                id="schoolType"
                name="schoolType"
                type="text"
                value={schoolType}
                onChange={onSchoolTypeChanged}
              />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                className="text-sm font-medium leading-[21px] text-[#333]"
                htmlFor="address"
              >
                School Address:
              </label>
              <input
                className={`w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565] ${validAddressClass}`}
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={onAddressChanged}
              />
            </div>
            <div className="mt-10 flex justify-end gap-x-6">
              <button className="rounded border-2 border-solid border-[#403294] bg-white px-8 py-2 text-base font-medium text-[#403294]">
                Cancel
              </button>
              <button
                className="bg-[#403294] px-8 py-2 text-base font-medium text-white"
                title="Save"
                disabled={!canSave}
              >
                Create
              </button>
            </div>
          </form>
        </main>
        <p className="absolute bottom-[48px] text-center text-base font-normal text-black">
          Already have an account?
          <span className="font-medium text-[#403294]">
            <Link to="/signup">signup here</Link>
          </span>
        </p>
      </section>
    </div>
  );

  return content;
};
export default NewSchool;
