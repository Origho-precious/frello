import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk, RootState } from "..";
import { IUser } from "../../interfaces/IUser.interface";

interface AuthState {
	authenticating: boolean;
	authenticated: boolean;
	profile: Partial<IUser>;
	loginError?: string;
	sendingResetLink?: boolean;
	sendResetLinkSuccess?: string;
	sendResetLinkError?: string;
	resettingPassword?: boolean;
	resetPasswordError?: string;
	resetPasswordSuccess?: string;
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
		setSendingResetLink: (state) => {
			state.sendingResetLink = true;
		},
		setSendResetLinkSuccess: (state, { payload }: PayloadAction<string>) => {
			state.sendingResetLink = false;
			state.sendResetLinkSuccess = payload;
			state.sendResetLinkError = "";
		},
		setSendResetLinkError: (state, { payload }: PayloadAction<string>) => {
			state.sendingResetLink = false;
			state.sendResetLinkError = payload;
			state.sendResetLinkSuccess = "";
		},
		resettingPassword: (state) => {
			state.resettingPassword = true;
		},
		setResetPasswordSuccess: (state, { payload }: PayloadAction<string>) => {
			state.resettingPassword = false;
			state.resetPasswordSuccess = payload;
			state.resetPasswordError = "";
		},
		setResetPasswordError: (state, { payload }: PayloadAction<string>) => {
			state.resettingPassword = false;
			state.resetPasswordError = payload;
			state.resetPasswordSuccess = "";
		},
	},
});

const {
	setAuthenticating,
	setLoginError,
	setLoginSuccess,
	setResetPasswordError,
	setResetPasswordSuccess,
	setSendResetLinkError,
	setSendResetLinkSuccess,
	setSendingResetLink,
	resettingPassword,
} = authSlice.actions;

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

export const sendResetLink =
	(email: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setSendingResetLink());

			const body = JSON.stringify(email);
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const res = await axios.post("/api/forgot-password", body, config);

			dispatch(setSendResetLinkSuccess(res.data));
		} catch (error) {
			dispatch(
				setSendResetLinkError(
					error?.response?.data?.message
						? error.response.data.message
						: error?.message
				)
			);

			setTimeout(() => {
				dispatch(setSendResetLinkError(""));
			}, 3000);
		}
	};

export const resetPassword =
	(token: string, password: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(resettingPassword());

			const body = JSON.stringify(password);
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			const res = await axios.post("/api/reset-password", body, config);

			dispatch(setResetPasswordSuccess(res.data));
		} catch (error) {
			dispatch(
				setResetPasswordError(
					error?.response?.data?.message
						? error.response.data.message
						: error?.message
				)
			);

			setTimeout(() => {
				dispatch(setResetPasswordError(""));
			}, 3000);
		}
	};

export default authSlice.reducer;
