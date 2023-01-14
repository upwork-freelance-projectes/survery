import { createSlice }  from "@reduxjs/toolkit"

const progressSlice = createSlice({
    name: 'progress',
    initialState:{
        progress: 0
    },
    reducers:{
        setProgress: (state, action)=> {
            return {...state, progress: action.payload}
        }
    }
})


export const {setProgress} = progressSlice.actions
export default progressSlice.reducer