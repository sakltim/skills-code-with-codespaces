import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { users } from './userData';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const response = await axios.get('/api/user');
    return response.data;
});

const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    usernameExists: false,
    userData: null,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        resetUsernameExists: (state) => {
            state.usernameExists = false;
        },
        setUsernameExists: (state, action) => {
            state.usernameExists = action.payload;
        },
        registerUser: (state, action) => {
            debugger;
            const { username, password, firstName, lastName } = action.payload;
            console.log(users);
            state.usernameExists = users.some(user => user.username === username);
            if (!state.usernameExists) {
                users.push({ username, password, firstName, lastName });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUsername, setPassword, setFirstName, setLastName, setUsernameExists, resetUsernameExists, registerUser } = userSlice.actions;
export default userSlice.reducer;
