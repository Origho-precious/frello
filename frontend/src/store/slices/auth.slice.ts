import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk, RootState } from "..";
import { IUser } from "../../interfaces/IUser.interface";

interface AuthState {
	authenticating: boolean;
	authenticated: boolean;
	profile: Partial<IUser>;
	loginError?: string;
	sendingResetCode?: boolean;
	sendResetCodeSuccess?: string;
	sendResetCodeError?: string;
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
		setSendingResetCode: (state) => {
			state.sendingResetCode = true;
		},
		setSendResetCodeSuccess: (state, { payload }: PayloadAction<string>) => {
			state.sendingResetCode = false;
			state.sendResetCodeSuccess = payload;
			state.sendResetCodeError = "";
		},
		setSendResetCodeError: (state, { payload }: PayloadAction<string>) => {
			state.sendingResetCode = false;
			state.sendResetCodeError = payload;
			state.sendResetCodeSuccess = "";
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
	setSendResetCodeError,
	setSendResetCodeSuccess,
	setSendingResetCode,
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

export const sendResetCode =
	(email: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setSendingResetCode());

			const body = JSON.stringify(email);
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const res = await axios.post("/api/forgot-password", body, config);

			dispatch(setSendResetCodeSuccess(res.data));
		} catch (error) {
			dispatch(
				setSendResetCodeError(
					error?.response?.data?.message
						? error.response.data.message
						: error?.message
				)
			);

			setTimeout(() => {
				dispatch(setSendResetCodeError(""));
			}, 3000);
		}
	};

export const resetPassword =
	(password: string): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(resettingPassword());

			const body = JSON.stringify(password);
			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer`,
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
