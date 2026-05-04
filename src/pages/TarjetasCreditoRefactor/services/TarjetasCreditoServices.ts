import { request } from "@/utils/AxiosUtils";
import TarjestasCreditoEndPoint from "./TarjestasCreditoEndPoint";
import CobrosOriginalesOutDto from "../Dtos/CobrosOriginalesOutDto";
import { LiquidacionesTarjetaCreditoOutDto } from "../Dtos/LiquidacionesTarjetaCreditoOutDto";

export const DescargarCobrosOriginalesServiciosWeb = (fechaInicio: string, fechaFin:string) =>
    request<string>(
      'get',
      `${TarjestasCreditoEndPoint.DESCARGAR_COBROS_ORIGINALES}/${fechaInicio}/${fechaFin}`,
      null,
      undefined,
      true
);



export const subirCobrosOriginales = (cobrosOriginales: CobrosOriginalesOutDto[]) =>
    request<string>(
      'post',
      TarjestasCreditoEndPoint.SUBIR_COBROS_ORIGINALES,
      cobrosOriginales
);



export const subirLiquidacionesTarjetasServicioWeb = (liquidacionesTarjeta: LiquidacionesTarjetaCreditoOutDto[]) =>
    request<string>(
      'post',
      TarjestasCreditoEndPoint.SUBIR_LIQUIDACIONES,
      liquidacionesTarjeta
);
