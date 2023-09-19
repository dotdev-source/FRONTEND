import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
// import usePersist from "../../hooks/usePersist";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  // const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <div className="grid h-screen grid-cols-[500px_1fr] bg-white">
      <img alt="" src="" className="h-full w-full" />
      <section className="relative flex h-full w-full flex-col justify-center pl-[207px] pr-[74px]">
        <h3 className="text-2xl font-bold leading-9 text-black">Sign in</h3>
        <main className="mt-10 w-full">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>

          <form className="form w-full" onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-[21px] text-[#333]"
              >
                Email Address
              </label>
              <input
                className="w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565]"
                type="text"
                id="email"
                ref={emailRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-[21px] text-[#333]"
              >
                Password
              </label>
              <input
                className="w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565]"
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                required
              />
            </div>
            <div className="mt-10 flex justify-end gap-x-6">
              <button className="rounded border-2 border-solid border-[#403294] bg-white px-8 py-2 text-base font-medium text-[#403294]">
                Cancel
              </button>
              <button className="bg-[#403294] px-8 py-2 text-base font-medium text-white">
                Sign In
              </button>
            </div>
          </form>
        </main>
        <p className="absolute bottom-[48px] text-center text-base font-normal text-black">
          Don't have an account{" "}
          <span className="font-medium text-[#403294]">
            <Link to="/signup">signup here</Link>
          </span>
        </p>
      </section>
    </div>
  );

  return content;
};
export default Login;
