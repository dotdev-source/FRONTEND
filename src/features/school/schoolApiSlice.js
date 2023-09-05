import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const schoolAdapter = createEntityAdapter({});

const initialState = schoolAdapter.getInitialState();

export const schoolApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchool: builder.query({
      query: () => "/school",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedSchool = responseData.map((school) => {
          school.id = school._id;
          return school;
        });
        return schoolAdapter.setAll(initialState, loadedSchool);
      },
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [
            { type: "School", id: "LIST" },
            ...result.ids.map((id) => ({ type: "School", id })),
          ];
        } else return [{ type: "School", id: "LIST" }];
      },
    }),
    addNewSchool: builder.mutation({
      query: (initilaSchoolData) => ({
        url: "/school",
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
} = schoolApiSlice;

// returns the query result object
export const selectSchoolResult =
  schoolApiSlice.endpoints.getSchool.select();

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
} = schoolAdapter.getSelectors(
  (state) => selectSchoolData(state) ?? initialState
);
