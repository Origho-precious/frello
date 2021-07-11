import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "..";
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

export const login =
	(data: { email: string; password: string }): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setAuthenticating());

			const body = JSON.stringify(data);
			const config = {
				headers: {
					"Content-type": "application/type",
				},
			};

			const res: Partial<IUser> = await axios.post("/api/login", body, config);

			dispatch(setLoginSuccess(res));
		} catch (error) {
			dispatch(
				setLoginError(
					error?.response?.data?.message
						? error.response.data.message
						: error?.message
				)
			);
		}
	};

export default authSlice.reducer;
