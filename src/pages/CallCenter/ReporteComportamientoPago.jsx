import { Box, Button } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { GET_REPORT_COMPORTAMIENTO_PAGOS } from '../../services/Service_Api_Reportes'
import { manejoMensajes } from '@/helpers/ManejoExcepciones';
const ReporteComportamientoPago = () => {

    const reporteConsignacion = () =>{
        manejoMensajes(fetchData, "CARGANDO....")
    }
    
    const fetchData = async () => {
        try {
            await GET_REPORT_COMPORTAMIENTO_PAGOS();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    return (
        <>
            <Box component="fieldset" pt={2} pb={4} pl={2} pr={2}>
                <legend>REPORTE GESTIONES COBROS</legend>
                <ToastContainer />
                <Button fullWidth variant="contained" onClick={reporteConsignacion}>DESCARGAR REPORTE</Button>
            </Box>
        </>
    )
}

export default ReporteComportamientoPago