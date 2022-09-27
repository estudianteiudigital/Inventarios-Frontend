import { axiosInstance } from "../helpers/axios-config";

const getUsuarios = () => {
    return axiosInstance.get("usuario", {
        headers: {
            "Content-type": "application-json",
        },
    });
};

const crearUsuario = (data) => {
    return axiosInstance.post("usuario", data, {
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    });
};

const actualizarUsuario = (usuarioId, data) => {
    return axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    });
};

const getUsuarioPorId = (usuarioId) => {
    return axiosInstance.get(`usuario/${usuarioId}`, {
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    });
};

export { 
    getUsuarios, 
    crearUsuario, 
    actualizarUsuario, 
    getUsuarioPorId 
};
