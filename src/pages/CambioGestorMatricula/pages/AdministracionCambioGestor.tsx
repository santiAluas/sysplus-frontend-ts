import CustomDatePicker from "@/componentesCommons/CustomDatePicker";
import SearchBlobal from "@/components/SearchBlobal"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { actualizarGestorServicioWeb, listarCajasOpenServiceWeb, obtenerGestoresMatriculacionServicoWeb } from "../services/ServciceioWebCambioGestorMatricula";
import { InformacionAnticito } from "../models/InformacionAnticito";
import { useLoading } from "@/componentesCommons/LoadingContext";
import CustomAutocompleteTs from "@/componentesCommons/CustomAutocompleteTs";
import { InformacionGestores } from "../models/InformacionGestores";
import { showAlert } from "@/utils/modalAlerts";

const AdministracionCambioGestor = () => {
    const [parameterSearch, setParameterSearch] = useState("");
    const [fechaInicio, setFechaInicio]= useState("");
    const [fechaFin, setFechaFin]= useState("");
    const [anticipoSeleccionado, setAnticipoSeleccionado]= useState<InformacionAnticito>(null);
    const [gestores, setGestores]= useState<InformacionGestores[]>([]);
    const [gestorSeleccionado, setGestorSeleccionado]= useState<InformacionGestores>(null);

    const {startLoading, stopLoading} = useLoading();
    const busqueda = async() =>{
       try {
         startLoading();
        const respuesta = await listarCajasOpenServiceWeb(fechaInicio, fechaFin, parameterSearch);
        setAnticipoSeleccionado(respuesta);
       } finally {
        stopLoading();
       }
    }

    useEffect(() => {
      obtenerGestores()
    }, [])

    const obtenerGestores = async () =>{
        const respuesta = await obtenerGestoresMatriculacionServicoWeb()
        setGestores(respuesta);
    }

    const onChanceGestor = (value:InformacionGestores ) =>{
        console.log(value)
        setGestorSeleccionado(value)
    }

    const actualizarGestor = async () =>{
        if(!gestorSeleccionado){
            const configAlert = {
                title: 'Error',
                message: `<strong>EL NUEVO GESTOR NO DEBE ESTAR VACIO</strong>.`,
                type: 'error',
                callBackFunction: false,
            };
            showAlert(configAlert);
            return;
        }

          if(!anticipoSeleccionado){
            const configAlert = {
                title: 'Error',
                message: `<strong>DEBE SELECIONAR UN ANTICIPO</strong>.`,
                type: 'error',
                callBackFunction: false,
            };
            showAlert(configAlert);
            return;
        }
        await actualizarGestorServicioWeb(gestorSeleccionado.name,anticipoSeleccionado.numeroFactura );
         const configAlert = {
                title: 'Correcto',
                message: `<strong>Se actualizo correctamente</strong>.`,
                type: 'success',
                callBackFunction: false,
            };
            showAlert(configAlert);
            // busqueda();
            setAnticipoSeleccionado(null)
            setGestorSeleccionado(null)
            setParameterSearch("")
            return;
    }

  return (
    <>
        <Grid container width={'100%'} spacing={2} >
            {/* <Grid item lg={6} xs={12} sm={12}>
                <CustomDatePicker defaultValue={fechaInicio} onChangeValue={setFechaInicio} label="FECHA INICIO"></CustomDatePicker>
            </Grid>
            <Grid item lg={6} xs={12} sm={12}>
                <CustomDatePicker defaultValue={fechaFin} onChangeValue={setFechaFin} label="FECHA FIN"></CustomDatePicker>
            </Grid> */}
            <Grid item lg={12} xs={12} sm={12}>
                <SearchBlobal parameterSearch={parameterSearch} 
                            setParameterSearch={setParameterSearch} 
                            functionExecute={busqueda} 
                            title="Buscqueda Factura, RAMV, nombre cliente, cedula cliente"/>
            </Grid>
            <Grid item lg= {12}>
                <Grid container spacing={2}>
                    <Grid item lg={6} sm={12}>
                        <Typography><strong>Nombre Cliente:</strong> {anticipoSeleccionado?.nombreCliente}</Typography>
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <Typography><strong>Nombre Gestor:</strong> {anticipoSeleccionado?.nombreGestor}</Typography>
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <Typography> <strong>Valor Matriculacion:</strong> {anticipoSeleccionado?.valorMatriculacion}</Typography>
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <Typography><strong>Numero Factura:</strong> {anticipoSeleccionado?.numeroFactura}</Typography>
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <Typography><strong>Ramnv:</strong> {anticipoSeleccionado?.ramv}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
          
            <Grid item lg={12}>
                {
                    !!anticipoSeleccionado ?
                    (<>
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <Divider>GESTOR A CAMBIAR</Divider>
                        </Grid>
                          <Grid item lg={12} xs={12} sm={12}>
                                <CustomAutocompleteTs label="Nuevo Gestor" 
                                labelFullField="Gestor" 
                                options={gestores}
                                handleChange={(e, value: InformacionGestores) => onChanceGestor(value)}
                                />
                            </Grid>
                        <Grid item lg={6}>
                            <Typography>Agencia Origen: {gestorSeleccionado?.agenciadestino} </Typography>
                        </Grid>
                         <Grid item lg={6}>
                            <Typography>Agencia Base: {gestorSeleccionado?.agenciaorigen}</Typography>
                        </Grid>
                        <Grid item lg={12}>
                            <Button fullWidth variant="contained" onClick={actualizarGestor}>REALIZAR EL CAMBIO DE GESTOR</Button>
                        </Grid>
                    </Grid>
                    
                    </>)
                    :
                    null

                }
            </Grid>
        </Grid>
    
    </>
  )
}

export default AdministracionCambioGestor