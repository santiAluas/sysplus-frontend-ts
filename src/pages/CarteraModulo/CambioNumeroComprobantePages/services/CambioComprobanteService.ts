import { actualizarGestorServicioWeb } from './../../../CambioGestorMatricula/services/ServciceioWebCambioGestorMatricula';
import { request } from "@/utils/AxiosUtils";
import CambioComprobanteInDto from "../models/CambioComprobanteInDto";
import CambioComprobanteEndPoint from './CambioComprobanteEndPoint';

export const informacionComprobante = (numeroComprobante: string) =>
    request<CambioComprobanteInDto[]>(
      'get',
      `${CambioComprobanteEndPoint.INFORMACION_FACTURA}/${numeroComprobante}`,
);

export const cambiarNumeroComprobante = (numeroAnterior:string, numeroNuevo:string, usuario: string, facturaId:string) =>
    request<string[]>(
      'get',
      `${CambioComprobanteEndPoint.ACTUALIZAR_NUMERO_COMPROBANTE}/${numeroAnterior}/${numeroNuevo}/${usuario}/${facturaId}`,
);
