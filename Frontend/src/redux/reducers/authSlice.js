// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // حفظ بيانات المستخدم
        },
        registerFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user'); // حذف بيانات المستخدم
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const { 
    registerStart, registerSuccess, registerFailed, 
    loginStart, loginSuccess, loginFailed, 
    logout, clearError 
} = authSlice.actions;

export default authSlice.reducer;
