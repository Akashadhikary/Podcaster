import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"
import playerReducer from "./Player";

const store = configureStore({
    reducer: {
        auth: authReducer,
        Player : playerReducer
    }
})

export default store;