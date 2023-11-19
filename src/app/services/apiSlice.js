import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.100:8080/api',
        credentials: 'include',
        prepareHeaders: ((headers,{getState}) => {
            const token = getState().auth.token;
            if(token){
                headers.set('authorization',`Bearer ${token}`)
                return  headers
            }
        })
    }),
    endpoints: () => ({})
})