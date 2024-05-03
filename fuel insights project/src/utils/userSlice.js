import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'userSlice',
    initialState : {
       user : null
    },
    reducers : {
        addUser : (state, action)=>{
                state.user = action.payload;
        },
    }
})

const {addUser} = userSlice.actions;
export {addUser}
export default userSlice.reducer;
