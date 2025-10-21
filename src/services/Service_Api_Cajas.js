import { END_POINTS } from './Endpoints'
import axios from 'axios';
export const Get_Organizations = async (idOrganizacion, fechaActual, fechaDestino) => {
    try {
        const response = await axios.get(`${END_POINTS.UPDATE_CAJAS}?id_org=${idOrganizacion}&fchActual=${fechaActual}&fchDestino=${fechaDestino}`);
        if (response.status === 200) {
            return `OK: ${response.data}.`;
        } else {
            throw(`ERROR: No se pudo obtener el usuario. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                throw(error.response.data);
            } else if (error.response.status === 401) {
                throw(error.response.data);
            } else if (error.response.status === 404) {
                throw(error.response.data);
            } else {
                throw(`Error en la solicitud: ${error.response.data}`);
            }
        } else {
            throw(`Error en la solicitud: ${error.message}`);
        }
    }
};