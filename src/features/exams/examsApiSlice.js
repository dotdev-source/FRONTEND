import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const examsAdapter = createEntityAdapter({});

const initialState = examsAdapter.getInitialState();

export const examsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => ({
        url: "/exams",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      
      transformResponse: response => {
        const loadedExams = response.data?.map(exam => {
            exam.id = exam._id
          return exam
        });
        return examsAdapter.setAll(initialState, loadedExams);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Exams", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Exams", id })),
          ];
        } else return [{ type: "Exams", id: "LIST" }];
      },
    }),
    addNewExam: builder.mutation({
      query: (initialExam) => ({
        url: "/exam",
        method: "POST",
        body: { ...initialExam },
      }),
      invalidatesTags: [{ type: "Exams", id: "LIST" }],
    }),
    updateExam: builder.mutation({
      query: (initialExam) => ({
        url: "exam/:id",
        method: "PUT",
        body: { ...initialExam },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Exam", id: arg.id },
      ],
    }),
    deleteExam: builder.mutation({
      query: ({ id }) => ({
        url: "exam-level/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Exam", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useAddNewexamMutation,
  useUpdateexamMutation,
  useDeleteexamMutation,
} = examsApiSlice;

// returns the query result object
export const selectExamResult =
  examsApiSlice.endpoints.getExams.select();

// creates memoized selector
const selectExamData = createSelector(
  selectExamResult,
  (examResult) => examResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllExam,
  selectById: selectExamById,
  selectIds: selectExamIds,
  // Pass in a selector that returns the users slice of state
} = examsAdapter.getSelectors(
  (state) => selectExamData(state) ?? initialState
);
