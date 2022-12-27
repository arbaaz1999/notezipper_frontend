import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("token");

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:443/api",
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    getUser: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/users/update-profile",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authAPI;
