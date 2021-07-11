import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk } from "..";
import { login } from "./auth.slice";

interface SignupState {
	signingUp?: boolean;
	signupError: string | undefined;
}

const initialState: SignupState = {
	signingUp: false,
	signupError: "",
};

const signupSlice = createSlice({
	name: "[SIGNUP]",
	initialState,
	reducers: {
		setSigninUp: (state, { payload }: PayloadAction<boolean>) => {
			state.signingUp = payload;
		},
		setSignupError: (state, { payload }: PayloadAction<string>) => {
			state.signingUp = false;
			state.signupError = payload;
		},
	},
});

const { setSigninUp, setSignupError } = signupSlice.actions;

export const signup =
	(data: { email: string; name: string; password: string }): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setSigninUp(true));

			const body = JSON.stringify(data);

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			await axios.post("/api/users", body, config);

			dispatch(setSigninUp(false));

			dispatch(login({ email: data.email, password: data.password }));
		} catch (error) {
			dispatch(
				setSignupError(
					error?.response?.data?.message
						? error.response.data.message
						: error.message
				)
			);
		}
	};

export default signupSlice.reducer;
