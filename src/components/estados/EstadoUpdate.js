import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEstadoEquipoPorId,  actualizarEstadoEquipo, getEstadosEquipos } from "../../services/estadoEquipoService";
import Swal from "sweetalert2";

export const EstadoUpdate = () => {
  const { estadoEquipoId = "" } = useParams();
  const [estadoEquipo, setEstadoEquipo] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = "", estado = "" } = valoresForm;

  const listarEstados = async () => {
    try {
      const { data } = await getEstadosEquipos();
      setEstadoEquipo(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarEstados();
  }, []);

  const getEstado = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getEstadoEquipoPorId(estadoEquipoId);
      setEstadoEquipo(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };

  useEffect(() => {
    getEstado();
  }, [estadoEquipoId]);

  useEffect(() => {
    setValoresForm({
      nombre: estadoEquipo.nombre,
      estado: estadoEquipo.estado,
    });
  }, [estadoEquipo]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const estadoEquipo = {
      nombre, 
      estado,
    };
    console.log(estadoEquipo);

  try {
    Swal.fire({
      allowOutsideClick: false,
      text: "Cargando...",
    });
    Swal.showLoading();      
    const { data } = await actualizarEstadoEquipo(estadoEquipoId, estadoEquipo);      
    Swal.fire({
      title: "Estado equipo actualizado",
      text: "El estado del equipo se actualizó correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/estados";
      }
    });
  } catch (e) {      
    Swal.close();
    let mensaje;
    if (e && e.response && e.response.data) {
      mensaje = e.response.data;
    } else {
      mensaje = "Ocurrió un error, intente nuevamente";
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: mensaje,
    });
  }
};
  return (
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Estado Equipo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Estado equipo</label>
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
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        onChange={(e) => handleOnChange(e)}
                        name="estado"
                        value={estado}
                        required
                      >
                        <option key="">--SELECCIONE--</option>
                        <option>Activo</option>
                        <option>Inactivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className="btn btn-primary">Actualizar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
