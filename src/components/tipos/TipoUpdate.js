import React, { useState, useEffect } from "react"; //verificar
import { useParams } from "react-router-dom";
import { getTipoEquipoPorId, actualizarTipoEquipo } from "../../services/tipoEquipoService";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import Swal from "sweetalert2";

export const TipoUpdate = () => {
  const { tipoEquipoId = "" } = useParams();
  const [tipo, setTipo] = useState({});
  const [valoresForm, setValoresForm] = useState({});
  const { nombre = "",  estado = "" } = valoresForm;

  const listarTipos = async () => {
    try {
      const { data } = await getTiposEquipos();
      setTipo(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    listarTipos();
  }, []);

  const getTipo = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getTipoEquipoPorId(tipoEquipoId);
      setTipo(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };

  useEffect(() => {
    getTipo();
  }, [tipoEquipoId]);

  useEffect(() => {
    setValoresForm({
      nombre: tipo.nombre,
      estado: tipo.estado,
    });
  }, [tipo]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const tipo = {
      nombre,
      estado,
    };
    console.log(tipo);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await actualizarTipoEquipo(tipoEquipoId, tipo);
      Swal.fire({
        title: "Tipo Equipo actualizad",
        text: "El Tipo de Equipo se actualizó correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/tipos";
        }
      });
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
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
    <div className="container-fluid mt-3 mb-2">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Editar Tipo Equipo</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
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
