import { END_POINTS } from './Endpoints';
import axios from 'axios';
import dayjs from 'dayjs';

export const SUBIR_IMAGENES_LIQUIDACION = async (imageFile, codAnticipo, tipoImagen) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  try {
    const response = await axios.post(`${END_POINTS.GRABAR_IMAGENES_LIQUIDACION}/${codAnticipo}/${tipoImagen}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  } catch (error) {
    throw `ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${error}`;
  }
};



export const GRABAR_LIQUIDACION = async (liquidacion) => {
  try {
    const response = await axios.post(`${END_POINTS.GRABAR_LIQUIDACION}`, liquidacion);
    if (response.status === 200) {
      return response.data; // Devuelve los datos de la respuesta si la solicitud tiene éxito.
    } else {
      throw new Error('ERROR: No se pudo grabar el Liquidacion.');
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Error de solicitud: ' + error.response.data); // Manejo específico de error de solicitud (código de estado 400).
    } else {
      throw new Error('Error: ' + error.message); // Otros errores.
    }
  }
};



export const DESCARGAR_DOCUMENTO_LIQUIDACION = async (codigoAnticipo, sucursal) => {
  try {
    const response = await axios.get(
      `${END_POINTS.DESCARGAR_DOCUMENTO_LIQUIDACION}/${codigoAnticipo}/${sucursal}`,
      { responseType: 'blob' }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `DOCUMENTO LIQUIDACION_${codigoAnticipo}.pdf`;
      link.click();

      return 'OK: Archivo descargado correctamente.';
    } 
  } catch (error) {
    throw(`El comprobante ${codigoAnticipo} no pertenece a su sucursal o no existe`);
    // Manejo de errores aquí
  }
};


export const DESCARGAR_DOCUMENTO_ACTA_ENTREGA_VEHICULO = async (ramv) => {
  try {
    const response = await axios.get(
      `${END_POINTS.DESCARGAR_DOCUMENTO_ACTA_ENTREGA_VEHICULO}?ramv=${ramv}`,
      { responseType: 'blob' }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `ACTA ENTREGA DE MATRICULA_${ramv}.pdf`;
      link.click();

      return 'OK: Archivo descargado correctamente.';
    } 
  } catch (error) {
    throw(`El comprobante ${ramv} no pertenece a su sucursal o no existe`);
    // Manejo de errores aquí
  }
};


export const DESCARGAR_REPORTE_LIQUIDACIONES= async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(
      `${END_POINTS.REPORTE_LIQUIDACIONES}/${fechaInicio}/${fechaFin}`,
      { responseType: 'blob' }
    );

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `DOCUMENTO LIQUIDACION_${dayjs()}.xlsx`;
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