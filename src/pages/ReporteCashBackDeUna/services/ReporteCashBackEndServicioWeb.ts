import { request } from "@/utils/AxiosUtils";
import { ReporteCashBackEndPoint } from "./ReporteCashBackEndPoint";

  export const descargarReporteCasbackSW = () =>
  request<string>(
    'get',
    `${ReporteCashBackEndPoint.DESCARGAR_REPORTE_CASH_BACK}`,
    null,
    null,
    true
  );