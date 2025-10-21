import { END_POINTS } from './Endpoints'
import axios from 'axios';
import dayjs from 'dayjs';

export const Get_Report_Gestiones_Cobro = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_GESTIONES_COBROS}/${fechaInicio}/${fechaFin}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE COBROS GESTIONES ${dayjs()}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};

export const Get_Report_Gestiones_Cloud = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_GESTIONES_CLOUD}/${fechaInicio}/${fechaFin}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE PURE CLOUD ${dayjs()}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Report_Ventas = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_VENTAS}?FechaInicio=${fechaInicio}&FechaFinal=${fechaFin}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE DE VENTAS ${dayjs()}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};

export const GET_REPORT_COMPORTAMIENTO_PAGOS= async () => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_COMPORTAMIENTO_PAGOS}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `COMPORTAMIENTO PAGOS ${dayjs().toString("YYYY-MM-DD")}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};



export const GET_REPORT_USUARIOS_ORACLE= async () => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_USUARIOS_ORACLE}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `USUARIO ORACLE_${dayjs().toString("YYYY-MM-DD")}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Report_Generate_File_SRI= async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_SRI}/${date}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/zip' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `GENERAR ARCHIVO SRI_${dayjs()}.zip`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Report_Generate_File_EXCEL= async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_EXCEL}/${date}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `ARCHIVO EXCEL_${dayjs()}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Consultar_Actuaizar_Valores = async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_PROCESO_VALORES}/${date}`
        );
        if (response.status === 200) {
            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};



export const Get_Report_EXCEL= async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_REPORTE}/${date}/2`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE_MATRICULA_${dayjs()}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};

export const Get_Report_TEXT= async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_REPORTE}/${date}/1`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE_MATRICULA_${dayjs()}.txt`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Report_VALORES_CENTRO_COSTO = async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_CC}/${date}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `VALORES POR CENTRO DE COSTO_${dayjs()}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};

export const Get_Report_REPORTE_VENTAS = async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_CC}/?FechaInicio=2023-09-20&FechaFinal=2023-09-25`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `VALORES POR CENTRO DE COSTO_${dayjs()}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Consultar_MATRICULA_VISOR = async (date) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_MATRICULACION_VISOR}/${date}`
        );
        if (response.status === 200) {
            return response.data;
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const Get_Consultar_GESTIONES_COBROS_VISUALIZAR = async ( filter) => {
    // try {
    //     const response = await axios.get(
    //         `${END_POINTS.REPORTES_GESTIONES_COBROS_JSON}?FechaInicio=${dateInit}&FechaFinal=${dateFinish}&filtro=${filter}`
    //     );
    //     if (response.status === 200) {
    //         return response.data;
    //     } else {
    //         throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
    //     }
    // } catch (error) {
    //     // Manejo de errores aquí
    // }
};



export const GET_REPORTE_CUOTA_CERO_NO_PAGADO = async (dateInit, dateFinish) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTES_CUOTA_CERO_NO_PAGADO}/${dateInit}/${dateFinish}`,
            { responseType: 'blob' } 
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE CUPTA CERO NO PAGADO_${dayjs()}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};

