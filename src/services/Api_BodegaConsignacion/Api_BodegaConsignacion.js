
import { END_POINTS } from './Endpoint_BodegaConsignacion';
import axios from 'axios';
import dayjs from 'dayjs';

export const UPLOAD_DATA_MODEL_PROVEEDOR = async (proveedorData) =>{
    try {
        const response = await axios.post(`${END_POINTS.UPLOAD_PRODUCT_INVENTARY}`,proveedorData);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const UPLOAD_DATA_PRODUCT_COST = async (productCost) =>{
    try {
        const response = await axios.post(`${END_POINTS.UPLOAD_PRODUCT_COST}`,productCost);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const UPLOAD_DATA_PEDIDO_COMPRA= async (pedidoCompra) =>{
    try {
        const response = await axios.post(`${END_POINTS.UPLOAD_PEDIDO_COMPRA}`,pedidoCompra);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const GET_ALL_PEDIDOS_VENTA = async (agencyId) => {
    try {
        const response = await axios.get(`${END_POINTS.ALL_PEDIDOS_VENTA}?agency=${agencyId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const SEARCH_PRODUCT_TRANSFER_WHEREHOUSE = async (MotorOrChasis) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_PRODUCT_TRANSFER_WHEREHOUSE}?MotorOrChasis=${MotorOrChasis}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const UPDATE_ITEM_WHEREHOUSE = async (idPedidoDetalle, idBodegaDestino) => {
    try {
        const response = await axios.get(`${END_POINTS.UPDATE_ITEM_WHEREHOUSE}?idPedidoDetalle=${idPedidoDetalle}&idBodegaDestino=${idBodegaDestino}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const SEARCH_ITEM_DAR_BAJA = async (MotorChasis) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_ITEM_DAR_BAJA}?parameterSearch=${MotorChasis}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const CANCELAR_ITEM_APROPIACION = async (imageFile, idSolicutud, observacion) => {


    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const response = await axios.post(`${END_POINTS.DAR_BAJA_ITEM_PEDIDO_COMPRA}?idSolicutud=${idSolicutud}&observacion=${observacion}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
    } catch (error) {
      throw `ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${error}`;
    }
};

export const GET_SEARCH_PEDIDO_VENTA= async (parameterSearch, agencyId) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_PEDIDOS_VENTA}?parameterSearch=${parameterSearch}&agency=${agencyId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const SAVE_PEDIDO_COMPRA= async (pedidoCompra) =>{
    try {
        const response = await axios.post(`${END_POINTS.SAVE_PEDIDOS_COMPRA}`,pedidoCompra);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}



export const GET_ALL_SOLICITUDES_APROPIACION = async (agencyId, searchParameter) => {
    try {
        const response = await axios.get(`${END_POINTS.ALL_SOLICITUD_APROPIACION}?agency=${agencyId}&searchParameter=${searchParameter}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const SAVE_SOLICITUDES_APROPIACION= async (solicitudApropiacion) =>{
    try {
        const response = await axios.post(`${END_POINTS.SAVE_SOLICITUD_APROPIACION}`,solicitudApropiacion);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const GET_ALL_SOLICITUDES_APROPIACION_X_APROBAR = async (agencia, parameterSearch) => {
    try {
        const response = await axios.get(`${END_POINTS.ALL_SOLICITUD_APROPIACION_X_APROBACION}?agencia=${agencia}&parameterSearch=${parameterSearch}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const APROVAR_RECHAZAR_SOLICITUD_APROPIACION = async (usuario, estado, idSolicitud) => {
    try {
        const response = await axios.put(`${END_POINTS.UPDATE_SOLICITUD_APROPIACION_X_APROBACION}?usuario=${usuario}&estado=${estado}&idSolicitud=${idSolicitud}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const REPORT_CONSIGNACION_PROPIEDAD = async (parameterSearch) => {
    try {
        const response = await axios.get(`${END_POINTS.REPORT_CONSIGNACION_PROPIEDAD}?parameterSearch=${parameterSearch.toUpperCase()}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const REPORT_PRODUCT_COST= async (fechainicio, fechafin) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORT_PRODUCT_COST}?fechainicio=${fechainicio}&fechafin=${fechafin}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE COSTOS PRODUCTOS ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};


export const REPORT_BODEGA_CONSIG_PROPIEDAD_AGENCIAS= async (agencia) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORT_BODEGA_CONSIG_PROPIEDAD_AGENCIAS}?agencia=${agencia}`,
            { responseType: 'blob' } // Indicar que la respuesta es un archivo binario (Excel)
        );

        if (response.status === 200) {
            // Crear un objeto Blob y crear una URL para descargar el archivo
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él para iniciar la descarga
            const link = document.createElement('a');
            link.href = url;
            link.download = `REPORTE BEGAS CONSIGNACIONES ${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`; // Nombre del archivo de descarga
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw(`ERROR: No se pudo obtener el archivo. Respuesta del servidor: ${response.status}`);
        }
    } catch (error) {
        // Manejo de errores aquí
    }
};