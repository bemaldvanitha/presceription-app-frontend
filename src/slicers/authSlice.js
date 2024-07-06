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
    })
});

export const { useLoginMutation } = authApiSlice;