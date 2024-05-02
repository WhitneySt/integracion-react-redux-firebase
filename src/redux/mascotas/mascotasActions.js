import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import {
  addMascotas,
  deleteMascota,
  fillMascotas,
  filterMascotas,
  mascotasFail,
  mascotasRequest,
} from "./mascotasSlice";

const COLLECTION_NAME = "mascotas"; //Nombre de la colección
const collectionRef = collection(dataBase, COLLECTION_NAME); //Referencia de la colección

export const actionAddMascota = (newMascota) => {
  return async (dispatch) => {
    dispatch(mascotasRequest());
    try {
      const docRef = addDoc(collectionRef, newMascota);
      dispatch(
        addMascotas({
          id: docRef.id,
          ...newMascota,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(mascotasFail(error.message));
    }
  };
};

export const actionGetMascotas = () => {
  return async (dispatch) => {
    dispatch(mascotasRequest());
    const mascotas = [];
    try {
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        mascotas.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch(fillMascotas(mascotas));
    } catch (error) {
      console.error(error);
      dispatch(mascotasFail(error.message));
    }
  };
};

export const actionFilterMascotas = (fieldName, fieldValue) => {
  return async (dispatch) => {
    dispatch(mascotasRequest());
    const mascotas = [];
    try {
      const q = query(collectionRef, where(fieldName, "==", fieldValue));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        mascotas.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch(filterMascotas(mascotas));
    } catch (error) {
      console.error(error);
      dispatch(mascotasFail(error.message));
    }
  };
};


export const actionDeleteMascotas = (idMascota) => {
  return async (dispatch) => {
    dispatch(mascotasRequest())
    try {
      await deleteDoc(doc(dataBase, COLLECTION_NAME, idMascota));
      dispatch(deleteMascota(idMascota));
    } catch (error) {
      console.error(error);
      dispatch(mascotasFail(error.message));
    }
  }
}
