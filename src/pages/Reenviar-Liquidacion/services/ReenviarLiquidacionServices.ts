import { request } from "@/utils/AxiosUtils";
import { EndPointReenviarLiquidacion } from "./EndPointReenviarLiquidacion";
import { ReenviarLiquidacionInDto } from "../models/ReenviarLiquidacionInDto";
import { AnticipoAEliminarInDto } from "../models/AnticipoAEliminarInDto";

export const obtenerInformacionLiquidacionServicioWeb = (codigoLiquidacion: string) =>
    request<ReenviarLiquidacionInDto[]>(
      'get', 
      `${EndPointReenviarLiquidacion.OBTENER_INFORMACION_LIQUIDACION}/${codigoLiquidacion}`,
);

export const reenviarLiquidacionOpenBravoSW = (codigoLiquidacion: string) =>
    request<string>(
      'get', 
      `${EndPointReenviarLiquidacion.REENVIAR_LIQUIDACION_OPEN_BRAVO}?liquidacion=${codigoLiquidacion}`,
);

export const anularLiquidacionSW = (codigoLiquidacion: string, usuarioregistra:string) =>
    request<string>(
      'get', 
      `${EndPointReenviarLiquidacion.ANULAR_LIQUIDACION}?liquidacion=${codigoLiquidacion}&usuarioRegistra=${usuarioregistra}`,
);

export const obtenerAnticipoInformacionSW = (codigoAnticipo: string) =>
    request<AnticipoAEliminarInDto[]>(
      'get', 
      `${EndPointReenviarLiquidacion.BUSCAR_ANTICIPO_X_CODIGO}/${codigoAnticipo}`,
);

export const eliminarLiquidacionCabeceraSW = (codigoAnticipo: string) =>
    request<string>(
      'get', 
      `${EndPointReenviarLiquidacion.ELIMINAR_CABECERA_LIQUIDACION}/${codigoAnticipo}`,
);