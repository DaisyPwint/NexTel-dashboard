import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomRequests : [
        {
          id: '001',
          no: 101,
          type: 'Single',
          floor: 1,
          status: 'occupied'
        },
        {
          id: '002',
          no: 102,
          type: 'Double',
          floor: 1,
          status: 'available'
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