
import { END_POINTS } from './Contabilidad_ENDPOINT';
import axios from 'axios';
import dayjs from 'dayjs';

export const UPLOAD_DOCUMENT_EXCEL_RETENCIONES_TC = async (ListaRetencionesTC) => {
    try {
        const response = await axios.post(`${END_POINTS.UPLODAD_RETENCIONES}`, ListaRetencionesTC);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const GRABAR_LIQUIDACION_TARJETAS = async (liquidacionGrabar) => {
    try {
        const response = await axios.post(`${END_POINTS.GRABAR_LIQUIDACION}`, liquidacionGrabar);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const SUBIR_EXCEL_VALORES_LOTES_TEMPORALES = async (DATA) => {
    try {
        const response = await axios.post(`${END_POINTS.EXCEL_SUBIR_VALORES_LOTES}`, DATA);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const DESCARGAR_EXTRACTO_OPEN = async (extractoExcel) => {
    try {
        const response = await axios.post(`${END_POINTS.DESCARGAR_DATOS_OPEN_BRAVO_EXTRACTO}`, extractoExcel);
        return response.data;
    } catch (error) {
        console.error("Error backend:", error?.response?.data || error.message);
        throw new Error('Error: ' + (error?.response?.data?.message || 'Error inesperado'));
    }
}


export const BUSCAR_LIQUIDACIONES_CODIGO = async (codigoliquidacion) => {
    try {
        const response = await axios.get(`${END_POINTS.LIQUIDACION_CODIGO}?parametroBusqueda=${codigoliquidacion}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const OBTENER_SECUENCIAL_LIQUIDACIONES = async () => {
    try {
        const response = await axios.get(`${END_POINTS.SECUENCIAL_LIQUIDACIONES}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const RETORNAR_COLUMAS_REPORTE_COBROS = async () => {
    try {
        const response = await axios.get(`${END_POINTS.RETORNAR_COLUMNAS_REPORTES_TC}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const BUSQUEDA_LOTE= async (numeroLote) => {
    try {
        const response = await axios.get(`${END_POINTS.BUSCAR_LOTE_SW}?numeroLote=${numeroLote}`);  
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const BUSCAR_INFORMACION_FACTURA = async (numerodocumento) => {
    try {
        const response = await axios.get(`${END_POINTS.BUSCAR_FACTURAS}?numeroDocumento=${numerodocumento}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const BUSCAR_INFORMACION_RETENCIONES = async (numerodocumento) => {
    try {
        const response = await axios.get(`${END_POINTS.BUSCAR_RETENCIONES}?numeroDocumento=${numerodocumento}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const BUSCAR_INFORMACION_EXTRACTO = async (numerodocumento, valorDebitoCredito) => {
    try {
        const response = await axios.get(`${END_POINTS.BUSCAR_EXTRACTO}?numeroDocumento=${numerodocumento}&cantidadBuscar=${valorDebitoCredito}`);
        return response.data;

    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const RETORNAR_BANCOS_REPORTE_COBROS = async () => {
    try {
        const response = await axios.get(`${END_POINTS.RETORNAR_BANCOS_EMISORES}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const REPORTE_COBROS_TARJETAS = async (numerocobro,
    fechainicial,
    fechafinal,
    banco,
    lote,
    referencia,
    columnas
) => {
    try {
        const response = await axios.get(`${END_POINTS.REPORTE_CORBOS_TARJETAS}?numerocobro=${numerocobro}
                                                                                &fechainicial=${fechainicial}
                                                                                &fechafinal=${fechafinal}
                                                                                &banco=${banco}
                                                                                &lote=${lote}
                                                                                &referencia=${referencia}
                                                                                &columnas=${columnas} `);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const REPORT_EXCEL_COBROS_TARJETAS = async (numerocobro,
    fechainicial,
    fechafinal,
    banco,
    lote,
    referencia,
    columnas
) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_CORBOS_TARJETAS_EXCEL}?numerocobro=${numerocobro}
                                                                                &fechainicial=${fechainicial}
                                                                                &fechafinal=${fechafinal}
                                                                                &banco=${banco}
                                                                                &lote=${lote}
                                                                                &referencia=${referencia}
                                                                                &columnas=${columnas} `,
            { responseType: 'blob' }
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `COBROS TARJETAS${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw (`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) 
    {
    }
};


export const REPORT_EXCEL_EXTRACTOBANCARIO = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORT_EXCEL_EXTRACTOBANCARIO}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
            { responseType: 'blob' }
        );

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `EXTRACTO BANCARIO ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw (`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) 
    {
    }
};