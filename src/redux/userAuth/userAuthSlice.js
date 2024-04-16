import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialUser,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isLoading = false;
            state.error = null;
        },
        setIsLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { login, setIsLoading, setError} = userAuthSlice.actions;
export default userAuthSlice.reducer