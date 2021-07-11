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

const persistConfig = {
	key: "frello",
	storage,
	stateReconciler: autoMergeLevel1,
	whitelist: ["authReducer"],
};

const reducers: any = combineReducers({
	authReducer: authSlice,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: _persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
