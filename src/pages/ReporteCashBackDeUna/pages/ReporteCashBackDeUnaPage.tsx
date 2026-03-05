import { Button } from "@mui/material"
import { descargarReporteCasbackSW } from "../services/ReporteCashBackEndServicioWeb"
import { useLoading } from "@/componentesCommons/LoadingContext"

const ReporteCashBackDeUnaPage = () => {
    const {startLoading, stopLoading} = useLoading();
    const descargar = async () =>{
        try {
            startLoading();
            await descargarReporteCasbackSW()
        } finally {
            stopLoading();
        }
    }


  return (
    <>
        <Button fullWidth variant="contained" onClick={descargar}>DESCARGAR REPORTE</Button>
    </>
  )
}

export default ReporteCashBackDeUnaPage