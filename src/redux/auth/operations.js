// auth - autorizations
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Utility to add JWT - (token)
const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT - token
const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};
// POST @/users/signup
export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post('/users/signup', credentials);
            // After successful registration, add the token to the HTTP header
            setAuthHeader(response.data.token);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/login
 * body: { email, password } = credentials
 */
export const logIn = createAsyncThunk(
    'auth/login',
    async (userInfo, thunkAPI) => {
        try {
            const { data } = await axios.post('/users/login', userInfo);
            // After successful login, add the token to the HTTP header
            setAuthHeader(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        // After a successful logout, remove the token from the HTTP header
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */

export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkAPI) => {
        const reduxState = thunkAPI.getState();
        setAuthHeader(reduxState.auth.token);
        const response = await axios.get("/users/current");
        return response.data;
    },
    {
        condition: (_, thunkAPI) => {
            const reduxState = thunkAPI.getState();
            return reduxState.auth.token !== null;
        },
    }
);

export default axios
// приклад нижче ( з умовою)
// export const refreshUser = createAsyncThunk(
//     'auth/refresh',
//     async (_, thunkAPI) => {
//         // Reading the token from the state via getState()
//         const state = thunkAPI.getState();
//         const persistedToken = state.auth.token;

//         if (persistedToken === null) {
//             // If there is no token, exit without performing any request
//             return thunkAPI.rejectWithValue('Unable to fetch user');
//         }

//         try {
//             // If there is a token, add it to the HTTP header and perform the request
//             setAuthHeader(persistedToken);
//             const { data } = await axios.get('/users/me');
//             return data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );




