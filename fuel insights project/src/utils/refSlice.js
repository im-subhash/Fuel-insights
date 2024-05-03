import { createSlice } from "@reduxjs/toolkit";

const refSlice = createSlice({
    name : 'refSlice',
    initialState : {
        numberOfRef : 0
    },
    reducers : {
        addReference : (state, action)=>{
                state.numberOfRef = state.numberOfRef + 1;
        },
        removeReference :(state, action)=>{
              state.numberOfRef = state.numberOfRef - 1;
        }
    }
})

const {addReference, removeReference} = refSlice.actions;
export {addReference, removeReference}
export default refSlice.reducer;
