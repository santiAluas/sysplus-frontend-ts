import { request } from "@/utils/AxiosUtils";
import CashBackEndPoint from "./CashBackEndPoint";

export const cargarCashBackServiceWeb = (SubirCashBack: any) =>
    request<string>(
      'post',
      CashBackEndPoint.SUBIR_EXCEL_CASHBACK_DEUNA,
      SubirCashBack
);