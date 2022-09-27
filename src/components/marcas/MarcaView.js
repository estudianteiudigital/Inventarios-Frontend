import React from "react";
import { useState, useEffect } from "react";
import { getMarcas } from "../../services/marcaService";
import { MarcaNew } from "./MarcaNew";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const MarcaView = () => {
  const [marcas, setMarcas] = useState([]);

  const listarMarcas = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: "Cargando...",
      });
      Swal.showLoading();
      const { data } = await getMarcas();
      console.log(data);
      setMarcas(data);
       Swal.close()
    } catch (e) {
      console.log(e);
       Swal.close()
    }
  };
 
  useEffect(() => {
    listarMarcas();
  }, []);

  return (
    <div className="container ">
      <MarcaNew listarMarcas={listarMarcas}/>
      <table className="table mt-3 mb-2 table table-striped">
        {/* Encabezado */}
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

        {/* Cuerpo */}
        <tbody>
          {marcas.map((marca) => {          
            return (              
              <tr key={marca._id}>                
                <td>{marca.no}</td>
                <td>{marca.nombre}</td>
                <td>{marca.estado} </td>
                <td>{marca.fechaCreacion} </td>
                <td>{marca.fechaActualizacion} </td>
                <td className="text-center">
                  <Link to={`marcas/edit/${marca._id}`}>
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
