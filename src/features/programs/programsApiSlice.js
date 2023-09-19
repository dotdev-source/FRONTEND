import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const programsAdapter = createEntityAdapter({});

const initialState = programsAdapter.getInitialState();

export const programsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query({
      query: () => ({
        url: "/programs",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      
      transformResponse: response => {
        const loadedPrograms = response.data?.map(program => {
            program.id = program._id
          return program
        });
        return programsAdapter.setAll(initialState, loadedPrograms);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Programs", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Programs", id })),
          ];
        } else return [{ type: "Programs", id: "LIST" }];
      },
    }),
    addNewProgram: builder.mutation({
      query: (initialProgram) => ({
        url: "/program",
        method: "POST",
        body: { ...initialProgram },
      }),
      invalidatesTags: [{ type: "Programs", id: "LIST" }],
    }),
    updateProgram: builder.mutation({
      query: (initialProgram) => ({
        url: "program/:id",
        method: "PUT",
        body: { ...initialProgram },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Program", id: arg.id },
      ],
    }),
    deleteProgram: builder.mutation({
      query: ({ id }) => ({
        url: "program/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Program", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useAddNewProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} = programsApiSlice;

// returns the query result object
export const selectProgramResult =
  programsApiSlice.endpoints.getPrograms.select();

// creates memoized selector
const selectProgramData = createSelector(
  selectProgramResult,
  (programResult) => programResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProgram,
  selectById: selectProgramById,
  selectIds: selectProgramIds,
  // Pass in a selector that returns the users slice of state
} = programsAdapter.getSelectors(
  (state) => selectProgramData(state) ?? initialState
);
