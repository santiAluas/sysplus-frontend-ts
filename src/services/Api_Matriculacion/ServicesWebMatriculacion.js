import { END_POINTS } from './EndPointMatriculacion';
import axios from 'axios';
import dayjs from 'dayjs';


export const GET_AGENCIES_BY_EMPLOYEE = async (username) => {
    try {
        const response = await axios.get(`${END_POINTS.GET_AGENCIES_BY_EMPLOYEE}/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const SEARCH_ANTICIPO_MATRICULACION = async (codanticipo) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_ANTICIPO_MATRICULACION}?codigoanticipo=${codanticipo}`);
        return response.data;
    } catch (error) {
        throw new Error( error.response.data);
    }
};


export const UPDATE_VALUE_ANTICIPO_MATRICULACION = async (id,value ) => {
    try {
        const UpdatePriceMatriculacionClss = { id,value }
        const response = await axios.put(`${END_POINTS.UPDATE_VALUE_ANTICIPO_MATRICULACION}`, UpdatePriceMatriculacionClss);
        return response.data;
    } catch (error) {
        throw new Error( error.response.data);
    }
};
