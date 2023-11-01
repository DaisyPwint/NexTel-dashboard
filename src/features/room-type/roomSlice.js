import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomRequests : [
        {
          id: '001',
          number: 101,
          type: 'Single',
          floor: 1,
          status: 'Occupied'
        },
        {
          id: '002',
          number: 102,
          type: 'Double',
          floor: 1,
          status: 'Available'
        },
        {
          id: '003',
          number: 103,
          type: 'Family',
          floor: 1,
          status: 'Maintained'
        }
      ]
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addRoom : (state,{payload}) => {
            return {
                ...state,
                roomRequests: [...state.roomRequests,...payload]
            }
        }
    }
})

export const {addRoom} = roomSlice.actions;
export default roomSlice.reducer;

export const selectAllRooms = (state) => state.room.roomRequests;