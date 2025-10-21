import { Decrypt_User } from '../services/Storage_Service'
export const ObtenerUsuarioLogin = () => {
    const user = Decrypt_User();
    return user;
  }
