import React from 'react'
import { useDispatch } from 'react-redux';
import { actionLogout } from '../../redux/userAuth/userAuthActions';
import { Link } from 'react-router-dom';
import './home.scss';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div className="home">
      Home
      <button onClick={() => dispatch(actionLogout())}>Cerrar Sesión</button>
      <Link to={"/agregar-mascota"}>Agregar Mascota</Link>
    </div>
  );
}

export default Home