import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  function handleSubmit() {}

  return (
    <div className="grid h-screen grid-cols-[500px_1fr] bg-white">
      <img alt="" src="" className="h-full w-full" />
      <section className="relative flex h-full w-full flex-col pl-[207px] pr-[74px] pt-[88px]">
        <h3 className="text-2xl font-bold leading-9 text-black">
          Create Account
        </h3>
        <main className="mt-10 w-full">
          {/* <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p> */}

          <form className="form w-full" onSubmit={handleSubmit}>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium leading-[21px] text-[#333]"
              >
                Full Name
              </label>
              <input
                className="w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565]"
                type="text"
                id="fullName"
                autoComplete="off"
                required
              />
            </div>
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
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
              <label
                htmlFor="contact"
                className="text-sm font-medium leading-[21px] text-[#333]"
              >
                Contact
              </label>
              <input
                className="w-full rounded border-2 border-solid border-[#dfe1e6] bg-[#fafbfc] px-6 py-4 text-sm font-normal leading-5 text-[#656565]"
                type="text"
                id="contact"
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
                required
              />
            </div>
            <div className="mt-10 flex justify-end gap-x-6">
              <button className="rounded border-2 border-solid border-[#403294] bg-white px-8 py-2 text-base font-medium text-[#403294]">
                Cancel
              </button>
              <button className="bg-[#403294] px-8 py-2 text-base font-medium text-white">
                Register
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
};

export default Signup;
