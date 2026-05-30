import { request } from "@/utils/AxiosUtils";
import ATMEndPoint from "./ATMEndPoint";
import Opciones from "../models/Opciones";
import OpcionesList from "../models/OpcionesList";
import ReporteAtmOutDto from "../models/ReporteAtmOutDto";


export const VizualizarHtml = (plantilla: ReporteAtmOutDto) =>
    request<string>(
      'post',
      `${ATMEndPoint.VIZUALIZAR_HTML_ATM}`,
      plantilla
);

export const nombrePlantillasPorCiudad = (ciudad: string) =>
    request<OpcionesList[]>(
      'get',
      `${ATMEndPoint.OBTENER_NOMBRE_PLANTILLAS_X_CIUDAD}/${ciudad}`
);

export const DescargarPDFATM = (plantilla: ReporteAtmOutDto) =>
    request<string>(
      'post',
      `${ATMEndPoint.DESCARGAR_PDF_ATM}`,
      plantilla,
      undefined,
      true
);