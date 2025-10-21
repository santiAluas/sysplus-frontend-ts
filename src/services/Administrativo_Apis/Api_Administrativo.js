
import { END_POINTS } from './Endpoint_Administrativo';
import axios from 'axios';
import dayjs from 'dayjs';

export const UPLOAD_INITIAL_DAY = async (username, numberProspectos, numberSolicitudes, numberFacturas) => {
    try {
        const response = await axios.get(`${END_POINTS.UPLOAD_INITIAL_DAY}?username=${username}&numberProspectos=${numberProspectos}&numberSolicitudes=${numberSolicitudes}&numberFacturas=${numberFacturas}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const UPLOAD_FINISH_DAY = async (username, numberProspectos, numberSolicitudes, numberFacturas) => {
    try {
        const response = await axios.get(`${END_POINTS.UPLOAD_FINISH_DAY}?username=${username}&numberProspectos=${numberProspectos}&numberSolicitudes=${numberSolicitudes}&numberFacturas=${numberFacturas}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const UPLOAD_CHECK_INIT_PAGE = async (username) => {
    try {
        const response = await axios.get(`${END_POINTS.CHECK_INITIAL_PAGE}?username=${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const GET_ALL_EMPLOYEE_AGENCY = async (dateInit, organizationid,  username) => {
    try {
        const response = await axios.get(`${END_POINTS.GET_ALL_EMPLOYEE_AGENCY}?date=${dateInit}&organizationid=${organizationid}&username=${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const GET_ALL_AGENCY = async (dateInit, typeReport,  organizationid,  username) => {
    try {
        const response = await axios.get(`${END_POINTS.GET_ALL_AGENCY}?date=${dateInit}&typeReport=${typeReport}&organizationid=${organizationid}&username=${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}; 

export const INFO_DATE_REGISTER = async () => {
    try {
        const response = await axios.get(`${END_POINTS.INFO_DATE_REGISTER}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const REPORT_EMPLOYEE_ORDER = async (date, type, typeorder,OrganizationId, username) => {
    try {
        const response = await axios.get(`${END_POINTS.REPORT_EMPLOYEE_ORDER}?date=${date}&type=${type}&typeorder=${typeorder}&organizationid=${OrganizationId}&username=${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

// export const REPORT_EXCEL_COMPROMISOS = async (dateInit, dateFinish, username, organizationid) => {
//     try {
//         const response = await axios.get(`${END_POINTS.REPORT_EXCEL_COMPROMISOS}?dateInit=${dateInit}&dateFinish=${dateFinish}&username=${username}&organizationid=${organizationid}`);
//         return response.data;
//     } catch (error) {
//         throw new Error('Error: ' + error.response.data);
//     }
// };


export const GENERAR_COBRO_OB = async (cod_comprobante, valor_cancela, id_organizacion) =>{
    try {
        const body = {
            cod_comprobante,
            valor_cancela,
            id_organizacion
        }
        const response = await axios.post(`${END_POINTS.GENERAR_COBRO_OB}`,body);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const REPORT_EXCEL_COMPROMISOS = async (dateInit, dateFinish, username, organizationid) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORT_EXCEL_COMPROMISOS}?dateInit=${dateInit}&dateFinish=${dateFinish}&username=${username}&organizationid=${organizationid}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE COMPROMISOS POR ZONAS ${dayjs().format("YYYY-MM-DD")}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};

