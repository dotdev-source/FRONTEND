import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const academicTermAdapter = createEntityAdapter({});

const initialState = academicTermAdapter.getInitialState();

export const academicTermApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicTerms: builder.query({
      query: () => ({
        url: "/academic-terms",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      
      transformResponse: response => {
        const loadedAcademicTerms = response.data?.map(academicTerm => {
            academicTerm.id = academicTerm._id
          return academicTerm
        });
        return academicTermAdapter.setAll(initialState, loadedAcademicTerms);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "AcademicTerms", id: "LIST" },
            ...result.ids.map((id) => ({ type: "AcademicTerms", id })),
          ];
        } else return [{ type: "AcademicTerms", id: "LIST" }];
      },
    }),
    addNewAcademicTerm: builder.mutation({
      query: (initialAcademicTerm) => ({
        url: "/academic-terms",
        method: "POST",
        body: { ...initialAcademicTerm },
      }),
      invalidatesTags: [{ type: "AcademicTerms", id: "LIST" }],
    }),
    updateAcademicTerm: builder.mutation({
      query: (initialAcademicTerm) => ({
        url: "academic-terms/:id",
        method: "PUT",
        body: { ...initialAcademicTerm },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AcademicTerm", id: arg.id },
      ],
    }),
    deleteAcademicTerm: builder.mutation({
      query: ({ id }) => ({
        url: "academic-terms/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AcademicTerm", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAcademicTermQuery,
  useAddNewTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = academicTermApiSlice;

// returns the query result object
export const selectAcademicTermResult =
  academicTermApiSlice.endpoints.getAcademicTerms.select();

// creates memoized selector
const selectAcademicTermData = createSelector(
  selectAcademicTermResult,
  (academicTermResult) => academicTermResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAcademicTerm,
  selectById: selectAcademicTermById,
  selectIds: selectAcademicTermIds,
  // Pass in a selector that returns the users slice of state
} = academicTermAdapter.getSelectors(
  (state) => selectAcademicTermData(state) ?? initialState
);
