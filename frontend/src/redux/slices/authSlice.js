import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve user info and token from localStorage if available
// Lấy thông tin người dùng từ localStorage nếu có (sau khi đăng nhập).
// Vì localStorage chỉ lưu string, nên bạn cần dùng JSON.parse() để chuyển nó lại thành object khi lấy ra.
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Check for an existing guest ID in the localStorage or generate a new One
/**
 * Dùng để làm gì? Gán một định danh cho người dùng chưa đăng nhập (guest).
Dùng để:
- Lưu giỏ hàng tạm
- Gọi API backend (thay vì userId, bạn dùng guestId)
- Merge khi đăng nhập thật (chuyển từ guest cart → user cart)
 */
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`; // Kiểm tra xem trong localStorage đã có guestID chưa, có thì dùng lại, chưa có thì tạo dưới dạng guest_
localStorage.setItem("guestId", initialGuestId); // Lưu lại guestId vào localStorage (dưới key "guestId").

// Initial state: khởi tạo state ban đầu cho slice Redux
const initialState = {
  user: userFromStorage, //Lưu thông tin người dùng đã đăng nhập.
  guestId: initialGuestId, // Lưu guestId dành cho người chưa đăng nhập.
  loading: false,
  error: null,
};

// Async Thunk for User Login
/**
 * rejectWithValue giúp bạn truyền lỗi vào action.payload trong extraReducers.
 * Tóm tắt Flow
 *  1. Gọi loginUser({ email, password }) từ component
    2. -> Gửi request đến /api/users/login
    3. -> Nếu thành công: lưu user & token vào localStorage
    4. -> Redux cập nhật state.user, state.loading = false
    5. -> Nếu thất bại: Redux nhận error, lưu vào state.error
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user; // Return the user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data); // Trả user về Redux
    }
  }
);

// Async Thunk for User Register

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user; // Return the user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; // Reset guest Id on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId); // Set new guestId in localStorage
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error?.message || "Login failed";
      })

      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        action.payload?.message || action.error?.message || "Register failed";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
