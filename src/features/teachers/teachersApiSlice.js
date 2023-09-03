import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const teachersAdapter = createEntityAdapter({});

const initialState = teachersAdapter.getInitialState();

export const teachersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedTeachers = responseData.map((teacher) => {
          teacher.id = teacher._id;
          return teacher;
        });
        return teachersAdapter.setAll(initialState, loadedTeachers);
      },
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [
            { type: "teacher", id: "LIST" },
            ...result.ids.map((id) => ({ type: "teacher", id })),
          ];
        } else return [{ type: "teacher", id: "LIST" }];
      },
    }),
    addNewTeacher: builder.mutation({
      query: (initialTeacher) => ({
        url: "teachers",
        method: "POST",
        body: { ...initialTeacher },
      }),
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),
    updateTeacher: builder.mutation({
      query: (initialTeacher) => ({
        url: "teachers/:id",
        method: "PUT",
        body: { ...initialTeacher },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Teacher", id: arg.id },
      ],
    }),
    deleteTeacher: builder.mutation({
      query: ({ id }) => ({
        url: "teacher/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Teacher", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useAddNewTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApiSlice;

// returns the query result object
export const selectTeachersResult =
  teachersApiSlice.endpoints.getTeachers.select();

// creates memoized selector
const selectTeachersData = createSelector(
  selectTeachersResult,
  (teachersResult) => teachersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTeachers,
  selectById: selectTeachersById,
  selectIds: selectTeachersIds,
  // Pass in a selector that returns the users slice of state
} = teachersAdapter.getSelectors(
  (state) => selectTeachersData(state) ?? initialState
);
