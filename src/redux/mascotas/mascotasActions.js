import { addDoc, collection } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { addMascotas, fillMascotas, mascotasFail, mascotasRequest } from "./mascotasSlice";

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
