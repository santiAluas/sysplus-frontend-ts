import { END_POINTS } from './Endpoints';
import axios from 'axios';

export const OBTENER_DEVOLUCIONESxAPROBAR = async (BusquedaCriterio) => {
    try {
        const response = await axios.get(`${END_POINTS.OBTENER_DEVOLUCIONS_x_APROBAR}/${BusquedaCriterio}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const OBTENER_ANTICIPO_ANULAR = async (BusquedaCriterio) => {
    try {
        const response = await axios.get(`${END_POINTS.OBTENER_ANTICIPOS_PARA_DEVOLUCION}/${BusquedaCriterio}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const GRABAR_ANTICIPO_DEVOLUCION = async (newDevolucionAnticipo) => {
    try {
        const response = await axios.post(`${END_POINTS.GRABAR_ANTICPO_DEVOLUCION}`, newDevolucionAnticipo);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const UPDATE_ANTICIPO_DEVOLUCION = async (codigoAnticipo, status) => {
    try {
        const response = await axios.put(`${END_POINTS.UPDATE_ANTICPO_DEVOLUCION}`, {codigoAnticipo, status});
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const DESCARGAR_ACTA_DEVOLUCION_ANTICIPO = async (codigoAnticipo, sucursal) => {
    try {
      const response = await axios.get(
        `${END_POINTS.DOWNLOAD_ACTA_DEVOLUCION}/${codigoAnticipo}`,
        { responseType: 'blob' }
      );
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `ACTA DEVOLUCION ANTICIPO_${codigoAnticipo}.pdf`;
        link.click();
        return 'OK: Archivo descargado correctamente.';
    } catch (error) {
      throw `El documento ${codigoAnticipo} no existe o no pertenece a su organizacion`;
    }
  };
  