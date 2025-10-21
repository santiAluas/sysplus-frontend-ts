import { END_POINTS } from './Endpoint_GarantCheck';
import axios from 'axios';
import dayjs from 'dayjs';

export const GET_CLIENT_INFO_GARANCHECK = async (parameterSearch) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_CLIENT_INFO_GARANCHECK}?identification=${parameterSearch}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const GET_INFO_INEC = async () => {
    try {
        const response = await axios.get(`${END_POINTS.INFO_INEC}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const GET_INFO_CREDIT= async (numberCredit) => {
    try {
        const response = await axios.get(`${END_POINTS.INFO_CREDIT}?numberCredit=${numberCredit}`);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};

export const SAVE_INFORMATION_CLIENT_CREDIT = async (numberCredit, infoCredit) => {
    try {
        const response = await axios.post(`${END_POINTS.SAVE_CLIENT_CREDIT_INFO}?numberCredit=${numberCredit}`, infoCredit);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const SAVE_INFO_CREDIT = async (credit) => {
    try {
        const response = await axios.post(`${END_POINTS.SAVE_CREDIT_INFO}`, credit);
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const DOWNLOAD_PDF_CREDIT = async (numberCredit) => {
    // try {
    //     const response = await axios.post(`${END_POINTS.SAVE_CREDIT_INFO}?numberCredit=${numberCredit}`);
    //     return response.data;
    // } catch (error) {
    //     throw new Error('Error: ' + error.response.data);
    // }


    try {
        const response = await axios.get(
          `${END_POINTS.DOWNLOAD_DOCUMENT_CREDIT}?numberCredit=${numberCredit}`,
          { responseType: 'blob' }
        );
    
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
    
          const link = document.createElement('a');
          link.href = url;
          link.download = `REPORTE CREDITO ${numberCredit} ${dayjs().format('YYYYMMDD')}.pdf`;
          link.click();
    
          return 'OK: Archivo descargado correctamente.';
        } 
      } catch (error) {
          throw new Error('Error: ' + error.response.data);
      }
};