import { request } from "@/utils/AxiosUtils";
import { EndPointReporteAuditoriaInventario } from "./EndPointReporteAuditoriaInventario";

export const generarReporteInventarioAuditoria = () =>
  request<string>(
    'get',
    `${EndPointReporteAuditoriaInventario.DECARGAR_INVENTARIO_AUDITORIA}`,
    null,
    null,
    true
  );