import { useLoading } from "@/componentesCommons/LoadingContext";
import SearchBlobal from "@/components/SearchBlobal"
import { useState } from "react";
import { eliminarLiquidacionCabeceraSW, obtenerAnticipoInformacionSW } from "../services/ReenviarLiquidacionServices";
import { AnticipoAEliminarInDto } from "../models/AnticipoAEliminarInDto";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { showAlert } from "@/utils/modalAlerts";

const EliminarAnticipo = () => {
    const [buscarLiquidacion, setBuscarLiquidacion] = useState<string>("");
    const [respuestaLiquidacion, setRespuestaLiquidacion] = useState<AnticipoAEliminarInDto[]>([])
    const {startLoading, stopLoading} = useLoading();

    const ejecutarBuscardorAnticipo = async () =>{
        try {
            const respuesta = await obtenerAnticipoInformacionSW(buscarLiquidacion);
            setRespuestaLiquidacion(respuesta)
        } finally{
            stopLoading();
        }
    }


    const eliminarAnticipo = async () =>{

        try {
            startLoading();
            await eliminarLiquidacionCabeceraSW(respuestaLiquidacion[0].codAnticipoAura);
            const configAlert = {
                                title: "Correcto",
                                message: "Se ejecuto correctamente",
                                type: 'success',
                                callBackFunction: false
                            };
            setBuscarLiquidacion("")
            setRespuestaLiquidacion([])
            showAlert(configAlert);
        } finally{
            stopLoading();
        }
    }

  return (
    <>
         <SearchBlobal title="Buscar cabecera liquidacion" functionExecute={ejecutarBuscardorAnticipo}
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
                                                            <strong>NUMERO FACTURA: </strong> {respuestaLiquidacion[0].codAnticipoAura}
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
                                                        <Typography sx={{ textDecoration: 'underline' }} color='indigo'> 
                                                            <strong>ESTA LIQUIDADO: </strong> {!respuestaLiquidacion[0].codigoliquidacion ? "NO ESTA LIQUIDADO": "SI ESTA LIQUIDADO"}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item lg={12}>
                                                        <Button onClick={eliminarAnticipo} fullWidth>Eliminar cabecera liquidacion</Button>
                                                    </Grid>
                                                </Grid>
                                
                                        ) :(
                                
                                            <Alert severity="info">SIN DATOS</Alert>
                                        )}
    </>
  )
}

export default EliminarAnticipo