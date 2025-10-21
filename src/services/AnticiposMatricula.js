import { END_POINTS } from './Endpoints';
import axios from 'axios';
import dayjs from 'dayjs';
export const OBTENER_INFO_CLIENTE_OPEN_BRAVO = async (numeroDocumento) => {
  try {
    const response = await axios.get(`${END_POINTS.SEARCH_CLIENT}/${numeroDocumento}`);
    if (response.status === 200) {
      return response.data;
    }

    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error);
    }

    throw new Error('Error: ' + error.message);
  }
};


export const OBTENER_VALORES_MATRICULA = async () => {
  try {
    const response = await axios.get(`${END_POINTS.OBTENER_VALORES_MATRICULA}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error);
    }

    throw new Error('Error: ' + error.message);
  }
};


export const SEARCH_ANTICIPO = async (codigoAnticipo, numeroIdentificacion, numeroFactura) => {
  try {
    const response = await axios.get(`${END_POINTS.SEARCH_ANTICIPO_PATRICULA}/${codigoAnticipo}/${numeroIdentificacion}/${numeroFactura}`);
    if (response.status === 200) {
      return response.data;
    }
    throw ('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response.status === 400) {
      throw error.response.data;

    }
    throw ('Error: asdfasdfasdf ' + error.message);
  }
};


export const GRABAR_ANTICIPO = async (anticipo) => {
  try {
    const response = await axios.post(`${END_POINTS.GRABAR_ANTICIPO_MATRICULA}`, anticipo);
    if (response.status === 200) {
      return response.data; // Devuelve los datos de la respuesta si la solicitud tiene éxito.
    } else {
      throw new Error('ERROR: No se pudo grabar el anticipo.');
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw 'Error de solicitud: ' + error.response.data; // Manejo específico de error de solicitud (código de estado 400).
    } else {
      throw new Error('Error: ' + error.message); // Otros errores.
    }
  }
};

export const DESCARGAR_DOCUMENTO_ANTICIPO = async (codigoAnticipo, sucursal) => {
  try {
    const response = await axios.get(
      `${END_POINTS.DESCARGAR_DOCUMENTO_ANTICIPO}/${codigoAnticipo}/${sucursal}`,
      { responseType: 'blob' }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `DOCUMENTO ANTICIPO_${codigoAnticipo}.pdf`;
      link.click();

      return 'OK: Archivo descargado correctamente.';
    } else {
      throw `ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`;
    }
  } catch (error) {
    throw `El documento ${codigoAnticipo} no existe o no pertenece a su organizacion`;
    // Manejo de errores aquí
  }
};



export const DESCARGAR_REPORTE_ANTICIPO = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(
      `${END_POINTS.REPORTE_ANTICIPOS}/${fechaInicio}/${fechaFin}`,
      { responseType: 'blob' }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `DOCUMENTO ANTICIPO_${dayjs()}.xlsx`;
      link.click();

      return 'OK: Archivo descargado correctamente.';
    } else {
      throw `ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`;
    }
  } catch (error) {
    throw `ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${error}`;
    // Manejo de errores aquí
  }
};

