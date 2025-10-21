
import { END_POINTS } from './EndPointLogistica';
import axios from 'axios';
import dayjs from 'dayjs';

export const REPORT_EXCEL_PRODUCTONOAPROPIADO= async () => {
    try {
        const response = await axios.get(
            `${END_POINTS.DOWNLOAD_REPORT_ITEMSNOAPROPIADOS}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `PRODUCTO NO APROPIADO ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
    }
};