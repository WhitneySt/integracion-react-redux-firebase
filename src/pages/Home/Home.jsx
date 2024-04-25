import React from 'react'
import { useDispatch } from 'react-redux';
import { actionLogout } from '../../redux/userAuth/userAuthActions';
import './home.scss';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div className='home'>Home
      <button onClick={()=>dispatch(actionLogout())}>Cerrar Sesión</button>
    </div>
  )
}

export default Home