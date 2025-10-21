import CryptoJS from 'crypto-js';
const KEY_ENCRYPT = import.meta.env.VITE_REACT_APP_KEY_ENCRYPT;

export const Encrypt_User = (usuario)=>{
  ("usuario", usuario)

    const encryptedUsuario = CryptoJS.AES.encrypt(JSON.stringify(usuario), KEY_ENCRYPT).toString();
    localStorage.setItem('user', encryptedUsuario);
};

export const Decrypt_User = () => {
  const encryptedUsuario = localStorage.getItem('user'); 
  if (!encryptedUsuario) {
    return null; 
  }
  const bytes = CryptoJS.AES.decrypt(encryptedUsuario, KEY_ENCRYPT);
  const decryptedUsuario = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedUsuario;
};

export const Delete_User =()=>{
  localStorage.removeItem('user'); 
}