import React, { useState, useEffect } from "react";
import { crearTipoEquipo, getTiposEquipos } from "../../services/tipoEquipoService";
import Swal from "sweetalert2";

export const TipoNew = ( {listarTipos} ) => {
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = "", estado = "" } = valoresForm;

  const listarTipo = async () => {
    try {
      const { data } = await getTiposEquipos();
      setTipos(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarTipo();
  }, []);
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value }); 
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const tipo = {
     nombre,
     estado
    };
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await crearTipoEquipo(tipo);
      console.log(data);
      listarTipos();
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
      let mensaje;
      if (e && e.response && e.response.data) {
        mensaje = e.response.data;
      } else {
        mensaje = "Ocurrió un error, intente nuevamente";
      }
      Swal.fire("Error", mensaje, "error");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col mt-3">
            <h4>Tipos Equipos</h4>
            <hr />
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={nombre}
                  required
                  minLength={4}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  onChange={(e) => handleOnChange(e)}
                  name="estado"
                  value={estado}
                  required
                >
                  <option key="">--SELECCIONE--</option>
                  <option >Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col mb-4">
              <button className="btn btn-primary">Crear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
