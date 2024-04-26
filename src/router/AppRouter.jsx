import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../componets/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { loginRequest, loginSuccess } from "../redux/userAuth/userAuthSlice";
import Cargando from "../componets/Cargando/Cargando";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import InsertCode from "../pages/InsertCode/InsertCode";

const AppRouter = () => {
  const { user } = useSelector((store) => store.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userCredential) => {
      if (userCredential && !user) {
        dispatch(
          loginSuccess({
            id: userCredential.uid,
            name: userCredential.displayName,
            photo: userCredential.photoURL,
            accessToken: userCredential.accessToken,
            email: userCredential.email || null,
            phone: userCredential.phoneNumber || null,
          })
        );
      }
    });
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            {/* Aquí van el resto de rutas privadas */}
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="phone" element={<PhoneLogin />} />
            <Route path="phone/insertCode/:phone" element={<InsertCode />} />
            {/* Aquí van el resto de rutas públicas */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
