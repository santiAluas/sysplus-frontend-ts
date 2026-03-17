import { request } from "@/utils/AxiosUtils";
import ATMEndPoint from "./ATMEndPoint";

export const VizualizarHtml = (codigoPlantilla: String, ramv: String, ciudad: String) =>
    request<string>(
      'get',
      `${ATMEndPoint.VIZUALIZAR_HTML_ATM}/${codigoPlantilla}/${ramv}/${ciudad}`
);

export const DescargarPDFATM = (codigoPlantilla: String, ramv: String, ciudad: String) =>
    request<string>(
      'get',
      `${ATMEndPoint.DESCARGAR_PDF_ATM}/${codigoPlantilla}/${ramv}/${ciudad}`,
      null,
      null,
      true
);