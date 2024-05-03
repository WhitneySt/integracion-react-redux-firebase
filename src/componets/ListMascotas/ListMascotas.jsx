import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionFilterMascotas,
  actionGetMascotas,
  actionMultipleFilterMascotas,
} from "../../redux/mascotas/mascotasActions";
import Cargando from "../Cargando/Cargando";
import Card from "../Card/Card";
import "./listMascotas.scss";
import FilterButtons from "../FilterButtons/FilterButtons";
import MultpleFilterButtons from "../MultipleFilterButtons/MultpleFilterButtons";

const ListMascotas = () => {
  const dispatch = useDispatch();
  const { mascotas, isLoadingMascotas } = useSelector(
    (store) => store.mascotas
  );

  const [tipo, setTipo] = useState("all");
  const [filters, setFilters] = useState({});

  const fetchMascotas = useCallback(() => {
    handleFilter(tipo);
  }, [tipo]);

  const fetchMultipleFilter = useCallback(() => {
    handleMultipleFilters(filters);
  },[filters])

  const handleFilter = (tipoMascota = "all") => {
    if (tipoMascota === "all") {
      dispatch(actionGetMascotas());
    } else {
      dispatch(actionFilterMascotas("tipoMascota", tipoMascota));
    }
  };

  const handleMultipleFilters = (filters) => {
    if (Object.entries(filters).length) {
      dispatch(actionMultipleFilterMascotas(filters));
    } else {
      dispatch(actionGetMascotas());
    }
  }

  useEffect(() => {
    dispatch(actionGetMascotas());
  }, []);

  useEffect(() => {
    fetchMascotas();
  }, [fetchMascotas]);

  useEffect(() => {
    fetchMultipleFilter()
  }, [fetchMultipleFilter])
  
  // console.log(filters);

  if (isLoadingMascotas) {
    return <Cargando />;
  }

  return (
    <>
      <FilterButtons setTipo={setTipo} />
      <MultpleFilterButtons filter={filters} setFilter={setFilters} />
      <section className="cards">
        {mascotas.map((item) => (
          <Card key={item.id} mascota={item} />
        ))}
      </section>
    </>
  );
};

export default ListMascotas;
