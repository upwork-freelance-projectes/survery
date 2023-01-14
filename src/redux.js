import {configureStore } from "@reduxjs/toolkit"
import progressReducer from "./progessSlice"
import questionReducer from './questionSlice'
import questionsReducer from './questionsSlice'
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
	key: "root",
	storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig,combineReducers({
       question: questionReducer,
       questions: questionsReducer,
       progress: progressReducer
    }));


export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store);