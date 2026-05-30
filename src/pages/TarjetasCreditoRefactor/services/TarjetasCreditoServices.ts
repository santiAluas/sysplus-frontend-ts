import { request } from "@/utils/AxiosUtils";
import TarjestasCreditoEndPoint from "./TarjestasCreditoEndPoint";
import CobrosOriginalesOutDto from "../Dtos/CobrosOriginalesOutDto";
import { LiquidacionesTarjetaCreditoOutDto } from "../Dtos/LiquidacionesTarjetaCreditoOutDto";
import CobrosOriginalesInDto from "../Dtos/CobrosOriginalesInDto";
import ActualizarCobroOrinalOutDto from "../Dtos/ActualizarCobroOrinalOutDto";
import { LiquidacionesTarjetasInDto } from "../Dtos/LiquidacionesTarjetasInDto";
import ActualizarLiquidacionesOutDto from "../Dtos/ActualizarLiquidacionesOutDto";
import { ReporteCobroOriginalLiquidacionInDto } from "../Dtos/ReporteCobroOriginalLiquidacionInDto";

export const DescargarCobrosOriginalesServiciosWeb = (fechaInicio: string, fechaFin:string) =>
    request<string>(
      'get',
      `${TarjestasCreditoEndPoint.DESCARGAR_COBROS_ORIGINALES}/${fechaInicio}/${fechaFin}`,
      null,
      undefined,
      true
);

export const DescargarReporteTarjetaCreditoServicioWeb = () =>
    request<string>(
      'get',
      `${TarjestasCreditoEndPoint.DESCARGAR_REPORTE_LIQUIDACIONES_TARJETA_CREDITO}`,
      null,
      undefined,
      true
);

export const ListarLiquidacionesTarjetaCreditoServicioWeb = () =>
    request<ReporteCobroOriginalLiquidacionInDto[]>(
      'get',
      `${TarjestasCreditoEndPoint.REPORTE_LIQUIDACIONES_TARJETA_CREDITO}`,
);


export const BuscarCobrosOriginalesServicioWeb = (codigoPago: string) =>
    request<CobrosOriginalesInDto[]>(
      'get',
      `${TarjestasCreditoEndPoint.BUSCAR_COBRO_ORIGINAL}/${codigoPago}`,
);

export const BuscarLiquidacionesTarjetaServicioWeb = (comercio: string, lote: string,recap: string) =>
    request<LiquidacionesTarjetasInDto[]>(
      'get',
      `${TarjestasCreditoEndPoint.BUSCAR_LIQUIDACIONES_TARJETA}?comercio=${comercio}&lote=${lote}&recap=${recap}`,
);


export const ActualizarCobroOriginales = (codigoPago: string, servicios: ActualizarCobroOrinalOutDto) =>
    request<string>(
      'put',
      `${TarjestasCreditoEndPoint.ACTUALIZAR_COBRO_ORIGINAL}/${codigoPago}`,
      servicios,
);

export const ActualizarCobroOriginalesBloqueServicioWeb = (codigoPago: string, nuevoComercio: string) =>
    request<string>(
      'put',
      `${TarjestasCreditoEndPoint.ACTUALIZAR_NUEVO_COMERCIO_BLOQUE}?codigoPago=${codigoPago}&nuevoComercio=${nuevoComercio}`
);

export const ActualizarLiquidacionesTarjetasServicioWeb = (codigoLiquidaciones: string, servicios: ActualizarLiquidacionesOutDto) =>
    request<string>(
      'put',
      `${TarjestasCreditoEndPoint.ACTUALIZAR_LIQUIDACIONES_TARJETAS}/${codigoLiquidaciones}`,
      servicios,
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
