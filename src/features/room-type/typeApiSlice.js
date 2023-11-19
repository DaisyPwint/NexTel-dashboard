import { apiSlice } from "../../app/services/apiSlice";

const typeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoomType: builder.query({
            query: () => '/room-types'
        }),
        addRoomType: builder.mutation({
            query: (newType) => ({
                url: '/room-types',
                method: "POST",
                body: newType
            })
        })
    })
})

export const { useGetRoomTypeQuery, useAddRoomTypeMutation} = typeApiSlice;