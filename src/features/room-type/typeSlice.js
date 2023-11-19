import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    types: [
        // {
        //   id: '9bbaf287-991b-4af5-897d-f27fd0db297g',
        //   name: 'Single',
        //   maximumCapacity: 1,
        //   pricePerNight: 120,
        //   size: '2000',
        //   amenityIds: [1,3],
        //   imageUrl: 'signleRoom.jpg',
        //   description: 'single room'
        // }
      ]
}

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        setReservation : (state,{payload}) => {
            state.types = payload;
        },
        addType: (state,{payload}) => {
            return {
                ...state,
                types: [...state.types,payload]
            }
        },
        editType: (state,{payload}) => {
            console.log(payload);
            return {
                ...state,
                types: state.types.map(type => type.id === payload.id ? {...type,...payload} : type)
            }
        }
    }
})

export const {setReservation,addType,editType} = typeSlice.actions;

export default typeSlice.reducer;

export const selectAllTypes = (state) => state.type.types;

export const selectTypeById = (state,typeId) => state.type.types.find((type) => type.id === typeId);

