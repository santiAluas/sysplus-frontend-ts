import { request } from "@/utils/AxiosUtils";
import { UsuariosMatriculacion } from "../models/UsuariosMatriculacion";
import { MatriculacionPagosExtraordinariosEndPoint } from "./MatriculacionPagosExtraordinariosEndPoint";
import { UsuariosHabilitadosInDto } from "../models/UsuariosHabilitadosInDto";

export const ObtenerUsuariosMatriculacion = () => 
    request<UsuariosMatriculacion[]>("get", MatriculacionPagosExtraordinariosEndPoint.TODOS_USUARIOS)

export const ObtenerUsuariosHabilitadosMatriculacion = () => 
    request<UsuariosHabilitadosInDto[]>("get", MatriculacionPagosExtraordinariosEndPoint.USUARIOS_HABILITADOS)

export const habilitarUsuario = (userName: string) => 
    request<boolean>("get", MatriculacionPagosExtraordinariosEndPoint.CREAR + "/"+userName)


export const eliminarUsuario = (userName: string) => 
    request<boolean>("delete", MatriculacionPagosExtraordinariosEndPoint.ELIMINAR + "/"+userName)