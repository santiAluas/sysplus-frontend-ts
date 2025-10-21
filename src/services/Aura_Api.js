import { END_POINTS } from './Endpoints';
import axios from 'axios';

export const GET_REVISION_MOTO = async (numeroDocumento) => {
  try {
    const response = await axios.get(`${END_POINTS.GET_REVISION_MOTO_AURA}/${numeroDocumento}`);
    if (response.status === 200) {
      return response.data;
    }

    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: ' + error.message);
  }
};

export const GET_INFORMACION_GARANTIA_MOTO = async (TIPOMOTO) => {
  try {
    
    const response = await axios.get(`${END_POINTS.GET_INFORMACION_GARANTIA_MOTO}/${TIPOMOTO}`);
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: aqui ' + error.message);
  }
};

export const UPDATE_EMAIL = async (codigoDocumento,telefono,codigoCliente,email) => {
  try {
    const datosActualizados = {
      codigoDocumento,
      telefono,
      codigoCliente,
      email
    };
    const response = await axios.put(`${END_POINTS.UPDATE_EMAIL_AURA}`, datosActualizados);
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: aqui ' + error.message);
  }
};

export const UPDATE_TELEFONO = async (codigoDocumento,telefono,codigoCliente,email) => {
  try {
    const datosActualizados = {
      codigoDocumento,
      telefono,
      codigoCliente,
      email
    };
    const response = await axios.put(`${END_POINTS.UPDATE_CELULAR_AURA}`, datosActualizados);
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: aqui ' + error.message);
  }
};



export const GRABAR_GARANTIA = async (garantia) => {
  try {
    const response = await axios.post(`${END_POINTS.CREATE_GARANTIA}`, garantia);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: aqui ' + error.message);
  }
};


export const VERIFICAR_GARANTIA = async (FACTURA) => {
  try {
    
    const response = await axios.get(`${END_POINTS.GET_GARANTIA}/${FACTURA}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: aqui ' + error.message);
  }
};


export const ACTUALIZAR_CALIFICACION = async (actualizarCalificacion) => {
  try {
    const response = await axios.put(`${END_POINTS.UPDATE_CALIFICACION}`, actualizarCalificacion);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('ERROR: No se pudo obtener el usuario.');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    }

    throw new Error('Error: aqui ' + error.message);
  }
};