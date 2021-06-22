import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	authenticated: boolean;
	signingUp?: boolean;
}

const initialState: AuthState = {
	authenticated: false,
	signingUp: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSigninUp: (state, { payload }: PayloadAction<boolean>) => {
			state.signingUp = payload;
		},
	},
});


export default authSlice.reducer;
