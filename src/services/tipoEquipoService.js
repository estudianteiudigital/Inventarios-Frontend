import {axiosInstance} from '../helpers/axios-config';

const getTiposEquipos = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type': 'application-json'
        }       
    })
}

const crearTipoEquipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type':"application/json; charset=utf-8"
        }
    })
}

const actualizarTipoEquipo = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }
    })
}

const getTipoEquipoPorId = (tipoEquipoId) => {
    return axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, {
        headers: {
            'Content-type': "application/json; charset=utf-8"
        }       
    })
}

export {
    getTiposEquipos,
    crearTipoEquipo,
    actualizarTipoEquipo,
    getTipoEquipoPorId,
}