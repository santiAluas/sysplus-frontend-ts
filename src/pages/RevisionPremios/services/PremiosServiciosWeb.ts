import { PremiosConsultaInDto } from "../models/PremiosConsultaInDto";
import { EnpointPremios } from "./EnpointPremios";
import { request } from "@/utils/AxiosUtils";

export const consultarClientePremio = (numeroFactura: string, numeroCedula: string) =>
    request<PremiosConsultaInDto[]>(
      'get',
     `${EnpointPremios.CONSULTAR_FACTURA_CLIENTE}/${numeroFactura}/${numeroCedula}`,
);

export const verificarSiYaCanjeoServicioWeb = (numeroFactura: string) =>
    request<boolean>(
      'get',
     `${EnpointPremios.VERIFICAR_CAJE_PREMIO}/${numeroFactura}`,
);

export const entregarPremioServicioWeb = (numeroFactura: string, cliente: string, usuarioRegistra: string) =>
    request<boolean>(
      'get',
     `${EnpointPremios.ENTREGAR_PREMIO}/${numeroFactura}/${cliente}/${usuarioRegistra}`,
);