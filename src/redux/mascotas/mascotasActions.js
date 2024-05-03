import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import {
  addMascotas,
  deleteMascota,
  editMascota,
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
    dispatch(mascotasRequest());
    try {
      await deleteDoc(doc(dataBase, COLLECTION_NAME, idMascota));
      dispatch(deleteMascota(idMascota));
    } catch (error) {
      console.error(error);
      dispatch(mascotasFail(error.message));
    }
  };
};

export const actionEditMascotas = (idMascota, editedMascota) => {
  return async (dispatch) => {
    dispatch(mascotasRequest());
    try {
      const mascotaRef = doc(dataBase, COLLECTION_NAME, idMascota);

      await updateDoc(mascotaRef, editedMascota);
      dispatch(
        editMascota({
          id: idMascota,
          ...editedMascota,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(mascotasFail(error.message));
    }
  };
};

export const actionMultipleFilterMascotas = (filters) => {
  return async (dispatch) => {
    dispatch(mascotasRequest());
    const mascotas = [];
    const cadenaDeConsulta = []; //[where(fieldName, "==", fieldValue), where(fieldName, "==", fieldValue), where(fieldName, "==", fieldValue)]
    try {
      for (const key in filters) {
        // if (Array.isArray(filters[key])) {
        //   //Cuando queremos consultar un documento que alguno de los valores dentro del array del valor de comparación
        //   cadenaDeConsulta.push(where(key, "array-contains", filters[key]));
        // } else {
        //   cadenaDeConsulta.push(where(key, "==", filters[key]));
        // }
        cadenaDeConsulta.push(where(key, "==", filters[key]));
      }

      const q = query(collectionRef, ...cadenaDeConsulta);

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
