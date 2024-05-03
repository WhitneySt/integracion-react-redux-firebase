import React from "react";
import {
  tipoMascota,
  genero,
  personalidades,
} from "../../data/mascotasOptions";
import "./multipleFilterButtons.scss";

const MultpleFilterButtons = ({ filter, setFilter }) => {
  const handleClick = (name = "", value = "") => {
    if (name && value) {
      //if (name === "personalidad2") {
    //     setFilter({
    //       ...filter,
    //       [name]: filter.personalidad2
    //         ? [...filter.personalidad2, value]
    //         : [value],
    //     });
    //   }

      setFilter({
        ...filter,
        [name]: value,
      });
    } else {
      setFilter({});
    }
  };
  return (
    <div>
      <button onClick={() => handleClick()}>Limpiar filtros</button>
      <section>
        <h2>Filtrado por tipo</h2>
        <div>
          {tipoMascota.map((item) => (
            <button
              className={
                filter.tipoMascota && filter.tipoMascota === item
                  ? "active"
                  : null
              }
              key={item}
              onClick={() => handleClick("tipoMascota", item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2>Filtrado por género</h2>
        <div>
          {genero.map((item) => (
            <button
              className={
                filter.genero && filter.genero === item ? "active" : null
              }
              key={item}
              onClick={() => handleClick("genero", item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      {/* <section>
        <h2>Personalidades</h2>
        <div>
          {personalidades.map((item) => (
            <button
              className={
                filter?.personalidad2 &&
                filter?.personalidad2?.includes(item)
                  ? "active"
                  : null
              }
              key={item}
              onClick={() => handleClick("personalidad2", item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default MultpleFilterButtons;
