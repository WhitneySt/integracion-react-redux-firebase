import React, { useCallback, useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionFilterMascotas,
  actionGetMascotas,
} from "../../redux/mascotas/mascotasActions";
import Cargando from "../Cargando/Cargando";
import Card from "../Card/Card";
import "./listMascotas.scss";
import FilterButtons from "../FilterButtons/FilterButtons";

const ListMascotas = () => {
  const dispatch = useDispatch();
  const { mascotas, isLoadingMascotas } = useSelector(
    (store) => store.mascotas
  );

  const [tipo, setTipo] = useState("all");

  const fetchMascotas = useCallback(() => {
    handleFilter(tipo);
  }, [tipo]);

  const handleFilter = (tipoMascota = "all") => {
    if (tipoMascota === "all") {
      dispatch(actionGetMascotas());
    } else {
      dispatch(actionFilterMascotas("tipoMascota", tipoMascota));
    }
  };

  useEffect(() => {
    dispatch(actionGetMascotas());
  }, []);

  useEffect(() => {
    fetchMascotas();
  }, [fetchMascotas]);

  if (isLoadingMascotas) {
    return <Cargando />;
  }

  return (
    <>
      <FilterButtons setTipo={setTipo} />
      <section className="cards">
        {mascotas.map((item) => (
          <Card key={item.id} mascota={item} />
        ))}
      </section>
    </>
  );
};

export default ListMascotas;
