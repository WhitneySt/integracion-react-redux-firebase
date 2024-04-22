import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { loginFail, loginRequest, loginSuccess } from "./userAuthSlice";
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
