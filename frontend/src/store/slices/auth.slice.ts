import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk, RootState } from "..";
import { IUser } from "../../interfaces/IUser.interface";

interface AuthState {
	authenticating: boolean;
	authenticated: boolean;
	profile: Partial<IUser>;
	loginError?: string;
}

const initialState: AuthState = {
	authenticating: false,
	authenticated: false,
	profile: {
		email: "",
		name: "",
	},
	loginError: "",
};

const authSlice = createSlice({
	name: "[AUTH]",
	initialState,
	reducers: {
		setAuthenticating: (state) => {
			state.authenticating = true;
		},
		setLoginSuccess: (state, { payload }: PayloadAction<Partial<IUser>>) => {
			state.authenticating = false;
			state.authenticated = true;
			state.profile = payload;
			state.loginError = "";
		},
		setLoginError: (state, { payload }: PayloadAction<string>) => {
			state.authenticating = false;
			state.loginError = payload;
		},
	},
});

const { setAuthenticating, setLoginError, setLoginSuccess } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.authReducer;

export const login =
	(data: { email: string; password: string }): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setAuthenticating());

			const body = JSON.stringify(data);
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const res = await axios.post("/api/users/login", body, config);

			dispatch(setLoginSuccess(res.data));
		} catch (error) {
			dispatch(
				setLoginError(
					error?.response?.data?.message
						? error.response.data.message
						: error?.message
				)
			);

			setTimeout(() => {
				dispatch(setLoginError(""));
			}, 3000);
		}
	};

export default authSlice.reducer;
