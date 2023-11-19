import { apiSlice } from "../../app/services/apiSlice";

const reserveApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        newReserve: builder.query({
            query: () => '/reservations/count'
        }),
        getFilterRoom: builder.query({
            query: ({year,month}) => `/reserved-rooms/month?month=${month}&year=${year}`
        }),
        getDailyIncome: builder.query({
            query: ({year,month}) => `/reservations/daily-income?month=${month}&year=${year}`
        }),
        getReservations: builder.query({
            query: () => '/reservations'
        }),
        getReserveById : builder.query({
            query: (id) => `/reservations/${id}`
        })
    }),
});

export const { useNewReserveQuery,useGetFilterRoomQuery,useGetDailyIncomeQuery,useGetReservationsQuery,useGetReserveByIdQuery } = reserveApiSlice;
