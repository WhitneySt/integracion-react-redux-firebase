import React from 'react'
import { useDispatch } from 'react-redux';
import { actionLogout } from '../../redux/userAuth/userAuthActions';
import { Link } from 'react-router-dom';
import './home.scss';
import ListMascotas from '../../componets/ListMascotas/ListMascotas';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div className="home">
      Home
      <button onClick={() => dispatch(actionLogout())}>Cerrar Sesión</button>
      <Link to={"/agregar-mascota"}>Agregar Mascota</Link>
      <ListMascotas/>
    </div>
  );
}

export default Home