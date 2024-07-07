import { AUTH_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token');

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
            transformResponse: (response) => {
                const { jwtToken } = response;
                if (jwtToken) {
                    localStorage.setItem('token', jwtToken);
                }
                return response;
            }
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response) => {
                const { jwtToken } = response;
                if (jwtToken) {
                    localStorage.setItem('token', jwtToken);
                }
                return response;
            }
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': getToken()
                }
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/update`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': getToken()
                }
            })
        })
    })
});

export const { useLoginMutation, useSignupMutation, useRegisterMutation, useUpdateUserMutation } = authApiSlice;