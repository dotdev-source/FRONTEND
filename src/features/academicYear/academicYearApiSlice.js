import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const academicYearAdapter = createEntityAdapter({});

const initialState = academicYearAdapter.getInitialState();

export const academicYearApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicYears: builder.query({
      query: () => ({
        url: "/academic-years",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      
      transformResponse: response => {
        const loadedAcademicYears = response.data?.map(academicYear => {
            academicYear.id = academicYear._id
          return academicYear
        });
        return academicYearAdapter.setAll(initialState, loadedAcademicYears);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "AcademicYears", id: "LIST" },
            ...result.ids.map((id) => ({ type: "AcademicYears", id })),
          ];
        } else return [{ type: "AcademicYears", id: "LIST" }];
      },
    }),
    addNewAcademicYear: builder.mutation({
      query: (initialAcademicYear) => ({
        url: "/academic-years",
        method: "POST",
        body: { ...initialAcademicYear },
      }),
      invalidatesTags: [{ type: "AcademicYears", id: "LIST" }],
    }),
    updateAcademicYear: builder.mutation({
      query: (initialAcademicYear) => ({
        url: "academic-years/:id",
        method: "PUT",
        body: { ...initialAcademicYear },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AcademicYear", id: arg.id },
      ],
    }),
    deleteAcademicYear: builder.mutation({
      query: ({ id }) => ({
        url: "academic-years/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AcademicYear", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAcademicYearQuery,
  useAddNewTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = academicYearApiSlice;

// returns the query result object
export const selectAcademicYearResult =
  academicYearApiSlice.endpoints.getAcademicYears.select();

// creates memoized selector
const selectAcademicYearData = createSelector(
  selectAcademicYearResult,
  (academicYearResult) => academicYearResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAcademicYear,
  selectById: selectAcademicYearById,
  selectIds: selectAcademicYearIds,
  // Pass in a selector that returns the users slice of state
} = academicYearAdapter.getSelectors(
  (state) => selectAcademicYearData(state) ?? initialState
);
