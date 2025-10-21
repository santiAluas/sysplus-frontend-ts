import { request } from "@/utils/AxiosUtils";
import EndpointAnticiposAdminstracion from "./EndpointAnticiposAdminstracion";
import { AnticiposPorLiquidarInDto } from "../models/AnticiposPorLiquidarInDto";

export const anticipoPorLiquidarServiceWeb = (organizacion: string, parametros: string) =>
  request<AnticiposPorLiquidarInDto[]>(
    'get',
    `${EndpointAnticiposAdminstracion.CARGAR_ANTICIPO_POR_LIQUIDAR}?agencia=${organizacion}&parametroGestor=${parametros}`
  );