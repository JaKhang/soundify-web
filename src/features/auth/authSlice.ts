import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Principal from "@features/auth/Principal.ts";
import accountApi from "../../api/AccountApi.ts";

export interface AuthSate {
    principal: Principal | null;
    loading: boolean;
    accessToken: string | null;
}

const initialState: AuthSate = {
    principal: null,
    loading: false,
    accessToken: null,
};

export const getPrincipal = createAsyncThunk(
    "auth/getPrincipal",
    async (accessToken: string, thunkAPI) => {

        try {
            return accountApi.getPrincipal()
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            return await accountApi.logout();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getPrincipal.pending, (state, action) => {
            state.loading = true;
            state.accessToken = action.meta.arg;
        });

        builder.addCase(getPrincipal.fulfilled, (state, action) => {
            state.loading = false;
            state.principal = action.payload || null;
        });
        builder.addCase(getPrincipal.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(logout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.principal = null
            state.accessToken = null;
        });
        builder.addCase(logout.rejected, (state) => {
            state.loading = false;
            state.principal = null
            state.accessToken = null;
        });
    }
});
export default authSlice;
