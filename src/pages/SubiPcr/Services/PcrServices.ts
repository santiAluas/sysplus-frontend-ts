import { request } from "@/utils/AxiosUtils";
import PcrEndpoint from "./PcrEndpoint";

export const cargarPcrs = (pcrs: any) =>
    request<string>(
      'post',
      PcrEndpoint.SUBIR_PCRS,
      pcrs
);