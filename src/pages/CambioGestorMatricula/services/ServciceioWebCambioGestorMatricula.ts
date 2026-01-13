import { request } from "@/utils/AxiosUtils";
import EnpointCambioGestorMatricula from "./EnpointCambioGestorMatricula";
import { InformacionAnticito } from "../models/InformacionAnticito";
import { InformacionGestores } from "../models/InformacionGestores";

export const listarCajasOpenServiceWeb = (fechaInicio: string, fechaFin: string, parametroBusqueda: string ) =>
  request<InformacionAnticito>(
    'get',
    `${EnpointCambioGestorMatricula.OBTENER_ANTICIPO_BUSQUEDA}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&parametroBusqueda=${parametroBusqueda}`
  );

  export const actualizarGestorServicioWeb = (gestor: string, codigoAnticipo: string) =>
  request<string>(
    'get',
    `${EnpointCambioGestorMatricula.ACTUALIZAR_GESTOR_ANTICIPO}?nombregestor=${gestor}&codigoAnticipo=${codigoAnticipo}`
  );

  
export const obtenerGestoresMatriculacionServicoWeb = () =>
  request<InformacionGestores[]>(
    'get',
    `${EnpointCambioGestorMatricula.OBTENER_GESTORES_MATRICULACION}`
  );