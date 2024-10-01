import { createSlice } from "@reduxjs/toolkit";


const playerSlice = createSlice({
    name: 'player',
    initialState: { isPlayerDiv: false, songPath: "", img: ""},
    reducers: {
        setDiv(state){
            state.isPlayerDiv = true
        },
        closeDiv(state){
            state.isPlayerDiv = false
        },
        changeSong(state, action){
            state.songPath = action.payload
        },
        changeImg(state, action){
            state.img = action.payload
        }  
    }
})

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;