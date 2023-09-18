import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const schoolsAdapter = createEntityAdapter({});

const initialState = schoolsAdapter.getInitialState();

export const schoolsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: () => "/schools",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedSchools = responseData.map((school) => {
          school.id = school._id;
          return school;
        });
        return schoolsAdapter.setAll(initialState, loadedSchools);
      },
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [
            { type: "School", id: "SCHOOLLIST" },
            ...result.ids.map((id) => ({ type: "School", id })),
          ];
        } else return [{ type: "School", id: "SCHOOLLIST" }];
      },
    }),
    addNewSchool: builder.mutation({
      query: (initilaSchoolData) => ({
        url: "schools/create",
        method: "POST",
        body: { ...initilaSchoolData },
      }),
      invalidatesTags: [{ type: "School", id: "LIST" }],
    }),
    updateSchool: builder.mutation({
      query: (initilaSchoolData) => ({
        url: "/school/:id",
        method: "PUT",
        body: { ...initilaSchoolData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "School", id: arg.id },
      ],
    }),
    deleteSchool: builder.mutation({
      query: ({ id }) => ({
        url: "/school/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "School", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetSchoolQuery,
  useAddNewSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolsApiSlice;

// returns the query result object
export const selectSchoolResult =
  schoolsApiSlice.endpoints.getSchool.select();

// creates memoized selector
const selectSchoolData = createSelector(
  selectSchoolResult,
  (schoolResult) => schoolResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSchool,
  selectById: selectSchoolById,
  selectIds: selectSchoolIds,
  // Pass in a selector that returns the users slice of state
} = schoolsAdapter.getSelectors(
  (state) => selectSchoolData(state) ?? initialState
);
