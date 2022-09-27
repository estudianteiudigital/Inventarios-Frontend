import {axiosInstance} from '../helpers/axios-config';

const getMarcas = () => {
    return axiosInstance.get('marca', {
        headers: {
            'Content-type': "application-json"
        }       
    })
}

const crearMarca = (data) => {
    return axiosInstance.post('marca', data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    })
}

const actualizarMarca = (marcaId, data) => {
    return axiosInstance.put(`marca/${marcaId}`, data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    });
}

const getMarcaPorId = (marcaId) => {
    return axiosInstance.get(`marca/${marcaId}`, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }       
    })
}

const eliminarMarca = (marcaId) => {
    return axiosInstance.delete(`marca/${marcaId}`, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    })
}

export {
    getMarcas,
    crearMarca,
    actualizarMarca,
    getMarcaPorId,
    eliminarMarca
}