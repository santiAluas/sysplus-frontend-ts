import { END_POINTS } from './Endpoints';
import axios from 'axios';
import dayjs from 'dayjs';
export const SEARCH_CLIENTE = async (numeroDocumento) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_ORDEN_TRABAJO}/${numeroDocumento}`);
        if (response.status === 200) {
            return response.data;
        }
        throw Error('ERROR: No se pudo obtener el usuario.');
    } catch (error) {

        throw Error(error.response.data);
    }
};


export const GRABAR_ENCUESTA = async (encuesta) => {
    try {
        const response = await axios.post(`${END_POINTS.RECORD_ENCUESTA}`, encuesta);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw Error(error.response.data);
    }
};



export const GET_REPORTE_ACTIVACION_GARANTIA = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_ACTIVACION_GARANTIA}/${fechaInicio}/${fechaFin}`,
            { responseType: 'blob' }
        );
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE ACTIVACION DE GARANTIA_${dayjs()}.xlsx`;
            link.click();
            return 'OK: Archivo descargado correctamente.';
        } else {
            throw (`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        throw (error.response.data);
    }
};


export const GET_REPORTE_POST_VENTA = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_POST_VENTA}/${fechaInicio}/${fechaFin}`,
            { responseType: 'blob' }
        );
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE POST VENTA_${dayjs()}.xlsx`;
            link.click();
            return 'OK: Archivo descargado correctamente.';
        } else {
            throw (`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        throw (error.response.data);
    }
};

