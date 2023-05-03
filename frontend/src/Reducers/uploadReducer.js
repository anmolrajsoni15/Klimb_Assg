import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const uploadReducer = createReducer(initialState, {
    uploadRequest: (state) => {
        state.loading = true;
    },
    uploadSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
    },
    uploadFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    clearErrors: (state) => {
        state.error = null;
    }
});