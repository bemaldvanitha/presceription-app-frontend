import { apiSlice } from "./apiSlice";

import { PRESCRIPTION_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

export const prescriptionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPrescription: builder.mutation({
            query: (data) => ({
                url: PRESCRIPTION_URL,
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': getToken()
                }
            })
        }),
        getAllPrescription: builder.query({
            query: () => ({
                url: PRESCRIPTION_URL,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 5
        }),
        searchPrescription: builder.query({
            query: (searchWord) => ({
                url: `${PRESCRIPTION_URL}/search?searchTerm=${searchWord}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 5,
        }),
        filterPrescription: builder.query({
            query: (date) => ({
                url: `${PRESCRIPTION_URL}/filter?createdAt=${date}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 5
        }),
        getSinglePrescription: builder.query({
            query: (id) => ({
                url: `${PRESCRIPTION_URL}/${id}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 5
        }),
        getPrescriptionAnalytics: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `${PRESCRIPTION_URL}/analysis?startDate=${startDate}&endDate=${endDate}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 5
        }),
        getPrescriptionToPatient: builder.query({
            query: (patientName) => ({
                url: `${PRESCRIPTION_URL}/patient?patientName=${patientName}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useAddPrescriptionMutation, useGetAllPrescriptionQuery, useSearchPrescriptionQuery, useFilterPrescriptionQuery,
   useGetSinglePrescriptionQuery, useGetPrescriptionAnalyticsQuery, useGetPrescriptionToPatientQuery } = prescriptionSlice;