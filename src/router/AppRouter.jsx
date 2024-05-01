import React, { useCallback, useEffect } from "react";
import { Routes, Route, useBeforeUnload, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../componets/Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { loginSuccess } from "../redux/userAuth/userAuthSlice";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import InsertCode from "../pages/InsertCode/InsertCode";
import MascotaForm from "../pages/MascotaForm/MascotaForm";

const AppRouter = () => {
  const { user } = useSelector((store) => store.userAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //Nos aseguramos de guardar la última ruta en la que estuvimos antes de que sucediera la recarga
  useBeforeUnload(
    useCallback(() => {
      sessionStorage.setItem("currentRoute", JSON.stringify(location.pathname));
    }, [location.pathname])
  );

  useEffect(() => {
    const storeRoute = JSON.parse(sessionStorage.getItem("currentRoute"));
    if (storeRoute) {
      navigate(storeRoute)
    }
  },[])

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoutes />}>
          <Route index element={<Home />} />
          <Route path="agregar-mascota" element={<MascotaForm />} />

          {user?.role === "admin" ? (
            <>
              <Route path="agregar-mascota" element={<MascotaForm />} />
              {/* Aquí van el resto de rutas para usuarios con rol admin */}
            </>
          ) : null}
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
  );
};

export default AppRouter;
