import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const subjectsAdapter = createEntityAdapter({});

const initialState = subjectsAdapter.getInitialState();

export const subjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => ({
        url: "/subjects",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      
      transformResponse: response => {
        const loadedSubjects = response.data?.map(subject => {
            subject.id = subject._id
          return subject
        });
        return subjectsAdapter.setAll(initialState, loadedSubjects);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Subjects", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Subjects", id })),
          ];
        } else return [{ type: "Subjects", id: "LIST" }];
      },
    }),
    addNewSubject: builder.mutation({
      query: (initialSubject) => ({
        url: "/subject",
        method: "POST",
        body: { ...initialSubject },
      }),
      invalidatesTags: [{ type: "Subjects", id: "LIST" }],
    }),
    updateSubject: builder.mutation({
      query: (initialSubject) => ({
        url: "subject/:id",
        method: "PUT",
        body: { ...initialSubject },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Subject", id: arg.id },
      ],
    }),
    deleteSubject: builder.mutation({
      query: ({ id }) => ({
        url: "subject-level/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Subject", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useAddNewsubjectMutation,
  useUpdatesubjectMutation,
  useDeletesubjectMutation,
} = subjectsApiSlice;

// returns the query result object
export const selectSubjectResult =
  subjectsApiSlice.endpoints.getSubjects.select();

// creates memoized selector
const selectSubjectData = createSelector(
  selectSubjectResult,
  (subjectResult) => subjectResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSubject,
  selectById: selectSubjectById,
  selectIds: selectSubjectIds,
  // Pass in a selector that returns the users slice of state
} = subjectsAdapter.getSelectors(
  (state) => selectSubjectData(state) ?? initialState
);
