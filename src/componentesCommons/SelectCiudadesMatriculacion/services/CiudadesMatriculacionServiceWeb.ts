import OpcionesList from "@/pages/FormularioAtm/models/OpcionesList";
import { request } from "@/utils/AxiosUtils";

export const ciudadesPlantillasMatriculacion = () =>
    request<OpcionesList[]>(
      'get',
      `CiudadesMatriculacion`
);