import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuth/userAuthSlice";
import mascotasReducer from "./mascotas/mascotasSlice";

const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    mascotas: mascotasReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
