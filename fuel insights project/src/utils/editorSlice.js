import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
    name : 'editorSlice',
    initialState : {
       course : null
    },
    reducers : {
        addCourseToStore : (state, action)=>{
                state.course = action.payload;
        },
        addSectionToStore : (state, action)=>{
               if(state.course) state.course.content.push(action.payload);
        },
        removeSection : (state, action)=>{
            const sectionId = action.payload;
            state.course.content = state.course.content.filter((section)=>section._id != sectionId);  
        }
    }
})

const {addCourseToStore, addSectionToStore, removeSection} = editorSlice.actions;
export {addCourseToStore, addSectionToStore, removeSection}
export default editorSlice.reducer;