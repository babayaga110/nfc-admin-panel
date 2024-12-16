import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./Slice/appSlice";
const reducers = combineReducers({
  app: appReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;