import { useLoading } from "@/componentesCommons/LoadingContext"
import { Button } from "@mui/material"
import { generarReporteInventarioAuditoria } from "../services/ReporteInventarioServicoWeb";

const ReporteAuditoriaInventarioALaFecha = () => {
const {startLoading, stopLoading} = useLoading();
const decargarreporte = async () => {
  startLoading();
    await generarReporteInventarioAuditoria();
    stopLoading();
}
  return (
    <>
        <Button variant="contained" 
        fullWidth 
        sx={{borderRadius: 5}}
        onClick={decargarreporte}> Descargar Reporte Inventario</Button>
    </>
  )
}

export default ReporteAuditoriaInventarioALaFecha