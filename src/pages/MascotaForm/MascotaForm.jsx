import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MultipleSelectChip from "../../componets/MultipleSelectChip/MultipleSelectChip";
import {
  personalidades,
  genero,
  tipoMascota,
} from "../../data/mascotasOptions";
import imageUpload from "../../assets/upload_9427985.png";
import RadioButtonsGroup from "../../componets/RadioButtonsGroup/RadioButtonsGroup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import "./mascotasForm.scss";
import fileUpload from "../../services/fileUpload";
import {
  actionAddMascota,
  actionEditMascotas,
} from "../../redux/mascotas/mascotasActions";
import Cargando from "../../componets/Cargando/Cargando";
import Swal from "sweetalert2";
import { setSuccessRequest } from "../../redux/mascotas/mascotasSlice";

const MascotaForm = () => {
  const { idMascota } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(
    "https://www.shutterstock.com/image-photo/portrait-cat-dog-front-bright-260nw-1927527212.jpg"
  );
  const [file, setFile] = useState(null);
  const [initalState, setInitialState] = useState({});
  const [showInput, setShowInput] = useState(false);
  const { successRequest, errorMascotas, isLoadingMascotas, mascotas } =
    useSelector((store) => store.mascotas);
  const {
    user: { id },
  } = useSelector((store) => store.userAuth);

  useEffect(() => {
    if (idMascota) {
      const editMascota = mascotas.find((item) => item.id === idMascota);
      if (editMascota) {
        setInitialState(editMascota);
        setImage(editMascota.imagen);
        formik.values.name = editMascota.name;
        formik.values.edad = editMascota.edad;
        formik.values.raza = editMascota?.raza || "";
        formik.values.personalidad1 = editMascota.personalidad1;
        formik.values.personalidad2 = editMascota.personalidad2;
        formik.values.genero = editMascota.genero;
        formik.values.tipoMascota = editMascota.tipoMascota;
      }
    }
  }, [idMascota, mascotas]);

  const getInitialValues = () => ({
    name: initalState.name || "",
    edad: initalState.edad || "",
    raza: initalState.raza || "",
    personalidad1: initalState.personalidad1 || "",
    personalidad2: initalState.personalidad2 || [],
    genero: initalState.genero || genero[0],
    tipoMascota: initalState.tipoMascota || tipoMascota[0],
  });

  const handleChangeFile = (event) => {
    const fileItem = event.target.files[0];
    setFile(fileItem);
    setImage(URL.createObjectURL(fileItem));
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: async (values) => {
      const avatar = file ? await fileUpload(file) : image;
      values.imagen = avatar;
      if (idMascota) {
        //Vamos a editar
        dispatch(actionEditMascotas(idMascota, values));
      } else {
        //Vamos a agregar
        values.idTenedor = id;
        dispatch(actionAddMascota(values));
      }
    },
  });

  useEffect(() => {
    const lastIndex = formik.values.personalidad2.length - 1; //Posición del último elemento dentro del array personalidad2
    if (formik.values.personalidad2[lastIndex] === "otros") setShowInput(true);
  }, [formik.values.personalidad2]);

  if (isLoadingMascotas) return <Cargando />;

  if (errorMascotas) {
    Swal.fire({
      title: "Oops!",
      text: idMascota
        ? "Ha ocurrido un error en la edición de los datos de la mascota"
        : "Ha ocurrido un error en la creación de la mascota",
      icon: "error",
    });
  }

  if (successRequest === "addMascotas" || successRequest === "editMascotas") {
    Swal.fire({
      title: "Excelente!",
      text: idMascota
        ? "Has editado con éxito los datos de la mascota"
        : "Has guardado con éxito una mascota para adoptar",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setSuccessRequest());
        navigate("/");
      }
    });
  }

  return (
    <main className="form">
      <button className="back" onClick={() => navigate(-1)} type="button">
        Ir atrás
      </button>
      <h1>{idMascota ? "Editar Mascota" : "Agregar Mascota"}</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">
          <span>Nombre</span>
          <input
            id="name"
            type="text"
            placeholder="Loki"
            value={formik.values.name}
            onChange={formik.handleChange}
            // {...formik.getFieldProps("name")}
          />
        </label>
        <label htmlFor="edad">
          <span>Edad en meses</span>
          <input
            id="edad"
            type="text"
            placeholder="18"
            {...formik.getFieldProps("edad")}
          />
        </label>
        <label htmlFor="raza">
          <span>Raza</span>
          <input
            id="raza"
            type="text"
            placeholder="Labrador"
            {...formik.getFieldProps("raza")}
          />
        </label>
        <label htmlFor="imagen">
          <span>Foto</span>
          <figure className="upload">
            <img src={imageUpload} alt="upload" />
            <figcaption>Cargar imagen</figcaption>
          </figure>
          <img className="image" src={image} alt="pet" />
          <input id="imagen" type="file" onChange={handleChangeFile} />
        </label>
        <label htmlFor="personalidad">
          <span>Personalidad</span>
          <select
            name=""
            id="personalidad1"
            {...formik.getFieldProps("personalidad1")}
          >
            <option value={""} disabled>
              Seleccione una opción
            </option>
            {personalidades.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <MultipleSelectChip
          personalidades={personalidades}
          labelName="Personalidad"
          label={"personalidad2"}
          value={formik.values.personalidad2}
          handleChange={formik.handleChange}
          disabled={showInput}
        />
        {showInput ? (
          <label htmlFor="otro">
            <span>Otra personalidad:</span>
            <input
              type="text"
              id="otro"
              placeholder="Ingrese una personalidad"
              onChange={(event) => {
                const { value } = event.target;
                const lastIndex = formik.values.personalidad2.length - 1;
                formik.values.personalidad2[lastIndex] = value;
              }}
            />
            <button onClick={() => setShowInput(false)}>Aceptar</button>
          </label>
        ) : null}
        <RadioButtonsGroup
          options={genero}
          label="Género"
          labelName={"genero"}
          value={formik.values.genero}
          handleChange={formik.handleChange}
        />
        <RadioButtonsGroup
          options={tipoMascota}
          label="Tipo de Mascota"
          labelName="tipoMascota"
          value={formik.values.tipoMascota}
          handleChange={formik.handleChange}
        />
        <button type="submit">
          {idMascota ? "Editar" : "Guardar Mascota"}
        </button>
      </form>
    </main>
  );
};

export default MascotaForm;
