import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const classesAdapter = createEntityAdapter({});

const initialState = classesAdapter.getInitialState();

export const classesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => ({
        url: "/class-levels",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      
      transformResponse: response => {
        const loadedClasses = response.data?.map(classLevel => {
            classLevel.id = classLevel._id
          return classLevel
        });
        return classesAdapter.setAll(initialState, loadedClasses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Class", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Classs", id })),
          ];
        } else return [{ type: "Classs", id: "LIST" }];
      },
    }),
    addNewClass: builder.mutation({
      query: (initialClass) => ({
        url: "/class-level",
        method: "POST",
        body: { ...initialClass },
      }),
      invalidatesTags: [{ type: "Class", id: "LIST" }],
    }),
    updateClass: builder.mutation({
      query: (initialClass) => ({
        url: "class-level/:id",
        method: "PUT",
        body: { ...initialClass },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Class", id: arg.id },
      ],
    }),
    deleteClass: builder.mutation({
      query: ({ id }) => ({
        url: "class-level/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Class", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetClassQuery,
  useAddNewclassMutation,
  useUpdateclassMutation,
  useDeleteclassMutation,
} = classesApiSlice;

// returns the query result object
export const selectClassResult =
  classesApiSlice.endpoints.getClasss.select();

// creates memoized selector
const selectClassData = createSelector(
  selectClassResult,
  (classResult) => classResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllClass,
  selectById: selectClassById,
  selectIds: selectClassIds,
  // Pass in a selector that returns the users slice of state
} = classesAdapter.getSelectors(
  (state) => selectClassData(state) ?? initialState
);
