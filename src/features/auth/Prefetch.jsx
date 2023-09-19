import { store } from "../../app/store";
import { schoolsApiSlice } from "../teachers/teachersApiSlice";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    // console.log('subscribing')
    store.dispatch(
      schoolsApiSlice.util.prefetch("getSchools", "schoolsList", {
        force: true,
      })
    );

   
  }, []);

  return <Outlet />;
};
export default Prefetch;
