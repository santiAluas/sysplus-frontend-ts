import { END_POINTS } from './EndpointCobrax';
import axios from 'axios';

export const RENEW_ALL_IMAGE = async (cedula, comprobante) => {
    try {
        const response = await axios.get(`${END_POINTS.RENEW_ALL_IMAGE}/${cedula}/${comprobante}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};
