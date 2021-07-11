import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, AppThunk } from "..";

interface SignupState {
	signingUp?: boolean;
	signupSuccess: boolean;
	signupError: string | null | undefined;
}

const initialState: SignupState = {
	signingUp: false,
	signupError: null,
	signupSuccess: false,
};

const signupSlice = createSlice({
	name: "[SIGNUP]",
	initialState,
	reducers: {
		setSigninUp: (state) => {
			state.signingUp = true;
		},
		setSignupSuccess: (state) => {
			state.signingUp = false;
			state.signupSuccess = true;
			state.signupError = null;
		},
		setSignupError: (state, { payload }: PayloadAction<string>) => {
			state.signingUp = false;
			state.signupSuccess = false;
			state.signupError = payload;
		},
	},
});

const { setSigninUp, setSignupError, setSignupSuccess } = signupSlice.actions;

export const signup =
	(data: { email: string; name: string; password: string }): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(setSigninUp());

			const body = JSON.stringify(data);

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			await axios.post("/api/users", body, config);

			dispatch(setSignupSuccess());
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
