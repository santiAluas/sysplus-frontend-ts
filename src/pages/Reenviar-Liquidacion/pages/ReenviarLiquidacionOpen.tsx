import SearchBlobal from "@/components/SearchBlobal"
import { useState } from "react"
import { obtenerInformacionLiquidacionServicioWeb, reenviarLiquidacionOpenBravoSW } from "../services/ReenviarLiquidacionServices";
import { ReenviarLiquidacionInDto } from "../models/ReenviarLiquidacionInDto";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { showAlert } from "@/utils/modalAlerts";
import { useLoading } from "@/componentesCommons/LoadingContext";

const ReenviarLiquidacionOpen = () => {
    const [buscarLiquidacion, setBuscarLiquidacion] = useState<string>("");
    const [respuestaLiquidacion, setRespuestaLiquidacion] = useState<ReenviarLiquidacionInDto[]>([])
    const {startLoading, stopLoading} = useLoading();

    const ejecutarBuscardorLiquidacion = async () =>{
        try {
            const respuesta = await obtenerInformacionLiquidacionServicioWeb(buscarLiquidacion)
            setRespuestaLiquidacion(respuesta);
        } finally{
            stopLoading();
        }
    }

    const reenviarLiquidacionOpenBravo = async() => {
        try {
            startLoading();
            await reenviarLiquidacionOpenBravoSW(respuestaLiquidacion[0].codigoliquidacion ?? "");
            const configAlert = {
                                title: "Correcto",
                                message: "Se ejecuto correctamente",
                                type: 'success',
                                callBackFunction: true,
                                onCloseFunction:ejecutarBuscardorLiquidacion
                            };
            showAlert(configAlert);
        } finally{
            stopLoading();
        }
    }

  return (
    <>
        <SearchBlobal title="Buscar liquidacion" functionExecute={ejecutarBuscardorLiquidacion}
                        parameterSearch={buscarLiquidacion}
                        setParameterSearch={setBuscarLiquidacion}/>
        {respuestaLiquidacion.length > 0 ? (
                <Grid container spacing={2}>
                    <Grid item lg={4}>
                        <Typography> 
                            <strong>GESTOR: </strong> {respuestaLiquidacion[0].gestMatricula}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography> 
                            <strong>CODIGO LIQUIDACION: </strong> {respuestaLiquidacion[0].codigoliquidacion}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography> 
                            <strong>NUMERO FACTURA: </strong> {respuestaLiquidacion[0].numfactura}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography> 
                            <strong>RAMV: </strong> {respuestaLiquidacion[0].ramv}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography> 
                            <strong>VALOR MATRICULACION: </strong> {respuestaLiquidacion[0].valorTotalMatric}
                        </Typography>
                    </Grid>
                      <Grid item lg={4}>
                        <Typography> 
                            <strong>TOTAL LIQUIDACION: </strong> {respuestaLiquidacion[0].totalliquidacion}
                        </Typography>
                    </Grid>
                    <Grid item lg={4} >
                        <Typography sx={{ textDecoration: 'underline' }} color='indigo'> 
                            <strong>ESTADO LIQUIDACION OPEN: </strong> {respuestaLiquidacion[0].estado}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography sx={{ textDecoration: 'underline' }} color='indigo'> 
                            <strong>MENSAJE OPEN: </strong> {respuestaLiquidacion[0].respuestaopen}
                        </Typography>
                    </Grid>
                    <Grid item lg={12}>
                        <Button onClick={reenviarLiquidacionOpenBravo} fullWidth>Reenviar Liquidacion a OPEN BRAVO</Button>
                    </Grid>
                </Grid>

        ) :(

            <Alert severity="info">SIN DATOS</Alert>
        )}

        
    </>
  )
}

export default ReenviarLiquidacionOpen