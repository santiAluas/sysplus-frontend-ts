import { request } from "@/utils/AxiosUtils";
import { EndPointSubirPagosSri } from "./EndPointSubirPagosSri";

export const anticipoPorLiquidarServiceWeb = (pagos: any) =>
  request<string>(
    'post',
    `${EndPointSubirPagosSri.SUBIR_PAGOS_SRI}`,
    pagos
  );