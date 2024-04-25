import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { loginFail, loginRequest, loginSuccess, logout } from "./userAuthSlice";
import { auth } from "../../Firebase/firebaseConfig";

export const actionRegisterWithEmailAndPassword = ({ email, password, name, photo }) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        );
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
        dispatch(loginSuccess({
            name: name,
            id: user.uid,
            accessToken: user.accessToken,
            email: email,
            photo: photo
        }))
    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};

export const actionLoginWithEmailAndPassword = ({email, password}) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess({
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        accessToken: user.accessToken
      }))
    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message))
    }
  }
}

export const actionLogout = () => {
  return async (dispatch) => {
    dispatch(loginRequest())
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message))
    }
  }
}