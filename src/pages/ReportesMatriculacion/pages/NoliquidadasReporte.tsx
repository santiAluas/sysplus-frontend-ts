import { useLoading } from "@/componentesCommons/LoadingContext";
import { Button } from "@mui/material";
import { reporteNoLiqudiadas } from "../services/LiquidacionesServiciosWeb";

const NoliquidadasReporte = () => {
  const {startLoading, stopLoading} = useLoading
  ();
    const descargarreporte = async () =>{
        try {
            startLoading();
            await reporteNoLiqudiadas();
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

export default NoliquidadasReporte