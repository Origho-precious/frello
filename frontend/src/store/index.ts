import {
	configureStore,
	combineReducers,
	getDefaultMiddleware,
	ThunkAction,
	Action,
} from "@reduxjs/toolkit";
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import authSlice from "./slices/auth.slice";
import signupSlice from "./slices/signup.slice";

const persistConfig = {
	key: "frello",
	storage,
	stateReconciler: autoMergeLevel1,
	whitelist: ["authReducer"],
};

const reducers = combineReducers({
	authReducer: authSlice,
	signupReducer: signupSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers as any);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof reducers>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
