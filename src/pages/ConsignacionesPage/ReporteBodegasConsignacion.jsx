import React, { useState } from 'react'
import { Box, Button, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { REPORT_BODEGA_CONSIG_PROPIEDAD_AGENCIAS } from '../../services/Api_BodegaConsignacion/Api_BodegaConsignacion'
import SearchAgencia from '../../components/SearchAgencia';
import { ToastContainer, toast } from 'react-toastify';
import { manejoMensajes } from '../../helpers/ManejoExcepciones.js'

const ReporteBodegasConsignacion = () => {
    const [codigoAgencia, setCodAgencia] = useState("");

    const reporteConsignacion = () =>{
        manejoMensajes(fetchData, "CARGANDO....")
    }
    
    const fetchData = async () => {
        try {
            await REPORT_BODEGA_CONSIG_PROPIEDAD_AGENCIAS(codigoAgencia);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
            <ToastContainer />
            <legend>REPORTE CONSIGNADOS - PROPIEDAD</legend>
            <ToastContainer />
            <Stack spacing={{ xs: 1, sm: 2 }} justifyContent="center" alignItems="center">
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        Seleccionar Agencia Destino:  <SearchAgencia setCodAgencia={setCodAgencia}
                            style={{ marginLeft: '2', width: '100%' }} ></SearchAgencia>
                    </Grid>
                  
                </Grid>
                <Stack
                    direction="row"
                    spacing={2}
                    style={{ width: '100%' }}>
                    <Button variant="contained"
                            fullWidth 
                            onClick={reporteConsignacion}>DESCARGAR REPORTE</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ReporteBodegasConsignacion