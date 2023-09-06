import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2020/api/v1" }),
  tagTypes: ["Admin", "edmass"],
  endpoints: (builder) => ({}),
});
