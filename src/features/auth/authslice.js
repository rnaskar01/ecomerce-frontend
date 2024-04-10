import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authApi";
import { checkUser,signOut } from "./authApi";

const initialState = {
  loggedInUser:null,
  status: "idle",
  error:null
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (userData) => {
    const response = await signOut(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (logininfo,{rejectWithValue}) => {
    try {
      const response = await checkUser(logininfo);
      return response.data
    }catch(error){
      //console.log(error);
      return rejectWithValue(error)
    }
   
  }
);



export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state)=> state.auth.loggedInUser;
export const selectError = (state)=> state.auth.error;

export const { increment } = authSlice.actions;

export const selectCount = (state) => state.counter.value;
export default authSlice.reducer;
