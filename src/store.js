import { configureStore } from "@reduxjs/toolkit";
import typeReducer from './features/room-type/typeSlice';
import roomReducer from "./features/room-type/roomSlice";

const store = configureStore({
    reducer: {
        type: typeReducer,
        room: roomReducer
    }
})

export default store;

