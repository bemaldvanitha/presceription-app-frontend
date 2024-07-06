import { AUTH_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response) => {
                const { token } = response;
                if(token){
                    localStorage.setItem('token', token);
                }
                return response;
            }
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/update`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useLoginMutation, useSignupMutation, useRegisterMutation, useUpdateUserMutation } = authApiSlice;