import { configureStore } from "@reduxjs/toolkit";
import refSlice from "./refSlice";
import userSlice from "./userSlice";
import editorSlice from "./editorSlice";

const store = configureStore({
    reducer : {
        refSlice : refSlice,
        userSlice : userSlice,
        editorSlice : editorSlice
    }
})

export default store;