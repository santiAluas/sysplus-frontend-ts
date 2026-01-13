import CustomDatePicker from "@/componentesCommons/DataGridCommon/CustomDatePicker"
import { Button, Grid } from "@mui/material"
import { useState } from "react"
import { descargarReporteLiquidacionContabilidadServiceWeb } from "../services/ServiciosWebLiquidacionReporte"
import { useLoading } from "@/componentesCommons/LoadingContext"
import { showAlert } from "@/utils/modalAlerts"

const ReporteLiquidacionMatriculaContabilidad = () => {

    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");
    const {startLoading, stopLoading} = useLoading();

    const DescargarArchivo =async () =>{
       try{
        if(!fechaFin || !fechaInicio){
             const configAlert = {
                    title: "Error",
                    message: `Las fechas no pueden estar <strong> vacias</strong>`,
                    type: 'error',
                    callBackFunction: false,
                };
            showAlert(configAlert)
            return ;
        }
        startLoading();
        await descargarReporteLiquidacionContabilidadServiceWeb(fechaInicio,fechaFin)
        const configAlert = {
                title: "Correcto",
                message: `El archivo se descargo <strong> correctamente</strong>`,
                type: 'success',
                callBackFunction: false,
            };
        showAlert(configAlert)
       }finally{
            stopLoading();
       }
    }
  return (
    <Grid container spacing={2}>
        <Grid item lg={6}>
            <CustomDatePicker label="Fecha Inicio" onChangeValue={(value:any) => setFechaInicio(value) }/>
        </Grid>
        <Grid item lg={6}>
            <CustomDatePicker label="Fecha Fin" onChangeValue={(value:any) => setFechaFin(value) }/>
        </Grid>
        <Grid item lg={12}>
            <Button onClick={DescargarArchivo} fullWidth>Generar Reporte</Button>
        </Grid>
    </Grid>
  )
}

export default ReporteLiquidacionMatriculaContabilidad