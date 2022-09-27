import { axiosInstance } from "../helpers/axios-config";

const getEstadosEquipos = () => {
  return axiosInstance.get("estado-equipo", {
    headers: {
      //datos viajan en formato json
      "Content-type": "application-json",
    },
  });
};

const crearEstadoEquipo = (data) => {
  return axiosInstance.post("estado-equipo", data, {
    headers: {
      'Content-type': "application/json; charset=utf-8"
    },
  });
};

const actualizarEstadoEquipo = (estadoEquipoId, data) => {
  return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
      headers: {
          'Content-type': "application/json; charset=utf-8"
      },
  });
}


const getEstadoEquipoPorId = (estadoEquipoId) => {
  return axiosInstance.get(`estado-equipo/${estadoEquipoId}`, {
    headers: {
      'Content-type': "application/json; charset=utf-8",
    },
  });
};

export {
  getEstadosEquipos,
  crearEstadoEquipo,
  actualizarEstadoEquipo,
  getEstadoEquipoPorId,
};
