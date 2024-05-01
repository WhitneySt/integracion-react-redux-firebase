import { createSlice } from "@reduxjs/toolkit";

const mascotasSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    isLoadingMascotas: false,
    errorMascotas: null,
    successRequest: null,
  },
  reducers: {
    mascotasRequest: (state) => {
      state.isLoadingMascotas = true;
      state.errorMascotas = null;
      state.successRequest = null;
    },
    fillMascotas: (state, action) => {
      state.mascotas = action.payload;
      state.isLoadingMascotas = false;
      state.errorMascotas = null;
      state.successRequest = true;
    },
    mascotasFail: (state, action) => {
      (state.isLoadingMascotas = false),
        (state.errorMascotas = action.payload),
        (state.successRequest = false);
    },
    addMascotas: (state, action) => {
      state.mascotas.push(action.payload);
      state.isLoadingMascotas = false;
      state.successRequest = true;
    },
    editMascota: (state, action) => {
      state.isLoadingMascotas = false;
      state.mascotas = state.mascotas.map((item) =>
        action.payload.id == item.id ? { ...item, ...action.payload } : item
      );
      state.successRequest = true;
    },
    deleteMascota: (state, action) => {
      state.isLoadingMascotas = false;
      state.mascotas = state.mascotas.filter(
        (item) => item.id != action.payload
      );
      state.successRequest = true;
    },
    setSuccessRequest: (state) => {
      state.successRequest = null;
    }
  },
});

export const {
  mascotasRequest,
  fillMascotas,
  mascotasFail,
  addMascotas,
  editMascota,
  deleteMascota,
  setSuccessRequest,
} = mascotasSlice.actions; //Creators action

export default mascotasSlice.reducer; //La función reductora
