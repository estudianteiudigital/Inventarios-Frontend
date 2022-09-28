import React from "react";
import { useState, useEffect } from "react";
import { getEstadosEquipos } from "../../services/estadoEquipoService";
import { EstadoNew } from "./EstadoNew";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const EstadoView = () => {
  const [estados, setEstados] = useState([]);
  const listarEstados = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getEstadosEquipos();
      console.log(data);
      setEstados(data);
      Swal.close();
    } catch (e) {
      console.log(e);
      Swal.close();
    }
  };
 
  useEffect(() => {
    listarEstados();
  }, []);

  return (
    <div className="container">
      <EstadoNew listarEstados={listarEstados} />
      <table className="table mt-3 mb-2 table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Estado Equipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado, n) => {
            return (
              <tr key={estado._id}>
                <th scope="row">{n + 1}</th>
                <td>{estado.nombre}</td>
                <td>{estado.estado} </td>
                <td>{estado.fechaCreacion} </td>
                <td>{estado.fechaActualizacion} </td>
                <td className="text-center">
                  <Link to={`estados/edit/${estado._id}`}>
                    <button type="button" className="btn btn-info">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};