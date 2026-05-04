import { request } from "@/utils/AxiosUtils";
import ATMEndPoint from "./ATMEndPoint";
import Opciones from "../models/Opciones";
import OpcionesList from "../models/OpcionesList";


export const VizualizarHtml = (codigoPlantilla: String, ramv: String, ciudad: String, usuario: string) =>
    request<string>(
      'get',
      `${ATMEndPoint.VIZUALIZAR_HTML_ATM}/${codigoPlantilla}/${ramv}/${ciudad}/${usuario}`
);

export const nombrePlantillasPorCiudad = (ciudad: string) =>
    request<OpcionesList[]>(
      'get',
      `${ATMEndPoint.OBTENER_NOMBRE_PLANTILLAS_X_CIUDAD}/${ciudad}`
);

export const DescargarPDFATM = (codigoPlantilla: String, ramv: String, ciudad: String, usuario: string) =>
    request<string>(
      'get',
      `${ATMEndPoint.DESCARGAR_PDF_ATM}/${codigoPlantilla}/${ramv}/${ciudad}/${usuario}`,
      null,
      undefined,
      true
);