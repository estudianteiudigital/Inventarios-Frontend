import React from "react";
import { useState, useEffect } from "react";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import { TipoNew } from "./TipoNew";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getTiposEquipos();
      console.log(data);
      setTipos(data);
       Swal.close()
    } catch (e) {
      console.log(e);
       Swal.close()
    }
  };
 
  useEffect(() => {
    listarTipos();
  }, []);
//
  return (
    <div className="container" >
      <TipoNew listarTipos={listarTipos}/>
      {/* table-bordered border-primary */}
      <table className="table mt-3 mb-2 table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => {
            return (
            <tr key={tipo._id}>
              <th scope="row">#</th>
              <td>{tipo.nombre}</td>
              <td>{tipo.estado} </td>
              <td>{tipo.fechaCreacion} </td>
              <td>{tipo.fechaActualizacion}</td>
              <td className="text-center">
                <Link to={`tipos/edit/${tipo._id}`}>
                  <button type="button" className="btn btn-info">Editar</button>
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


