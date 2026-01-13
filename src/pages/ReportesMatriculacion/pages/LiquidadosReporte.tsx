import { useLoading } from "@/componentesCommons/LoadingContext"
import { Button } from "@mui/material"
import { reporteLiqudiadas } from "../services/LiquidacionesServiciosWeb";

const LiquidadosReporte = () => {

    const {startLoading, stopLoading} = useLoading();
    const descargarreporte = async () =>{
        try {
            startLoading();
            await reporteLiqudiadas();
        } finally {
            stopLoading();
        }
    }
  
    return (
    <Button sx={{ borderRadius: 5 }} 
            fullWidth
            onClick={descargarreporte}>Descargar Reporte</Button>
  )
}

export default LiquidadosReporte