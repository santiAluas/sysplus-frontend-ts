import { END_POINTS } from './Endpoint'
import axios from 'axios';
import dayjs from 'dayjs';

export const DESCARGAR_REPORTE_EXCEL_GENERAL = async (tipoReporte = '', nombreArchivo = '', fechaInicio = '', fechaFin = '') => {
    try {
        if (!END_POINTS[tipoReporte]) {
            throw new Error(`ERROR: El tipo de reporte '${tipoReporte}' no es válido.`);
        }
        const response = await axios.get(
            `${END_POINTS[tipoReporte]}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
            { responseType: 'blob' }
        );

        if (response.status !== 200) {
            throw new Error(`ERROR: Respuesta inesperada del servidor. Código: ${response.status}`);
        }
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${nombreArchivo}_${dayjs().format('YYYYMMDD_HHmmss')}.xlsx`;
        link.click();
        URL.revokeObjectURL(url); 

        return 'OK: Archivo descargado correctamente.';
    } catch (error) {
        console.error(error);
        return `ERROR: ${error.message}`;
    }
};
