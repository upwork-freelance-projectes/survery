import {createSlice } from "@reduxjs/toolkit"

export const questionSlice = createSlice({
    name: 'question',
    initialState:{
        answer: "",
        location: ''
    },

    reducers:{
        setAnswer: (state, action) => {
            // state.location = action.payload.location,
            // state.answer = action.payload.answer
           return {...state, location: action.payload.location, answer: action.payload.answer }
        }
    }
})

export const { setAnswer } = questionSlice.actions

export default questionSlice.reducer;