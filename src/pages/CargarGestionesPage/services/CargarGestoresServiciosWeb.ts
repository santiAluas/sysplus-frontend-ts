import { request } from "@/utils/AxiosUtils";
import EndPointCargarGestion from "./EndPointCargarGestion";

export const cargarGestoresServiceWeb = (dataGestores: any) =>
    request<string>(
      'post',
      EndPointCargarGestion.CARGAR_GESTORES,
      dataGestores
);
  
export const generarAnticiposServiceWeb = (factura: string, cedula: string, valor_pago: string) =>
  request<string>(
    'get',
    `${EndPointCargarGestion.GENERAR_ANTICIPOS_CABECERA}/${factura}/${cedula}/${valor_pago}`
  );