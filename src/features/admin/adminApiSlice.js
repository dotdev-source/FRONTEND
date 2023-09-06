import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const adminAdapter = createEntityAdapter({});

const initialState = adminAdapter.getInitialState();

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => "/admin",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedAdmin = responseData.map((admin) => {
          admin.id = admin._id;
          return admin;
        });
        return adminAdapter.setAll(initialState, loadedAdmin);
      },
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [
            { type: "admin", id: "LIST" },
            ...result.ids.map((id) => ({ type: "admin", id })),
          ];
        } else return [{ type: "admin", id: "LIST" }];
      },
    }),
    addNewAdmin: builder.mutation({
      query: (initialAdmin) => ({
        url: "/admin",
        method: "POST",
        body: { ...initialAdmin },
      }),
      invalidatesTags: [{ type: "Admin", id: "LIST" }],
    }),
    updateAdmin: builder.mutation({
      query: (initialAdmin) => ({
        url: "admin/:id",
        method: "PUT",
        body: { ...initialAdmin },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Admin", id: arg.id },
      ],
    }),
    deleteAdmin: builder.mutation({
      query: ({ id }) => ({
        url: "admin/:id",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Admin", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAdminQuery,
  useAddNewAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApiSlice;

// returns the query result object
export const selectAdminResult =
  adminApiSlice.endpoints.getAdmin.select();

// creates memoized selector
const selectAdminData = createSelector(
  selectAdminResult,
  (adminResult) => adminResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAdmin,
  selectById: selectAdminById,
  selectIds: selectAdminIds,
  // Pass in a selector that returns the users slice of state
} = adminAdapter.getSelectors(
  (state) => selectAdminData(state) ?? initialState
);
