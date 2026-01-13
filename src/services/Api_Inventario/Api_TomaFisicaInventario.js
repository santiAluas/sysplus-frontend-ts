import { END_POINTS } from './EndPoint_InventarioFisico';
import axios from 'axios';
import dayjs from 'dayjs';

export const UPLOAD_LIST_PRODUCT_INVENTARY = async (listPrice, nameListPrice) => {
    try {
        const response = await axios.post(`${END_POINTS.UPLOAD_PRODUCT_INVENTARY}`, {nameListPrice , listPrice});
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const GET_AGENCIES_BY_EMPLOYEE = async (username) => {
    try {
        const response = await axios.get(`${END_POINTS.GET_AGENCIES_BY_EMPLOYEE}/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const GET_AGENCIES_FINISH_AUDITORY= async (username) => {
    try {
        const response = await axios.get(`${END_POINTS.GET_AGENCY_FINISH_AUDITORY}?username=${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const SEARCH_PRODUCTO_INVENTORY = async (parameterSearch, agency, isLocal, categoria) =>{
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_PRODUCT_INVENTORY}?parametersearch=${parameterSearch}&idagencia=${agency}&isLocal=${isLocal}&categoria=${categoria}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const CHECK_SAVE_PRODUCT = (idProducto, agencia) => {
    return axios.get(`${END_POINTS.CHECK_SAVE_PRODUCT}?idProduct=${idProducto}&agencia=${agencia}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error('Error: ' + error.response.data);
        });
};


export const PRODUCTO_BY_ID = async (idProduct, agency) =>{
    try {
        const response = await axios.get(`${END_POINTS.PRODUCT_BY_ID}?idProduct=${idProduct}&agencia=${agency}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}

export const All_DESCRIPTIONS_PRODUCTS_ACTIVE = async (value,categoria = "") =>{
    try {
        const response = await axios.get(`${END_POINTS.All_DESCRIPTIONS_PRODUCTS_ACTIVE}?searchTerm=${value}&categoria=${categoria}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const SAVE_PRODUCT_INVENTORY = async (productInv) =>{
    try {
        const response = await axios.post(`${END_POINTS.SAVE_PRODUCT_INVENTORY}`,productInv);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
}


export const FINISH_INVENTORY = async (finishInventory) =>{
    try {
        const response = await axios.post(`${END_POINTS.FINISH_AUDITORY}`,finishInventory);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}


export const DOWNLOAD_COUNT_ITEM_INVENTORY = async (agency) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORT_COUNT_INVENTORY}?agency=${agency}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `REPORTE GENERAL RPM Y ACCESORIOS ${agency} ${dayjs().format('YYYYMMDD')}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };


  export const DOWNLOAD_COUNT_ITEM_INVENTORY_CIEGO = async (agency) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORT_COUNT_INVENTORY_CIEGO}?agency=${agency}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `REPORTE GENERAL RPM Y ACCESORIOS ${agency} ${dayjs().format('YYYYMMDD')}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };

  export const DOWNLOAD_COUNT_ITEM_NOT_AUDITED = async (agency) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORT_COUNT_NOT_AUDITED}?agency=${agency}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `INVENTARIO NO CONFIRMADO EN PISO RPM Y ACCESORIOS ${agency} ${dayjs().format('YYYYMMDD')}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };

  //REPORT_COUNT_NOT_AUDITED_MOTOS: `${URL_BASE}DocumentsInventory/download-count-item-not-audited-motos`,
//REPORT_COUNT_CONFORME_MOTOS: `${URL_BASE}DocumentsInventory/download-count-item-by-agencia-ciego-motos`,
  
  export const DOWNLOAD_COUNT_ITEM_NOT_AUDITED_MOTOS = async (agency) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORT_COUNT_NOT_AUDITED_MOTOS}?agency=${agency}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `REPORTE MOTOCICLETAS NO CONFIRMADO EN PISO ${agency} ${dayjs().format('YYYYMMDD')}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };

  export const DOWNLOAD_ITEMS_CONFORME_MOTOS = async (agency) => {
    try {
      const response = await axios.get(
        `${END_POINTS.REPORT_COUNT_CONFORME_MOTOS}?agency=${agency}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `REPORTE DE MOTOCICLETAS ${agency} ${dayjs().format('YYYYMMDD')}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };


  export const DOWNLOAD_REPORT_EXCEL = async (agency, tipoauditoria) => {
    try {
        const response = await axios.get(
            `${END_POINTS.REPORT_EXCEL_INVENTORY}?agency=${agency}&tipoAuditoria=${tipoauditoria}`,
            { responseType: 'blob' } 
        );
        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `RECONTEO INVENTARIO EXCEL_${dayjs().format('YYYYMMDD')}.xlsx`; 
            link.click();

            return 'OK: Archivo descargado correctamente.';
        } else {
            throw new Error(`ERROR: No se pudo obtener el archivo.`);
        }
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const DOWNLOAD_ACT_DOCUMENT = async (agency, tipoAuditoria) => {
    try {
      const response = await axios.get(
        `${END_POINTS.DOWNLOAD_ACTA_INVENTORY}?agency=${agency}&tipoAuditoria=${tipoAuditoria}`,
        { responseType: 'blob' }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        const link = document.createElement('a');
        link.href = url;
        link.download = `ACTA ENTREGA RESULTADOS ${agency}_${dayjs().format('YYYYMMDD')}.pdf`;
        link.click();
  
        return 'OK: Archivo descargado correctamente.';
      } 
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
  };

// export const SAVE_PRODUCT_INVENTARY = async (productInv) => {
//     try {
//         const response = await axios.post(`${END_POINTS.SAVE_PRODUCT_INVENTORY}`, productInv);
//         return response.data; 
//     } catch (error) {
//         throw new Error('Error: ' + (error.response ? error.response.data : error.message));
//     }
// };