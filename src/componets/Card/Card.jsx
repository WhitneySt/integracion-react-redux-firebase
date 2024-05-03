import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete_3405244.png";
import editImage from "../../assets/edit_1159633.png";
import "./card.scss";
import { actionDeleteMascotas } from "../../redux/mascotas/mascotasActions";

const Card = ({ mascota = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <figure className="card">
      <img src={mascota?.imagen} alt={mascota?.name} />
      <div className="actionButtons">
        <img
          src={deleteImage}
          alt="eliminar"
          onClick={() => dispatch(actionDeleteMascotas(mascota.id))}
        />

        <img
          onClick={() => navigate(`edit/${mascota.id}`)}
          src={editImage}
          alt="editar"
        />
      </div>
      <figcaption>{mascota?.name}</figcaption>
    </figure>
  );
};

export default Card;
