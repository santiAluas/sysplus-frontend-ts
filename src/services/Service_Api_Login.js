import {END_POINTS} from './Endpoints'
import axios from 'axios';
import {Encrypt_User} from './Storage_Service'
export const getLogin = async(LoginModel)=> {
    try {
      const response = await axios.post(END_POINTS.LOGIN, LoginModel);
      if (response.status === 200) {
        Encrypt_User(response.data)
        return "OK: Ingreso Correctamente"
      } else {
        return('ERROR: No se pudo obtener el usuario.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error('Requesasdfsadf0');
        }
      } else {
        throw new Error('Error:', error.message);
      }
    }
  }