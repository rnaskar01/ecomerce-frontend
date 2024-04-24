import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser,checkAuth } from "./authApi";
import { checkUser,signOut } from "./authApi";

const initialState = {
  loggedInUserToken:null,
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

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (logininfo,{rejectWithValue}) => {
    try {
      const response = await loginUser(logininfo);
      return response.data
    }catch(error){
      //console.log(error);
      return rejectWithValue(error)
    }
   
  }
);


export const checkAuthAsync= createAsyncThunk(
  "user/checkAuth",
  async () => {
    try {
      const response = await checkAuth();
      return response.data
    }catch(error){
      console.log(error);
    }
   
  }
);


export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      });
  },
});

export const selectLoggedInUser = (state)=> state.auth.loggedInUserToken;
export const selectError = (state)=> state.auth.error;

export const { increment } = authSlice.actions;

export const selectCount = (state) => state.counter.value;
export default authSlice.reducer;
