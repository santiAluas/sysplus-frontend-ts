import { request } from "@/utils/AxiosUtils";
import { CierreCajaInDto } from "../models/CierreCajaInDto";
import EndPointCambioFechaCaja from "./EndPointCambioFechaCaja";

export const listarCajasOpenServiceWeb = (idOrganizacion: string,) =>
  request<CierreCajaInDto[]>(
    'get',
    `${EndPointCambioFechaCaja.LISTAR_CAJAS_CIERRES}/${idOrganizacion}`
  );


  
export const catualizarFechaCierreCaja = (idOrganizacion: string, nuevaFecha: string) =>
  request<string>(
    'get',
    `${EndPointCambioFechaCaja.ACTUALIZAR_CIERRE_CAJA_FECHA}/${idOrganizacion}/${nuevaFecha}`
  );