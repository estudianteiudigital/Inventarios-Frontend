import React from "react";
import { useState, useEffect } from "react";
import { getUsuarios } from "../../services/usuarioService";
import { UsuarioNew } from "./UsuarioNew";
import { Link } from "react-router-dom";
 import Swal from "sweetalert2";

export const UsuarioView = () => {
  const [usuarios, setUsuarios] = useState([]);

  const listarUsuarios = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getUsuarios();
      console.log(data);
      setUsuarios(data);
       Swal.close()
    } catch (e) {
      console.log(e);
       Swal.close()
    }
  };
 
  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <div className="container">
      <UsuarioNew listarUsuarios={listarUsuarios}/>
      <table className="table mt-3 mb-2 table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, n) => {
            return (
            <tr key={usuario._id}>
              <th scope="row">{n + 1}</th>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.estado} </td>
              <td>{usuario.fechaCreacion} </td>
              <td>{usuario.fechaActualizacion}</td>
              <td className="text-center">
                <Link to={`usuarios/edit/${usuario._id}`}>
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


