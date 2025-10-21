import { request } from "@/utils/AxiosUtils";
import { SubirInventarioEndpoint } from "./SubirInventarioEndpoint";

export const subirInventarioOpenBravoNuevoServiceWeb = (subirInventario: any) =>
    request<string>(
      'post',
      SubirInventarioEndpoint.SUBIR_INVENTARIO_OPEN_BRAVO_NUEVO,
      subirInventario
);