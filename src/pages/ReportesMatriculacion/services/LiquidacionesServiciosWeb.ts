import { request } from "@/utils/AxiosUtils";
import { EndPointLiquidaciones } from "./EndPointLiquidaciones";

export const reporteLiqudiadas = () => request<string>('get', 
    EndPointLiquidaciones.REPORTE_MATRICULAS_LIQUIDADAS,
null,
null,
true);

export const reporteNoLiqudiadas = () => request<string>('get', EndPointLiquidaciones.REPORTE_NO_MATRICULAS_LIQUIDADAS,null,
null,
true);
