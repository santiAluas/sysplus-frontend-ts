import { request } from "@/utils/AxiosUtils";
import { SubirExtraJudicialesEndPoint } from "./SubirExtraJudicialesEndPoint";

 export const subirCarteraExtraJudicialExcelServicioWeb = (items: any) =>
  request<string>(
    'post',
    `${SubirExtraJudicialesEndPoint.SUBIR_EXTRA_JUDICIALES_EP}`, 
    items,
  );