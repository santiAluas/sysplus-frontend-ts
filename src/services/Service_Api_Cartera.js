import { END_POINTS } from './Endpoints'
import axios from 'axios';

export const CONSULTAR_VALORES_CARTERA = async (numeroDocumento) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_CARTERA_SALDOS}/${numeroDocumento}`
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw(error.response.data);
    }
};