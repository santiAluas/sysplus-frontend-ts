import { END_POINTS } from './Endpoints';
import axios from 'axios';
import dayjs from 'dayjs';

export const DESCARGAR_DOCUMENTO_PDF = async (agencia) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORTE_AUDITORIA_PDF}/${agencia}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `RECONTEO_INVENTARIO_PDF_${dayjs()}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };


  export const DESCARGAR_DOCUMENTO_PDF_ITEMS_STOCK = async (agencia) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORTE_AUDITORIA_PDF_ITEMS_OPEN}/${agencia}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `RECONTEO_INVENTARIO_PDF_${dayjs()}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };

  export const DESCARGAR_DOCUMENTO_ACTA = async (agencia) => {
    try {
      const response = await axios.get(
        `${END_POINTS.DESCARGAR_ACTA_AUDITORIA}/${agencia}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `ACTA_INVENTARIO_PDF_${dayjs()}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };

  export const DESCARGAR_DOCUMENTO_EXCEL = async (agencia) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORTE_AUDITORIA_EXCEL}/${agencia}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `RECONTEO INVENTARIO EXCEL_${dayjs()}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw new Error(`ERROR: No se pudo obtener el archivo.`);
        }
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const ObtenerAgenciasXUsuario = async (usuario) => {
    try {
        const response = await axios.get(`${END_POINTS.OBTENER_AGENCIAS_USUARIOS}/${usuario}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const ObtenerAgenciasXUsuarioFinalizar = async (usuario) => {
    try {
        const response = await axios.get(`${END_POINTS.OBTENER_AGENCIAS_USUARIOS_FINALIZAR}/${usuario}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const ObtenerAgenciasXUsuarioReporte = async (usuario) => {
    try {
        const response = await axios.get(`${END_POINTS.OBTENER_AGENCIAS_USUARIOS_REPORTE}/${usuario}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const ObtenerReporteAuditoria = async (agencia) => {
    try {
        const response = await axios.get(`${END_POINTS.REPORTE_AUDITORIA_X_AGENCIA}/${agencia}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const ObtenerReporteAuditoriaStock = async (agencia) => {
    try {
        const response = await axios.get(`${END_POINTS.REPORTE_AUDITORIA_X_AGENCIA_STOCK}/${agencia}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const buscarProductoAuditoria = async (codproducto, agencia,estado, ubicacion) => {
    try {
        const response = await axios.get(`${END_POINTS.BUSCAR_PRODUCTO_AUDITORIA}/${codproducto}/${agencia}/${estado}/${ubicacion}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const grabar_auditoria_item = async (item) => {
    try {
      const response = await axios.post(`${END_POINTS.GRABAR_PRODUCTO_AUDITORIA}`, item);
        return response.data; 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };


  export const finalizarAuditoria = async (agencia) => {
    try {
        const response = await axios.get(`${END_POINTS.FINALIZAR_AUDITORIA_AGENCIA}/${agencia}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};