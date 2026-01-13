import { request } from "@/utils/AxiosUtils";
import { sorteoDtoIn } from "../models/sorteoDtoIn";
import { EnpointSorteo } from "./EnpointSorteo";

export const listarFacturasSorteo = () =>
  request<sorteoDtoIn[]>(
    'get',
    `${EnpointSorteo.LISTAR_FACTURAS_TITK_TOK}`
  );

  export const descargarCsvSorteoFactrura = () =>
  request<any>(
    'get',
    `${EnpointSorteo.DESCARGAR_FACTURAS_SORTEO}`, null,null, true
  );