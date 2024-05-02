import React from "react";

import { tipoMascota } from "../../data/mascotasOptions";

const FilterButtons = ({ setTipo }) => {
  const handleClick = (tipoMascota = "all") => {
    setTipo(tipoMascota);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>All</button>
      {tipoMascota.map((item) => (
        <button key={item} onClick={() => handleClick(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
