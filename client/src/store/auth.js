import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},  
    reducers: {
        signin(state){
            state.isLoggedIn = true
        },
        signout(state){
            state.isLoggedIn = false
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;