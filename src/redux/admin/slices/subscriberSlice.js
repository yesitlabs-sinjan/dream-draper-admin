import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../Api";
import { toast } from "react-toastify";

function logouterror() {
    toast.error("Token Expired")
    localStorage.removeItem("dreamDrapperAminToken");
    setTimeout(() => {
        window.location.href = "/";
    }, 1000);
}

async function checkLogin() {
    const token = localStorage.getItem("dreamDrapperAminToken");
    console.log("token", token)
    if (!token) {
        console.log("hello object")
        window.location.href = "/";
    }
}

// Async thunk (API call)
export const getAllSubscribers = createAsyncThunk(
    "admin/getAllSubscribers",
    async (_, { rejectWithValue }) => {
        try {
             await checkLogin()
            const response = await api.fetchAllSubscribers();
            console.log("response", response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



const subscriberSlice = createSlice({
    name: "subscribers",
    initialState: {
        loading: false,
        error: null,
        allSubscribers: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubscribers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubscribers.fulfilled, (state, action) => {
                state.allSubscribers = action.payload.data
                state.loading = false;
                // toast.success(action?.payload?.message || "Showcases category updated")
            })
            .addCase(getAllSubscribers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                if (action?.payload?.status == 403) {
                    logouterror()
                }
                toast.error(action?.payload?.message)
            });
    }
})


export default subscriberSlice.reducer