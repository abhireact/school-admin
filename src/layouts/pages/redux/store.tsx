import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, dataReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // middleware: () => new Tuple(thunk, logger),
});

export const persistor = persistStore(store);
persistor.purge();
