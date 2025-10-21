import { request } from "@/utils/AxiosUtils";
import EndPointCargarGestion from "./EndPointCargarGestion";

export const cargarGestoresServiceWeb = (dataGestores: any) =>
    request<string>(
      'post',
      EndPointCargarGestion.CARGAR_GESTORES,
      dataGestores
);
  
export const generarAnticiposServiceWeb = (factura: string) =>
  request<string>(
    'get',
    `${EndPointCargarGestion.GENERAR_ANTICIPOS_CABECERA}/${factura}`
  );