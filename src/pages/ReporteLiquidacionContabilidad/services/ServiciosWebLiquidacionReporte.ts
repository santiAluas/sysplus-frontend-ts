import { request } from "@/utils/AxiosUtils";
import EndPointReporteLiquidacion from "./EndPointReporteLiquidacion";

export const descargarReporteLiquidacionContabilidadServiceWeb = (fechaInicio: string, fechaFin: string) =>
    request<string>(
      'get',
     `${EndPointReporteLiquidacion.GENERAR_REPORTE_LIQUIDACIONES_CONTABILIDAD}/${fechaInicio}/${fechaFin}`,
      null,
      null,
      true
);