import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reservations : []
}

const reserveSlice = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        setReservations: (state,{payload}) => {
            state.reservations = payload;
        }
    }
})

export const {setReservations} = reserveSlice.actions;

export default reserveSlice.reducer;

export const allReservation = state => state.reserve.reservations;


