// /api/Verificaciones/reporte-verificacion/{fechainicio}/{fechafin}
import { END_POINTS } from './Endpoints';
import axios from 'axios';
import dayjs from 'dayjs';

export const OBTENER_REPORTE_VERIFICACIONES= async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.DESCARGAR_REPORTE_VERIFICACIONES}/${fechaInicio}/${fechaFin}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `GESTIONES_${dayjs()}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        throw(`ERROR: ${error}`);
    }
};