import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("token");

export const notesAPI = createApi({
  reducerPath: "notesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:443/api",
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["Notes"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Notes"],
    }),
    getNote: builder.query({
      query: (id) => `/notes/${id}`,
      providesTags: ["Notes"],
    }),
    createNote: builder.mutation({
      query: (body) => ({
        url: "/notes/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Notes"],
    }),
    editNote: builder.mutation({
      query: (body) => ({
        url: "/notes/update",
        method: "PUT",
        body: body,
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useGetNoteQuery,
  useDeleteNoteMutation,
} = notesAPI;
