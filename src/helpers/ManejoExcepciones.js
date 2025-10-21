import { toast } from 'react-toastify';

export const manejoMensajes = (funcion, mensaje) => {
  toast.promise(
    funcion,
    {
      pending: {
        render({ data }) {
          return "CONSULTANDO ...";
        },
        position: toast.POSITION.TOP_CENTER
      },
      success: {
        render({ data }) {
          return mensaje;
        },
        icon: "🟢",
        position: toast.POSITION.TOP_CENTER
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
        icon: '🔴',
        position: toast.POSITION.TOP_CENTER
      }
    }
  );
};